import type { LoginInput } from "@finance/validations";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @ApiResponse({ status: 200, description: "Usuário registrado com sucesso" })
  @ApiResponse({ status: 400, description: "Usuário ja existe no sistema!" })
  async register(@Body() body: LoginInput) {
    return this.usersService.create({ ...body });
  }
}
