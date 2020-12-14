import { createRace, getRaceById, updateRace } from '../../db/cars'
import { IRaces } from '../../models/interfaces/entities/iraces'
import { Pilots } from '../pilots/Pilots.service'
import { RcErrors, ResponseError } from '../responseBuilder/ResponseError.service'
import { Teams } from '../teams/Teams.service'
import { RaceInput } from './RacesInput.service'

export class Races extends RaceInput {
  /**
   * createRace
   */
  public async createRace (teamId: string, pilotId: string): Promise<IRaces> {
    const team = new Teams();
    const pilot = new Pilots();

    if (!await team.getTeamById(teamId)) throw new RcErrors(ResponseError.TEAM_NOT_FOUND);

    if (!await pilot.getPilotById(pilotId)) throw new RcErrors(ResponseError.PILOT_NOT_FOUND);

    return await createRace(teamId, pilotId);
  }

  /**
   * getRace
   */
  public async getRaceById (raceId: string): Promise<IRaces> {
    return await getRaceById(raceId)
  }

  /**
   * updateRace
   */
  public async updateRace (raceId: string, raceParams: IRaces) {
    const race = await getRaceById(raceId);

    if (!race) throw new RcErrors(ResponseError.RACE_NOT_FOUND);

    for (const item in race) {
      if (raceParams.hasOwnProperty(item)) {
        race[item] = raceParams[item];
      }
    }

    return await updateRace(race);
  }
}
