import { Pool } from "./../../generated/schema";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ZERO } from "../utils/number";
import { ZERO_ADDRESS } from "../utils/address";

export function getPool(address: Address): Pool | null {
  let pool = Pool.load(address.toHex());

  if (pool != null) {
    return pool as Pool;
  }
  return null;
}

export function createPool(
  address: Address,
  creator: Address,
  timestamp: BigInt
): Pool {
  let pool = new Pool(address.toHex());

  pool.address = address;
  pool.creator = creator;

  pool.token = Bytes.fromHexString(ZERO_ADDRESS) as Bytes;
  pool.tokenTarget = ZERO;
  pool.multiplier = ZERO;
  pool.weiToken = Bytes.fromHexString(ZERO_ADDRESS) as Bytes;
  pool.minWei = ZERO;
  pool.maxWei = ZERO;
  pool.poolType = 0;
  pool.startTime = ZERO;
  pool.endTime = ZERO;
  pool.claimTime = ZERO;
  pool.meta = Bytes.fromUTF8("") as Bytes;
  pool.totalOwed = ZERO;
  pool.weiRaised = ZERO;
  pool.startTime = ZERO;
  pool.endTime = ZERO;
  pool.createTimestamp = timestamp;
  pool.updateTimestamp = timestamp;

  pool.save();

  return pool as Pool;
}
