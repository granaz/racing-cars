import { ITeams } from '../../models/interfaces/entities/iteams'
import { keysToCamelCase } from '../../services/utils'
import { DataBaseConnection } from '../dbConnection'

export const getAllTeams = async (): Promise<ITeams[]> => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query('select * from rc_teams;')

  return keysToCamelCase(result.rows) as ITeams[]
}

export const getTeamById = async (teamId: string): Promise<ITeams> => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query({
    text: 'select * from rc_teams where id = $1',
    values: [teamId]
  })

  return keysToCamelCase(result.rows[0]) as ITeams;
}
