"use server";
import { httpSummary } from "@/http/dashboard/summary";

export async function summaryAction() {
  const result = await httpSummary();

  return result;
}
