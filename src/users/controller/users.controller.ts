import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { LOGGER, Logger } from "../../logger/logger.js";
import { UsersService } from "../domain/users.service.js";
import { User } from "../domain/users.types.js";
import { UserRequestDto, UserResponseDto } from "./users.dto.js";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(LOGGER)
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll() {
    const allUsers: User[] = await this.usersService.allUsers();
    const usersResponseList: UserResponseDto[] = allUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
    return usersResponseList;
  }

  @Post()
  async createUser(@Body() user: UserRequestDto) {
    try {
      return await this.usersService.saveUser(user.name, user.email);
    } catch (err) {
      throw new HttpException(
        {
          message: "Something went wrong!",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
