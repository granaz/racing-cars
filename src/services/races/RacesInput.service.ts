import { IRaces } from '../../models/interfaces/entities/iraces'
import { EventParser } from '../eventParser/EventParser.service'
import { RcErrors, ResponseError } from '../responseBuilder/ResponseError.service'
import { checkUuid } from '../utils'

export class RaceInput {
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

    result = (body.hasOwnProperty('teamId')) && (body.hasOwnProperty('pilotId'))

    if (!result) {
      throw new RcErrors(ResponseError.MISSING_BODY_INFORMATON)
    }

    result = (typeof body.teamId === 'string') && (typeof body.pilotId === 'string');

    if (!result) {
      throw new RcErrors(ResponseError.INVALID_PARAMETERS)
    }

    result = (checkUuid(body.teamId)) && (checkUuid(body.pilotId));

    return body;
  }

  /**
   * validateUpdateInput
   */
  public validateUpdateInput (event: EventParser) {
    const toUpdate = {};
    const updateInput: IRaces = {
      id: null,
      date: null,
      winner: null,
      status: null,
      teamId: null,
      pilotId: null,
      carId: null
    };
    const body = event.parsedBody as IRaces;

    for (const input in updateInput) {
      if (body.hasOwnProperty(input)) {
        toUpdate[input] = body[input];
      }
    }

    return body;
  }
}
