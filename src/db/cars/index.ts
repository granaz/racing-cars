import { RaceStatus } from '../../models/enums/raceStatus.enum'
import { IRaces } from '../../models/interfaces/entities/iraces'
import { keysToCamelCase } from '../../services/utils'
import { DataBaseConnection } from '../dbConnection'

/**
 * Create a race based on a teamId and pilotId
 * @param teamId
 * @param pilotId
 */
export const createRace = async (teamId: string, pilotId: string): Promise<IRaces> => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query({
    text: `INSERT INTO rc_races (
        date,
        winner,
        status,
        team_id,
        pilot_id,
        car_id
      )
      VALUES($1, $2, $3, $4, $5, (
        SELECT car_id FROM rc_teams where id = $4
      )) RETURNING *;`,
    values: [
      new Date().toISOString(),
      null,
      RaceStatus.IN_PROGRESS,
      teamId,
      pilotId
    ]
  })

  return keysToCamelCase(result.rows[0]) as IRaces
}

/**
 * Get a race based on given Id
 * @param raceId
 */
export const getRaceById = async (raceId: string) => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query({
    text: 'select * from rc_races where id = $1;',
    values: [
      raceId
    ]
  })

  return keysToCamelCase(result.rows[0]) as IRaces
}

export const updateRace = async (raceParams: IRaces) => {
  const db = await new DataBaseConnection().connect()

  const result = await db.query({
    text: `UPDATE rc_races SET
          date = $2,
          winner = $3,
          status = $4,
          team_id = $5,
          pilot_id = $6,
          car_id = $7
        WHERE id = $1
        RETURNING *;`,
    values: [
      raceParams.id,
      raceParams.date,
      raceParams.winner,
      raceParams.status,
      raceParams.teamId,
      raceParams.pilotId,
      raceParams.carId
    ]
  });

  return keysToCamelCase(result.rows[0]) as IRaces;
}
