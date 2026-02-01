import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DashboardSummaryDto } from "./dto/dashboard-summary.dto";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string): Promise<DashboardSummaryDto> {
    const accounts = await this.prisma.account.findMany({
      where: { userId, isActive: true },
    });

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const recentTransactions = await this.prisma.transaction.findMany({
      where: { account: { userId } },
      orderBy: { createdAt: "desc" },
      take: 4,
    });

    return {
      totalBalance,
      accounts: accounts.map((acc) => ({
        id: acc.id,
        name: acc.name,
        balance: acc.balance,
      })),
      recentTransactions: recentTransactions.map((tx) => ({
        id: tx.id,
        date: tx.createdAt,
        type: tx.type,
        amount: tx.amount,
        accountId: tx.accountId,
      })),
    };
  }
}
