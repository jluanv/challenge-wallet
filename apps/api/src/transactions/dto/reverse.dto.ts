import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ReverseDto {
  @ApiProperty({ example: "transaction-uuid" })
  @IsString()
  transactionId: string;
}
