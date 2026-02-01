import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DashboardService } from "./dashboard.service";
import { DashboardSummaryDto } from "./dto/dashboard-summary.dto";

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get("summary")
  @ApiOperation({ summary: "Resumo da dashboard do usuário" })
  @ApiResponse({
    status: 200,
    description: "Resumo com saldo total, contas e últimas transações",
    type: DashboardSummaryDto,
  })
  @ApiResponse({
    status: 401,
    description: "Usuário não autenticado ou token inválido",
  })
  async getSummary(@Req() req): Promise<DashboardSummaryDto> {
    const userId = req.user.id;
    return this.dashboardService.getSummary(userId);
  }
}
