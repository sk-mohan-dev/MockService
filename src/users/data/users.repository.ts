import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { DYNAMO_DB } from "../../db/dynamo.database.js";
import { LOGGER, Logger } from "../../logger/logger.js";
import { User, UserRequest } from "../domain/users.types.js";
import { UserEntity } from "./users.entity.js";

export const USER_REPOSITORY = Symbol("user_repository");

export interface UserRepository {
  saveUser(request: UserRequest): Promise<User>;
  allUsers(): Promise<User[]>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private usersList: User[] = [];

  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,

    @Inject(DYNAMO_DB)
    private readonly dbClient: DynamoDBDocumentClient,
  ) {}

  async saveUser(request: UserRequest): Promise<User> {
    try {
      const userEntity: UserEntity = {
        userId: randomUUID(),
        ...request,
      };
      await this.dbClient.send(
        new PutCommand({
          TableName: "users",
          Item: userEntity,
        }),
      );
      return {
        id: userEntity.userId,
        name: userEntity.name,
        email: userEntity.email,
      };
    } catch (err) {
      this.logger.log(`Error in saveUser => ${err}`);
      throw err;
    }
  }

  async allUsers(): Promise<User[]> {
    return await this.realUsers();
  }

  async realUsers(): Promise<User[]> {
    try {
      const data = await this.dbClient.send(
        new ScanCommand({
          TableName: "users",
        }),
      );
      const users: User[] = (data.Items ?? []).map((item) => {
        this.logger.log(`User => ${JSON.stringify(item)}`);
        return {
          id: item.userId,
          name: item.name,
          email: item.email,
        };
      });
      return users;
    } catch (err) {
      this.logger.log(`Error in reading realUsers => ${err}`);
      throw err;
    }
  }
}
