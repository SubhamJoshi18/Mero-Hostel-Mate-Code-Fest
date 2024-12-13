
import winston from 'winston';
const { combine, printf } = winston.format;

/**
 * Custom log format function.
 *
 * @param level - The log level.
 * @param message - The log message.
 * @param service - The service name.
 * @param batchId - The batch ID.
 * @returns The formatted log message as a JSON string.
 */
const myFormat = printf(({ level, message, service, batchId }) => {
  let jsonString = `{ "message": "${level === 'error' ? (message) : (message)}"`;
  if (batchId) {
    jsonString += `, "batchId": "${(batchId)}"`;
  }
  jsonString += `, "level": "${level}", "service": "${(service)}" }`;
  return jsonString;
});

/**
 * Creates a logger instance with the specified service name.
 * @param service - The name of the service.
 * @returns A winston.Logger instance.
 */
function createLogger(service: string): winston.Logger {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: {
      service,
    },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const etlLogger = createLogger('etl-pim-consumer');
const mtfLogger = createLogger('mtf-pim-consumer');
const stcLogger = createLogger('status-consumer');

export { createLogger, etlLogger, mtfLogger, stcLogger };
