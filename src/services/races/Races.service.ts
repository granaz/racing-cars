import { createRace, getRaceById } from '../../db/cars'
import { IRaces } from '../../models/interfaces/entities/iraces'
import { EventParser } from '../../services/eventParser/EventParser.service'
import { RcErrors, ResponseError } from '../responseBuilder/ResponseError.service'
import { checkUuid } from '../utils'

export class Races {
  /**
   * createRace
   */
  public async createRace (teamId: string, pilotId: string): Promise<IRaces> {
    return await createRace(teamId, pilotId)
  }

  /**
   * getRace
   */
  public async getRaceById (raceId: string): Promise<IRaces> {
    return await getRaceById(raceId)
  }

  /**
   * validateInput for Races Service
   * @param event
   */
  public validateCreateRaceInput (event: EventParser) {
    let result = true
    const body = event.parsedBody as {
      teamId: string,
      pilotId: string,
    }

    result = result && body.hasOwnProperty('teamId')
    result = result && body.hasOwnProperty('pilotId')

    if (!result) {
      throw new RcErrors(ResponseError.MISSING_BODY_INFORMATON)
    }

    result = result && (typeof body.teamId === 'string')
    result = result && (typeof body.pilotId === 'string')

    if (!result) {
      throw new RcErrors(ResponseError.INVALID_PARAMETERS)
    }

    result = result && (checkUuid(body.teamId))
    result = result && (checkUuid(body.pilotId))

    return body
  }
}
