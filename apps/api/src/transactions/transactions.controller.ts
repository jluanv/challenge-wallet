import {
  depositInput,
  reverseInput,
  transferInput,
  withdrawInput,
} from "@finance/validations";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { DepositDto, DepositOutputDto } from "./dto/deposit.dto";
import {
  ListTransactionsOutputDto,
  ListTransactionsQueryDto,
} from "./dto/list";
import { ReverseDto } from "./dto/reverse.dto";
import { TransferDto } from "./dto/transfer.dto";
import { WithdrawDto } from "./dto/withdraw.dto";
import { TransactionsService } from "./transactions.service";

@ApiTags("transactions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: "Listar transações" })
  @ApiQuery({ type: ListTransactionsQueryDto })
  @ApiResponse({
    status: 200,
    description: "Lista de transações",
    type: ListTransactionsOutputDto,
  })
  async findAll(
    @Req() req,
    @Query() query: ListTransactionsQueryDto,
  ): Promise<ListTransactionsOutputDto> {
    const userId = req.user.id;
    return this.transactionsService.findAll(userId, query);
  }

  @Post("deposit")
  @UsePipes(new ZodValidationPipe(depositInput))
  @ApiOperation({ summary: "Depositar em uma conta" })
  @ApiBody({ type: DepositDto })
  @ApiResponse({
    status: 201,
    description: "Depósito realizado com sucesso",
    type: DepositOutputDto,
  })
  deposit(@Req() req, @Body() dto: DepositDto) {
    return this.transactionsService.deposit(req.user.id, dto);
  }

  @Post("withdraw")
  @UsePipes(new ZodValidationPipe(withdrawInput))
  @ApiOperation({ summary: "Sacar de uma conta" })
  @ApiBody({ type: WithdrawDto })
  @ApiResponse({ status: 201, description: "Saque realizado com sucesso" })
  withdraw(@Req() req, @Body() dto: WithdrawDto) {
    return this.transactionsService.withdraw(req.user.id, dto);
  }

  @Post("transfer")
  @UsePipes(new ZodValidationPipe(transferInput))
  @ApiOperation({ summary: "Transferir entre contas (internas ou externas)" })
  @ApiBody({ type: TransferDto })
  @ApiResponse({
    status: 201,
    description: "Transferência realizada com sucesso",
  })
  transfer(@Req() req, @Body() dto: TransferDto) {
    return this.transactionsService.transfer(req.user.id, dto);
  }

  @Post("reverse")
  @UsePipes(new ZodValidationPipe(reverseInput))
  @ApiOperation({ summary: "Reverter uma transação" })
  @ApiBody({ type: ReverseDto })
  @ApiResponse({ status: 201, description: "Transação revertida com sucesso" })
  reverse(@Req() req, @Body() dto: ReverseDto) {
    return this.transactionsService.reverse(req.user.id, dto);
  }
}
