import { createLogger, format, transports, Logger } from "winston";

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({
        level,
        message,
        timestamp,
      }: {
        level: string;
        message: string;
        timestamp: string;
      }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      }
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error", // Winston supports this, type issue is a false positive
    } as transports.FileTransportOptions), // Type assertion
    new transports.File({
      filename: "logs/combined.log",
    } as transports.FileTransportOptions),
  ],
});

export default logger;
