import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: "Usuário registrado com sucesso" })
  @ApiResponse({ status: 400, description: "Usuário ja existe no sistema!" })
  async register(@Body() body: CreateUserDto) {
    return this.usersService.create({ ...body });
  }
}
