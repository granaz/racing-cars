import { getAllTeams, getTeamById } from '../../db/teams';
import { ITeams } from '../../models/interfaces/entities/iteams'

export class Teams {
  /**
   * getTeams
   */
  public async getTeams (): Promise<ITeams[]> {
    return await getAllTeams();
  }

  /**
   * getTeamById
   */
  public async getTeamById (teamId: string): Promise<ITeams> {
    return await getTeamById(teamId);
  }
}
