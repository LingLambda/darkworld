import { Context, Database, Tables, Types } from "koishi";

declare module "koishi" {
  interface Tables {
    inventory: InventoryTable;
  }
}

export interface InventoryTable {
  inventoryId: number; //主键,无意义
  itemId: number; //物品id
  userId: string; //关联character表的用户id
  type: string;
}

export class InventoryRepository {
  private ctx: Context;
  private db: Database<Tables, Types, Context> & Context.Database<Context>;
  constructor(ctx: Context) {
    this.ctx = ctx;
    this.db = ctx.database;
    ctx.model.extend(
      "inventory",
      {
        inventoryId: "unsigned",
        itemId: "unsigned",
        userId: "string",
        type: "string",
      },
      {
        primary: "itemId",
        autoInc: true,
      }
    );
  }

  async addItem(userId: string) {
    const inventory = this.db.create("inventory", {});
  }
}
