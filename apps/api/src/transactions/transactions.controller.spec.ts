import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { TransactionsService } from "./transactions.service";

describe("TransactionsService (integration)", () => {
  let service: TransactionsService;
  let prisma: PrismaService;

  let user1Id: string;
  let user2Id: string;
  let acc1Id: string;
  let acc2Id: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, PrismaService],
    }).compile();

    service = module.get(TransactionsService);
    prisma = module.get(PrismaService);

    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    const password = await bcrypt.hash("@Abc1234", 6);

    const user1 = await prisma.user.create({
      data: { cpf: "64860891058", password },
    });

    const user2 = await prisma.user.create({
      data: { cpf: "12345678900", password },
    });

    user1Id = user1.id;
    user2Id = user2.id;

    const acc1 = await prisma.account.create({
      data: {
        name: "Conta corrente",
        userId: user1Id,
        balance: 0,
      },
    });

    const acc2 = await prisma.account.create({
      data: {
        name: "Poupança",
        userId: user2Id,
        balance: 0,
      },
    });

    acc1Id = acc1.id;
    acc2Id = acc2.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should deposit and update balance", async () => {
    await service.deposit(user1Id, { accountId: acc1Id, amount: 100 });

    const acc = await prisma.account.findUnique({
      where: { id: acc1Id },
    });

    expect(acc?.balance).toBe(100);

    const txs = await prisma.transaction.findMany();
    expect(txs.length).toBe(1);
    expect(txs[0].type).toBe("INCOME");
  });

  it("should withdraw and update balance", async () => {
    await service.deposit(user1Id, { accountId: acc1Id, amount: 100 });
    await service.withdraw(user1Id, { accountId: acc1Id, amount: 40 });

    const acc = await prisma.account.findUnique({
      where: { id: acc1Id },
    });

    expect(acc?.balance).toBe(60);

    const txs = await prisma.transaction.findMany();
    expect(txs.length).toBe(2);
    expect(txs[1].type).toBe("EXPENSE");
  });

  it("should transfer between accounts", async () => {
    await service.deposit(user1Id, { accountId: acc1Id, amount: 200 });

    await service.transfer(user1Id, {
      fromAccountId: acc1Id,
      toAccountId: acc2Id,
      amount: 50,
    });

    const from = await prisma.account.findUnique({
      where: { id: acc1Id },
    });

    const to = await prisma.account.findUnique({
      where: { id: acc2Id },
    });

    expect(from?.balance).toBe(150);
    expect(to?.balance).toBe(50);

    const txs = await prisma.transaction.findMany();
    expect(txs.length).toBe(3);
    expect(txs.some((t) => t.type === "TRANSFER")).toBe(true);
    expect(txs.some((t) => t.type === "INCOME")).toBe(true);
  });

  it("should reverse a transaction", async () => {
    const deposit = await service.deposit(user1Id, {
      accountId: acc1Id,
      amount: 100,
    });

    await service.reverse(user1Id, {
      transactionId: deposit.id,
    });

    const acc = await prisma.account.findUnique({
      where: { id: acc1Id },
    });

    expect(acc?.balance).toBe(0);

    const txs = await prisma.transaction.findMany();
    expect(txs.length).toBe(2);

    expect(txs[0].type).toBe("EXPENSE");
  });
});
