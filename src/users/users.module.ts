import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module.js";
import { UsersController } from "./controller/users.controller.js";
import {
  USER_REPOSITORY,
  UserRepositoryImpl,
} from "./data/users.repository.js";
import { UsersService } from "./domain/users.service.js";

@Module({
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
export class UsersModule {}
