import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Pilots } from '../../services/pilots/Pilots.service';
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service';

export const handler: APIGatewayProxyHandler = async () => {
  const pilots = new Pilots;

  return new ResponseBuilder(await pilots.getPilots()).ok().build();
}
