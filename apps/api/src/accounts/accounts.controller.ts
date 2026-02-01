import { createAccountInput, updateAccountInput } from "@finance/validations";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@ApiTags("accounts")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountInput))
  @ApiOperation({ summary: "Criar uma nova conta" })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ status: 201, description: "Conta criada com sucesso" })
  create(@Req() req, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as contas do usuário" })
  @ApiResponse({ status: 200, description: "Lista de contas retornada" })
  findAll(@Req() req) {
    return this.accountsService.findAll(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar uma conta específica" })
  @ApiParam({ name: "id", description: "ID da conta" })
  @ApiResponse({ status: 200, description: "Conta encontrada" })
  @ApiResponse({ status: 404, description: "Conta não encontrada" })
  findOne(@Req() req, @Param("id") id: string) {
    return this.accountsService.findOne(id, req.user.userId);
  }

  @Patch(":id")
  @UsePipes(new ZodValidationPipe(updateAccountInput))
  @ApiOperation({ summary: "Atualizar uma conta" })
  @ApiParam({ name: "id", description: "ID da conta" })
  @ApiBody({ type: UpdateAccountDto })
  @ApiResponse({ status: 200, description: "Conta atualizada com sucesso" })
  update(@Req() req, @Param("id") id: string, @Body() dto: UpdateAccountDto) {
    return this.accountsService.update(id, req.user.userId, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Excluir uma conta" })
  @ApiParam({ name: "id", description: "ID da conta" })
  @ApiResponse({ status: 200, description: "Conta excluída com sucesso" })
  remove(@Req() req, @Param("id") id: string) {
    return this.accountsService.remove(id, req.user.userId);
  }
}
