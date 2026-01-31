import { loginInput } from "@finance/validations";
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "common/pipes/zod-validation.pipe";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(new ZodValidationPipe(loginInput))
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso" })
  @ApiResponse({ status: 400, description: "Credenciais inválidas" })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.cpf, body.password);
    if (!user) {
      throw new HttpException(
        { message: "Credenciais inválidas", details: [] },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.login(user);
  }
}
