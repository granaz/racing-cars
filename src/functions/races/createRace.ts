import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda'
import { EventParser } from '../../services/eventParser/EventParser.service'
import { Races } from '../../services/races/Races.service'
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service'
import { RcErrors } from '../../services/responseBuilder/ResponseError.service'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const races = new Races()
    const body = races.validateCreateRaceInput(new EventParser(event))

    const newRace = await races.createRace(body.teamId, body.pilotId)

    return new ResponseBuilder(newRace).created().build()
  } catch (error: unknown) {
    return new ResponseBuilder().addError(error as RcErrors).build()
  }
}
