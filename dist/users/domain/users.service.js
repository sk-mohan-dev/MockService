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
import { Inject, Injectable } from "@nestjs/common";
import { LOGGER } from "../../logger/logger.js";
import { USER_REPOSITORY } from "../data/users.repository.js";
let UsersService = class UsersService {
    logger;
    userRepository;
    constructor(logger, userRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
    }
    allUsers() {
        return this.userRepository.allUsers();
    }
    saveUser(name, email) {
        const userRequest = {
            name: name,
            email: email,
        };
        return this.userRepository.saveUser(userRequest);
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, Inject(LOGGER)),
    __param(1, Inject(USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
export { UsersService };
