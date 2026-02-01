import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { User } from "../../prisma/generated/client";
import { UsersService } from "../user/users.service";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cpf: string, pass: string) {
    const user = await this.usersService.findByCpf(cpf);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, cpf: user.cpf, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
