import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "accounts/jwt-auth.guard";
import { DepositDto } from "./dto/deposit.dto";
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

  @Post("deposit")
  @ApiOperation({ summary: "Depositar em uma conta" })
  @ApiBody({ type: DepositDto })
  @ApiResponse({ status: 201, description: "Depósito realizado com sucesso" })
  deposit(@Req() req, @Body() dto: DepositDto) {
    return this.transactionsService.deposit(req.user.userId, dto);
  }

  @Post("withdraw")
  @ApiOperation({ summary: "Sacar de uma conta" })
  @ApiBody({ type: WithdrawDto })
  @ApiResponse({ status: 201, description: "Saque realizado com sucesso" })
  withdraw(@Req() req, @Body() dto: WithdrawDto) {
    return this.transactionsService.withdraw(req.user.userId, dto);
  }

  @Post("transfer")
  @ApiOperation({ summary: "Transferir entre contas (internas ou externas)" })
  @ApiBody({ type: TransferDto })
  @ApiResponse({
    status: 201,
    description: "Transferência realizada com sucesso",
  })
  transfer(@Req() req, @Body() dto: TransferDto) {
    return this.transactionsService.transfer(req.user.userId, dto);
  }

  @Post("reverse")
  @ApiOperation({ summary: "Reverter uma transação" })
  @ApiBody({ type: ReverseDto })
  @ApiResponse({ status: 201, description: "Transação revertida com sucesso" })
  reverse(@Req() req, @Body() dto: ReverseDto) {
    return this.transactionsService.reverse(req.user.userId, dto);
  }
}
