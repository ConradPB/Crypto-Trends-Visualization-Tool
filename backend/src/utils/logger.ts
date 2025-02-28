import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(), // Adds timestamp
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

export default logger as import("winston").Logger;
