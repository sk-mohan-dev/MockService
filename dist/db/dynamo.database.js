import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ConfigService } from "@nestjs/config";
import { LOGGER } from "../logger/logger.js";
export const DYNAMO_DB = Symbol("DYNAMO_DB");
export const dynamoProvider = {
    provide: DYNAMO_DB,
    inject: [ConfigService, LOGGER],
    useFactory: (configService, logger) => {
        const awsRegion = configService.getOrThrow("AWS_REGION");
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
