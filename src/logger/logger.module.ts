import { Module } from "@nestjs/common";
import { ConsoleLogger, LOGGER } from "./logger.js";

@Module({
  providers: [
    {
      provide: LOGGER,
      useClass: ConsoleLogger,
    },
  ],
  exports: [LOGGER],
})
export class LoggerModule {}
