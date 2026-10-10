import { describe, expect, test } from "bun:test";
import { paymentAmounts } from "./payment-terms";

describe("requested payment terms", () => {
  test("50% advance leaves the other 50% for later", () => {
    expect(paymentAmounts(9000, "half_advance")).toEqual({ advance: 4500, balance: 4500 });
    expect(paymentAmounts(9000.5, "half_advance")).toEqual({ advance: 4500.25, balance: 4500.25 });
  });
  test("full payment leaves no later balance", () => {
    expect(paymentAmounts(9000, "full_payment")).toEqual({ advance: 9000, balance: 0 });
  });
});