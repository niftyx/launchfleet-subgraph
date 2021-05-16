import { Pool } from "../../generated/templates";
import { createPool } from "../models/pool";
import { PoolCreated } from "../../generated/PoolFactory/PoolFactory";

export function handleNewPool(event: PoolCreated): void {
  let params = event.params;

  createPool(params.addr, params.creator, event.block.timestamp);

  Pool.create(params.addr);
}
