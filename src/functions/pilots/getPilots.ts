import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ResponseBuilder } from '../../services/responseBuilder/ResponseBuilder.service';

export const handler: APIGatewayProxyHandler = async () => {
  //mocking DB pilots get
  const allPilots = [
    {
      name: 'Mark Zuckerberg',
      age: 36,
    },
    {
      name: 'Bill Gates',
      age: 65,
    }
  ]

  return new ResponseBuilder(allPilots).ok().build();
}
