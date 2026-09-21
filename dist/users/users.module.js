var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module.js";
import { UsersController } from "./controller/users.controller.js";
import { USER_REPOSITORY, UserRepositoryImpl, } from "./data/users.repository.js";
import { UsersService } from "./domain/users.service.js";
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    Module({
        imports: [LoggerModule],
        controllers: [UsersController],
        providers: [
            {
                provide: USER_REPOSITORY,
                useClass: UserRepositoryImpl,
            },
            UsersService,
        ],
    })
], UsersModule);
export { UsersModule };
