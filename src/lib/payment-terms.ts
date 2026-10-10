export type PaymentPlan = "half_advance" | "full_payment";

export function orderPaymentMethod(method: string, plan: PaymentPlan) {
  return `${method}:${plan}`;
}

export function paymentLabel(value: string) {
  const [method, plan] = value.split(":");
  const label = method === "upi" ? "UPI / Netbanking" : method === "cod" ? "Cash on delivery" : method?.toUpperCase();
  if (plan === "half_advance") return `${label} · 50% advance, 50% later`;
  if (plan === "full_payment") return `${label} · Full payment`;
  return label;
}

export function paymentAmounts(total: number, plan: PaymentPlan) {
  const advance = plan === "half_advance" ? Math.round(total * 100 / 2) / 100 : total;
  return { advance, balance: Math.round((total - advance) * 100) / 100 };
}