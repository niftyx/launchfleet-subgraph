import { Pool } from "./../../generated/schema";
import { getPool } from "../models/pool";
import {
  PoolInitialized,
  PoolBaseDataInitialized,
  MetaDataChanged,
  PoolProgressChanged,
  OwnershipTransferred,
} from "../../generated/templates/Pool/Pool";
import { Bytes, log } from "@graphprotocol/graph-ts";
import { createPoolHistory } from "../models/poolHistory";
import {
  createUniquePoolMember,
  getUniquePoolMember,
} from "../models/uniqueMember";
import { ONE } from "../utils/number";

export function handlePoolInitialized(event: PoolInitialized): void {
  let params = event.params;
  let pool = getPool(event.address);
  if (pool != null) {
    pool.token = params.token;
    pool.weiToken = params.weiToken;
    pool.tokenTarget = params.tokenTarget;
    pool.multiplier = params.multiplier;
    pool.minWei = params.minWei;
    pool.maxWei = params.maxWei;

    pool.updateTimestamp = event.block.timestamp;

    pool.save();
  }
}

export function handlePoolBaseDataInitialized(
  event: PoolBaseDataInitialized
): void {
  let params = event.params;
  let pool = getPool(event.address);
  if (pool != null) {
    pool.poolType = params.poolType;
    pool.startTime = params.startTime;
    pool.endTime = params.endTime;
    pool.claimTime = params.claimTime;
    pool.meta = params.meta;

    pool.updateTimestamp = event.block.timestamp;

    pool.save();
  }
}
export function handlePoolMetaDataChanged(event: MetaDataChanged): void {
  let params = event.params;
  let pool = getPool(event.address);
  if (pool != null) {
    pool.meta = params.meta;

    pool.updateTimestamp = event.block.timestamp;

    pool.save();
  }
}

export function handlePoolProgressChanged(event: PoolProgressChanged): void {
  let params = event.params;
  let pool = getPool(event.address);
  if (pool != null) {
    pool.totalOwed = params.totalOwed;
    pool.weiRaised = params.weiRaised;

    let member = getUniquePoolMember(pool as Pool, params.buyer);

    if (member != null) {
      member.totalRaised = member.totalRaised.plus(params.amount);
      member.updateTimestamp = event.block.timestamp;
      member.save();
    } else {
      pool.totalMembers = pool.totalMembers.plus(ONE);
      createUniquePoolMember(
        pool as Pool,
        params.buyer,
        params.amount,
        event.block.timestamp
      );
    }

    pool.save();

    createPoolHistory(
      event.transaction.hash,
      params.buyer,
      params.amount,
      pool as Pool,
      event.block.timestamp
    );
  }
}

export function handlePoolOwnershipTransferred(
  event: OwnershipTransferred
): void {
  let params = event.params;
  let pool = getPool(event.address);
  if (pool != null) {
    pool.creator = params.newOwner;
    pool.updateTimestamp = event.block.timestamp;

    pool.save();
  }
}
