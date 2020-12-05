/**
 * Entity from the rc_races table
 */
export interface IRaces {
  id: string,
  date: string,
  winner: string,
  status: string,
  teamId: string,
  pilotId: string,
  carId: string,
}
