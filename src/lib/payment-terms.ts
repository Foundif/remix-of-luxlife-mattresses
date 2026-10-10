export type PaymentPlan = "half_advance" | "full_payment";

export function paymentAmounts(total: number, plan: PaymentPlan) {
  const advance = plan === "half_advance" ? Math.round(total * 100 / 2) / 100 : total;
  return { advance, balance: Math.round((total - advance) * 100) / 100 };
}