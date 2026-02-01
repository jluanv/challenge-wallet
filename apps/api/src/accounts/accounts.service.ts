import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: [
        {
          isActive: "desc",
        },
        { name: "asc" },
      ],
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.account.findFirst({ where: { id, userId } });
  }

  async update(id: string, userId: string, dto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id, userId },
      data: { ...dto },
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.account.update({
      data: {
        isActive: false,
      },
      where: { id, userId },
    });
  }
}
