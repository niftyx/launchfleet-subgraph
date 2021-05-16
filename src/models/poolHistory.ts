import { Pool, PoolHistory } from "./../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function createPoolHistory(
  txId: Bytes,
  user: Bytes,
  amount: BigInt,
  pool: Pool,
  timestamp: BigInt
): void {
  let poolHistory = new PoolHistory(txId.toHex());

  poolHistory.txHash = txId;
  poolHistory.user = user;
  poolHistory.amount = amount;
  poolHistory.poolId = Bytes.fromHexString(pool.id) as Bytes;
  poolHistory.pool = pool.id;
  poolHistory.timestamp = timestamp;
  poolHistory.save();
}
