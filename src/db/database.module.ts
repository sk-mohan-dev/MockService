import { Global, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module.js";
import { DYNAMO_DB, dynamoProvider } from "./dynamo.database.js";

@Global()
@Module({
  imports: [LoggerModule],
  providers: [dynamoProvider],
  exports: [DYNAMO_DB],
})
export class DatabaseModule {}
