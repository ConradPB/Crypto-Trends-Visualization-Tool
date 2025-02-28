import { createLogger, format, transports } from "winston";
import type { Logger, TransformableInfo } from "winston/lib/winston/logger";

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf((info: TransformableInfo & { timestamp: string }) => {
      return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    } as transports.FileTransportOptions),
    new transports.File({
      filename: "logs/combined.log",
    } as transports.FileTransportOptions),
  ],
});

export default logger;
