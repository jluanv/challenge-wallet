import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class TransferDto {
  @ApiProperty({ example: "from-account-uuid" })
  @IsString()
  fromAccountId: string;

  @ApiProperty({ example: "to-account-uuid" })
  @IsString()
  toAccountId: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0.01)
  amount: number;
}
