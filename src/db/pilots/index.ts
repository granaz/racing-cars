import { IPilots } from '../../models/interfaces/entities/ipilots'
import { keysToCamelCase } from '../../services/utils'
import { DataBaseConnection } from '../dbConnection'

export const getAllPilots = async (): Promise<IPilots[]> => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query('select * from rc_pilots;')

  return keysToCamelCase(result.rows) as IPilots[]
}

export const getPilotById = async (pilotId: string): Promise<IPilots> => {
  const db = await new DataBaseConnection().connect();

  const result = await db.query({
    text: 'select * from rc_pilots where id = $1',
    values: [pilotId]
  })

  return keysToCamelCase(result.rows[0]) as IPilots
}
