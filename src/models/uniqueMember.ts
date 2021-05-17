import { Pool, UniquePoolMember } from "../../generated/schema";
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";

export function getUniquePoolMember(
  pool: Pool,
  user: Address
): UniquePoolMember | null {
  let id = pool.id + "-" + user.toHex();
  log.info(id, []);
  let member = UniquePoolMember.load(id);
  return member;
}

export function createUniquePoolMember(
  pool: Pool,
  user: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let id = pool.id + "-" + user.toHex();
  log.info(id, []);
  let member = new UniquePoolMember(id);

  member.user = user;
  member.pool = pool.id;
  member.totalRaised = amount;
  member.createTimestamp = timestamp;
  member.updateTimestamp = timestamp;
  member.save();
}
