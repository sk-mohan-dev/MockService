import { Injectable } from "@nestjs/common";

export interface Logger {
  log(message: unknown): void;
}

@Injectable()
export class ConsoleLogger implements Logger {
  log(message: unknown): void {
    console.log(JSON.stringify(message));
  }
}

export const LOGGER = Symbol("LOGGER");
