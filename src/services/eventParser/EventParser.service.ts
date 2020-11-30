import { APIGatewayEvent } from "aws-lambda";
import { checkUuid } from "../utils";


export class EventParser {
  private rawEvent: APIGatewayEvent;

  public parsedEvent: APIGatewayEvent;

  public pathParameters: { [name: string]: string; };

  constructor(event) {
    this.rawEvent = event;
    this.checkPathParameters();
  }

  /**
   * checkPathParameters
   */
  public checkPathParameters() {
    this.pathParameters = this.rawEvent.pathParameters;

    const existingParameters = {
      pilotId: (uuid) => {
        checkUuid(uuid);
      }
    }

    for (const param in this.pathParameters) {
      if (param in existingParameters) {
        existingParameters[param](this.pathParameters[param]);
      }
    }
  }
}