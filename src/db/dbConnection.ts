import { dbConfig } from './dbConfig';
import * as pg from 'pg';

export class DataBaseConnection {
  static client: pg.Client;
  private isConnected = false;

  constructor() {
    if (!DataBaseConnection.client) {
      DataBaseConnection.client = new pg.Client(dbConfig);
    }
  }

  /**
   * connect
   */
  public async connect(): pg.Client {
    if (!this.isConnected) {
      await DataBaseConnection.client.connect();
      this.isConnected = true;
    }

    return DataBaseConnection.client;
  }
}
