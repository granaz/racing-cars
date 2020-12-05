import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda'
import { EventParser } from '../../services/eventParser/EventParser.service'
import { Races } from '../../services/races/Races.service'
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service'
import { RcErrors } from '../../services/responseBuilder/ResponseError.service'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const races = new Races()
    const raceId = new EventParser(event).pathParameters.raceId as string

    const race = await races.getRaceById(raceId)

    return new ResponseBuilder(race).ok().build()
  } catch (error: unknown) {
    return new ResponseBuilder().addError(error as RcErrors).build()
  }
}
