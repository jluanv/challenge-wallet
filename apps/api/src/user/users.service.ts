import type { LoginInput } from "@finance/validations";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: LoginInput) {
    const { cpf, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { cpf, password: hashedPassword },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.user.findUnique({ where: { cpf } });
  }
}
