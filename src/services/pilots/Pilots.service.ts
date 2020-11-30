import { getAllPilots, getPilotById } from "../../db/pilots/pilots";

export class Pilots {
  /**
   * getPilots
   */
  public async getPilots() {
    return await getAllPilots();
  }

  /**
   * getPilotById
   */
  public async getPilotById(pilotId: string) {
    return await getPilotById(pilotId);
  }
}