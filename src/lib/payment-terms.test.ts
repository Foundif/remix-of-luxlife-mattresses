import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { orderPaymentMethod, paymentAmounts } from "./payment-terms";

describe("requested payment terms", () => {
  test("50% advance leaves the other 50% for later", () => {
    assert.deepEqual(paymentAmounts(9000, "half_advance"), { advance: 4500, balance: 4500 });
    assert.deepEqual(paymentAmounts(9000.5, "half_advance"), { advance: 4500.25, balance: 4500.25 });
  });
  test("full payment leaves no later balance", () => {
    assert.deepEqual(paymentAmounts(9000, "full_payment"), { advance: 9000, balance: 0 });
  });
  test("the order records the chosen payment terms", () => {
    assert.equal(orderPaymentMethod("upi", "half_advance"), "upi:half_advance");
    assert.equal(orderPaymentMethod("upi", "full_payment"), "upi:full_payment");
  });
});