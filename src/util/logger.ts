import { Context, Logger } from "koishi";

let loggers: Record<string, Logger> = {};

let logLevel = -1;

//代码来自 https://github.com/dingyi222666
export function createLogger(ctx: Context, name: string = "darkworld") {
  const result = loggers[name] || ctx.logger(name);

  if (logLevel >= 0) {
    result.level = logLevel;
  }
  loggers[name] = result;

  return result;
}

export function setLoggerLevel(level: number) {
  logLevel = level;

  for (const name in loggers) {
    loggers[name].level = level;
  }
}

export function clearLogger() {
  loggers = {};
}
