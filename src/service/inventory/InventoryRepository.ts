import { Context, Database, Tables, Types } from "koishi";
import { createLogger } from "../../util/logger";
import { Inventory } from "./Inventory";

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
  private log: import("reggol");
  constructor(ctx: Context) {
    this.ctx = ctx;
    this.db = ctx.database;
    this.log = createLogger(ctx, "darkworld-inventory-respository");
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

  async syncItem(inventory: Inventory) {
    try {
      this.db.transact(async () => {
        const userId = inventory.userId;
        await this.db.remove("inventory", { userId: userId });
        inventory.item.forEach(async (item) => {
          await this.db.create("inventory", {
            userId: userId,
            itemId: item.itemId,
            type: item.type,
          });
        });
      });
    } catch (err) {
      this.log.error(`数据库同步错误, 错误信息 ${err}`);
    }
  }

  async getInventory(userId: string) {
    try {
      let inventory: InventoryTable[] = await this.db.get("inventory", {
        userId: userId,
      });
      return inventory;
    } catch (err) {
      this.log.error(`数据库查询错误, 错误信息 ${err}`);
      return null;
    }
  }
}
