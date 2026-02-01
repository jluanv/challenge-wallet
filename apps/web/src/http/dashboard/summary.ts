import type { SummaryOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpSummary(): Promise<SummaryOutput> {
  const result = await api.get("dashboard/summary").json<SummaryOutput>();

  return result;
}
