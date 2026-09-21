import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LOGGER, Logger } from "../logger/logger.js";

export const DYNAMO_DB = Symbol("DYNAMO_DB");

export const dynamoProvider: Provider = {
  provide: DYNAMO_DB,
  inject: [ConfigService, LOGGER],
  useFactory: (configService: ConfigService, logger: Logger) => {
    const awsRegion = configService.getOrThrow<string>("AWS_REGION");
    logger.log(`DynamoProvider: Creating DynamoDbClient ${awsRegion}`);
    const client = new DynamoDBClient({
      region: awsRegion,
    });

    return DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
  },
};
