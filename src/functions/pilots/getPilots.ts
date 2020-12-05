import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { EventParser } from '../../services/eventParser/EventParser.service'
import { Pilots } from '../../services/pilots/Pilots.service'
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    new EventParser(event)

    const pilots = new Pilots()

    return new ResponseBuilder(await pilots.getPilots()).ok().build()
  } catch (error) {
    return new ResponseBuilder().addError(error).build()
  }
}
