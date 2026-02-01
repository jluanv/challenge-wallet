import type { SummaryOutput } from "@finance/validations";
import { ApiProperty } from "@nestjs/swagger";

export class AccountSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  balance: number;
}

export class TransactionSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  type: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  accountId: string;
}

export class DashboardSummaryDto implements SummaryOutput {
  @ApiProperty()
  totalBalance: number;

  @ApiProperty()
  creditLimit: number;

  @ApiProperty()
  availableCredit: number;

  @ApiProperty({ type: [AccountSummaryDto] })
  accounts: AccountSummaryDto[];

  @ApiProperty({ type: [TransactionSummaryDto] })
  recentTransactions: TransactionSummaryDto[];
}
