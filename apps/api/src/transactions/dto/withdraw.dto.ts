import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class WithdrawDto {
  @ApiProperty({ example: "account-uuid" })
  @IsString()
  accountId: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0.01)
  amount: number;
}
