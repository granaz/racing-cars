import { APIGatewayEvent } from 'aws-lambda'
import { RcErrors, ResponseError } from '../responseBuilder/ResponseError.service'
import { checkUuid } from '../utils'

export class EventParser {
  private rawEvent: APIGatewayEvent;

  public parsedBody: { [name: string]: unknown };

  public pathParameters: { [name: string]: string; };

  constructor (event: APIGatewayEvent) {
    this.rawEvent = event
    this.checkPathParameters()
    this.parseEvent()
  }

  /**
   * parseEvent
   */
  public parseEvent () {
    try {
      this.parsedBody = JSON.parse(this.rawEvent.body)
    } catch (error) {
      throw new RcErrors(ResponseError.JSON_SYNTAX_ERROR)
    }
  }

  /**
   * checkPathParameters
   */
  public checkPathParameters () {
    this.pathParameters = this.rawEvent.pathParameters

    const existingParameters = {
      pilotId: (uuid) => {
        checkUuid(uuid)
      },
      raceId: (uuid) => {
        checkUuid(uuid)
      }
    }

    for (const param in this.pathParameters) {
      if (param in existingParameters) {
        existingParameters[param](this.pathParameters[param])
      }
    }
  }
}
