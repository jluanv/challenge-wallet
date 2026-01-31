import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma/prisma.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { password, ...data } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.user.findUnique({ where: { cpf } });
  }
}
