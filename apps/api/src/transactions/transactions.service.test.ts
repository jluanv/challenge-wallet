import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { TransactionsService } from "./transactions.service";

describe("TransactionsService (unit)", () => {
  let service: TransactionsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      account: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      transaction: {
        create: jest.fn(),
        createMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn((fn) => fn(prismaMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it("should deposit and increase balance", async () => {
    prismaMock.account.findFirst.mockResolvedValue({
      id: "acc1",
      balance: 100,
    });

    prismaMock.transaction.create.mockResolvedValue({
      id: "tx1",
      type: "INCOME",
      amount: 50,
    });

    const result = await service.deposit("user1", {
      accountId: "acc1",
      amount: 50,
    });

    expect(result.type).toBe("INCOME");
    expect(prismaMock.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data: { balance: 150 },
    });
  });

  it("should withdraw and decrease balance", async () => {
    prismaMock.account.findFirst.mockResolvedValue({
      id: "acc1",
      balance: 100,
    });

    prismaMock.transaction.create.mockResolvedValue({
      id: "tx2",
      type: "EXPENSE",
      amount: 30,
    });

    const result = await service.withdraw("user1", {
      accountId: "acc1",
      amount: 30,
    });

    expect(result.type).toBe("EXPENSE");
    expect(prismaMock.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data: { balance: 70 },
    });
  });

  it("should throw error if insufficient balance on withdraw", async () => {
    prismaMock.account.findFirst.mockResolvedValue({ id: "acc1", balance: 20 });

    await expect(
      service.withdraw("user1", { accountId: "acc1", amount: 50 }),
    ).rejects.toThrow();
  });

  it("should transfer between accounts", async () => {
    prismaMock.account.findUnique
      .mockResolvedValueOnce({ id: "acc1", balance: 200, userId: "user1" })
      .mockResolvedValueOnce({ id: "acc2", balance: 50, userId: "user2" });

    prismaMock.transaction.createMany.mockResolvedValue({ count: 2 });

    const result = await service.transfer("user1", {
      fromAccountId: "acc1",
      toAccountId: "acc2",
      amount: 100,
    });

    expect(result).toBeTruthy();
    expect(prismaMock.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data: { balance: 100 },
    });
    expect(prismaMock.account.update).toHaveBeenCalledWith({
      where: { id: "acc2" },
      data: { balance: 150 },
    });
  });

  it("should throw error if insufficient balance on transfer", async () => {
    prismaMock.account.findUnique
      .mockResolvedValueOnce({ id: "acc1", balance: 50, userId: "user1" })
      .mockResolvedValueOnce({ id: "acc2", balance: 50, userId: "user2" });

    await expect(
      service.transfer("user1", {
        fromAccountId: "acc1",
        toAccountId: "acc2",
        amount: 100,
      }),
    ).rejects.toThrow();
  });

  it("should reverse an INCOME transaction", async () => {
    prismaMock.transaction.findFirst.mockResolvedValue({
      id: "tx1",
      amount: 100,
      type: "INCOME",
      accountId: "acc1",
      account: { id: "acc1", balance: 200 },
    });

    prismaMock.transaction.create.mockResolvedValue({
      id: "tx2",
      type: "EXPENSE",
      amount: 100,
    });

    const result = await service.reverse("user1", { transactionId: "tx1" });

    expect(result.type).toBe("EXPENSE");
    expect(prismaMock.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data: { balance: 100 },
    });
    expect(prismaMock.transaction.update).toHaveBeenCalledWith({
      where: { id: "tx1" },
      data: { reversedBy: "tx2" },
    });
  });

  it("should throw error if transaction not found on reverse", async () => {
    prismaMock.transaction.findFirst.mockResolvedValue(null);

    await expect(
      service.reverse("user1", { transactionId: "invalid" }),
    ).rejects.toThrow();
  });
});
