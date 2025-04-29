// src/infrastructure/database/db.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongoStatusService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    console.log(`🚀 MongoDB status: ${states[this.connection.readyState]}`);

    console.log(
      `📡 Conectado a: ${this.connection.host}:${this.connection.port}/${this.connection.name}`,
    );
  }
}
