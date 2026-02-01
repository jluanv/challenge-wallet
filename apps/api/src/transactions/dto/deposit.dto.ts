import type { DepositInput, DepositOutput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber, IsString, Min } from "class-validator";
import { TransactionType } from "../../../prisma/generated/enums";

export class DepositDto implements DepositInput {
  @ApiProperty({ example: "account-uuid" })
  @IsString()
  accountId: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class DepositOutputDto implements DepositOutput {
  @ApiProperty()
  @IsString()
  accountId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  reversedBy: string | null;
}
