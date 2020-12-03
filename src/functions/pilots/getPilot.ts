import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda';
import 'source-map-support/register';
import { EventParser } from '../../services/eventParser/EventParser.service';
import { Pilots } from '../../services/pilots/Pilots.service';
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const pilotId = new EventParser(event).pathParameters.pilotId;

    const pilot = new Pilots;

    return new ResponseBuilder(await pilot.getPilotById(pilotId)).ok().build();
  } catch (error) {
    return new ResponseBuilder().addError(error).build();
  }
}
