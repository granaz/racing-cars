import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda'
import { IRaces } from '../../models/interfaces/entities/iraces'
import { EventParser } from '../../services/eventParser/EventParser.service'
import { Races } from '../../services/races/Races.service'
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service'
import { RcErrors } from '../../services/responseBuilder/ResponseError.service'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const races = new Races()
    const parsedEvent = new EventParser(event);
    const body = races.validateUpdateInput(parsedEvent) as IRaces;

    const updatedRace = races.updateRace(parsedEvent.pathParameters.raceId, body);

    return new ResponseBuilder(updatedRace).created().build()
  } catch (error: unknown) {
    return new ResponseBuilder().addError(error as RcErrors).build()
  }
}
