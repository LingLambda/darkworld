import { Context } from "koishi";
import { createLogger } from "../../util/logger";

export class InventoryService{
  private ctx: Context;
  private log: import("reggol");
  constructor(ctx: Context) {
    this.ctx=ctx;
    this.log=createLogger(ctx,'darkworld-inventory-service')
  }

  async get

}