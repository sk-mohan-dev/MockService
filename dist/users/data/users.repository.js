var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DynamoDBDocumentClient, PutCommand, ScanCommand, } from "@aws-sdk/lib-dynamodb";
import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { DYNAMO_DB } from "../../db/dynamo.database.js";
import { LOGGER } from "../../logger/logger.js";
export const USER_REPOSITORY = Symbol("user_repository");
let UserRepositoryImpl = class UserRepositoryImpl {
    logger;
    dbClient;
    usersList = [];
    constructor(logger, dbClient) {
        this.logger = logger;
        this.dbClient = dbClient;
    }
    async saveUser(request) {
        try {
            const userEntity = {
                userId: randomUUID(),
                ...request,
            };
            await this.dbClient.send(new PutCommand({
                TableName: "users",
                Item: userEntity,
            }));
            return {
                id: userEntity.userId,
                name: userEntity.name,
                email: userEntity.email,
            };
        }
        catch (err) {
            this.logger.log(`Error in saveUser => ${err}`);
            throw err;
        }
    }
    async allUsers() {
        return await this.realUsers();
    }
    async realUsers() {
        try {
            const data = await this.dbClient.send(new ScanCommand({
                TableName: "users",
            }));
            const users = (data.Items ?? []).map((item) => {
                this.logger.log(`User => ${JSON.stringify(item)}`);
                return {
                    id: item.userId,
                    name: item.name,
                    email: item.email,
                };
            });
            return users;
        }
        catch (err) {
            this.logger.log(`Error in reading realUsers => ${err}`);
            throw err;
        }
    }
};
UserRepositoryImpl = __decorate([
    Injectable(),
    __param(0, Inject(LOGGER)),
    __param(1, Inject(DYNAMO_DB)),
    __metadata("design:paramtypes", [Object, DynamoDBDocumentClient])
], UserRepositoryImpl);
export { UserRepositoryImpl };
