import { Context, Logger, Schema } from "koishi";
import {} from "koishi-plugin-puppeteer";
import { createLogger, setLoggerLevel } from "./util/logger";
export const name = "darkworld";

export interface Config {
  logLevel: number;
}

export const Config: Schema<Config> = Schema.object({
  logLevel: Schema.number().default(-1).description("日志等级"),
});

export const inject = ["database", "puppeteer"];

export let logger: Logger;

class Darkworld {
  private ctx: Context;
  private conf: Config;
  constructor(ctx: Context, conf: Config) {
    logger = createLogger(ctx, "darkworld-core");
    this.ctx = ctx;
    this.conf = conf;
    setLoggerLevel(conf.logLevel);
  }
}

namespace Darkworld {}

export default Darkworld;
