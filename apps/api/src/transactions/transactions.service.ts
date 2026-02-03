import { Injectable } from "@nestjs/common";
import { TransactionType } from "../../prisma/generated/enums";
import {
  BadRequestError,
  NotFoundError,
} from "../common/exceptions/http-exception.util";
import { PrismaService } from "../prisma/prisma.service";
import { transactionTypeTranslate } from "../utils/transaction-translate";
import { DepositDto } from "./dto/deposit.dto";
import type { ListTransactionsQueryDto, TransactionItemDto } from "./dto/list";
import { ReverseDto } from "./dto/reverse.dto";
import { TransferDto } from "./dto/transfer.dto";
import { WithdrawDto } from "./dto/withdraw.dto";

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: ListTransactionsQueryDto) {
    const { type } = query;

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const where: any = { userId };
    if (type) {
      where.type = type;
    }

    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          account: true,
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      data: transactions.map((t) => ({
        id: t.id,
        amount: t.amount,
        type: transactionTypeTranslate[t.type],
        accountName: t.account.name,
        createdAt: t.createdAt,
      })) as TransactionItemDto[],
      params: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deposit(userId: string, dto: DepositDto) {
    return this.prisma.$transaction(async (tx) => {
      const account = await tx.account.findFirst({
        where: { id: dto.accountId, userId },
      });
      if (!account) NotFoundError("Conta");

      const transaction = await tx.transaction.create({
        data: {
          amount: dto.amount,
          type: "INCOME",
          accountId: dto.accountId,
          userId,
        },
      });

      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance: account.balance + dto.amount },
      });

      return transaction;
    });
  }

  async withdraw(userId: string, dto: WithdrawDto) {
    return this.prisma.$transaction(async (tx) => {
      const account = await tx.account.findFirst({
        where: { id: dto.accountId, userId },
      });

      if (!account) NotFoundError("Conta");

      const user = await tx.user.findUnique({
        where: { id: userId },
        include: { accounts: true },
      });

      if (!user) NotFoundError("Usuário");

      const totalBalance = user.accounts.reduce(
        (sum, acc) => sum + acc.balance,
        0,
      );

      const newTotalBalance = totalBalance - dto.amount;

      if (newTotalBalance < -user.creditLimit) {
        BadRequestError("Limite de crédito excedido");
      }

      const transaction = await tx.transaction.create({
        data: {
          amount: dto.amount,
          type: "EXPENSE",
          accountId: dto.accountId,
          userId,
        },
      });

      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance: account.balance - dto.amount },
      });

      return transaction;
    });
  }

  async transfer(userId: string, dto: TransferDto) {
    return this.prisma.$transaction(async (tx) => {
      const from = await tx.account.findUnique({
        where: { id: dto.fromAccountId },
      });
      const to = await tx.account.findUnique({
        where: { id: dto.toAccountId },
      });

      if (!from || !to) NotFoundError("Conta");

      const user = await tx.user.findUnique({
        where: { id: userId },
        include: { accounts: true },
      });

      if (!user) NotFoundError("Usuário");

      const totalBalance = user.accounts.reduce(
        (sum, acc) => sum + acc.balance,
        0,
      );

      const newTotalBalance = totalBalance - dto.amount;

      if (newTotalBalance < -user.creditLimit) {
        BadRequestError("Limite de crédito excedido");
      }

      await tx.transaction.createMany({
        data: [
          {
            amount: dto.amount,
            type: TransactionType.TRANSFER,
            accountId: from.id,
            userId: from.userId,
          },
          {
            amount: dto.amount,
            type: TransactionType.INCOME,
            accountId: to.id,
            userId: to.userId,
          },
        ],
      });

      const fromResult = await tx.account.update({
        where: { id: from.id },
        data: { balance: from.balance - dto.amount },
      });

      const toResult = await tx.account.update({
        where: { id: to.id },
        data: { balance: to.balance + dto.amount },
      });

      return { fromResult, toResult };
    });
  }

  async reverse(userId: string, dto: ReverseDto) {
    return this.prisma.$transaction(async (tx) => {
      const txOriginal = await tx.transaction.findFirst({
        where: { id: dto.transactionId },
        include: { account: true },
      });

      if (!txOriginal) NotFoundError("Transação");

      const reverseType = txOriginal.type === "INCOME" ? "EXPENSE" : "INCOME";

      const reversed = await tx.transaction.create({
        data: {
          amount: txOriginal.amount,
          type: reverseType,
          accountId: txOriginal.accountId,
          userId,
        },
      });

      const newBalance =
        reverseType === "INCOME"
          ? txOriginal.account.balance + txOriginal.amount
          : txOriginal.account.balance - txOriginal.amount;

      await tx.account.update({
        where: { id: txOriginal.accountId },
        data: { balance: newBalance },
      });

      await tx.transaction.update({
        where: { id: txOriginal.id },
        data: { reversedBy: reversed.id },
      });

      return reversed;
    });
  }
}
