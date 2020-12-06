import { dbConfig } from './dbConfig'
import * as pg from 'pg'

export class DataBaseConnection {
  static client: pg.Client;
  static isConnected = false;

  constructor () {
    if (!DataBaseConnection.client) {
      DataBaseConnection.client = new pg.Client(dbConfig)
    }
  }

  /**
   * connect
   */
  public async connect (): pg.Client {
    if (!DataBaseConnection.isConnected) {
      await DataBaseConnection.client.connect()
      DataBaseConnection.isConnected = true
    }

    return DataBaseConnection.client
  }
}
