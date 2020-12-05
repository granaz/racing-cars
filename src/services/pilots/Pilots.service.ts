import { getAllPilots, getPilotById } from '../../db/pilots'
import { IPilots } from '../../models/interfaces/entities/ipilots'

export class Pilots {
  /**
   * getPilots
   */
  public async getPilots (): Promise<IPilots[]> {
    return await getAllPilots()
  }

  /**
   * getPilotById
   */
  public async getPilotById (pilotId: string): Promise<IPilots> {
    return await getPilotById(pilotId)
  }
}
