import type { ListTransactionsOutput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { TransactionType } from "../../../prisma/generated/enums";

export class ListTransactionsQueryDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;
}

export class TransactionItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  accountName: string;
}

export class PaginationParamsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}

export class ListTransactionsOutputDto implements ListTransactionsOutput {
  @ApiProperty({ type: [TransactionItemDto] })
  data: TransactionItemDto[];

  @ApiProperty({ type: PaginationParamsDto })
  params: PaginationParamsDto;
}
