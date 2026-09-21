import { Inject, Injectable } from "@nestjs/common";
import { LOGGER, Logger } from "../../logger/logger.js";
import { USER_REPOSITORY, UserRepository } from "../data/users.repository.js";
import { User, UserRequest } from "./users.types.js";

@Injectable()
export class UsersService {
  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  allUsers(): Promise<User[]> {
    return this.userRepository.allUsers();
  }

  saveUser(name: string, email: string): Promise<User> {
    const userRequest: UserRequest = {
      name: name,
      email: email,
    };
    return this.userRepository.saveUser(userRequest);
  }
}
