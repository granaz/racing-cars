import { DataBaseConnection } from "../dbConnection";

export const getAllPilots = async () => {
  const db = await new DataBaseConnection().connect();

  const result = await db.query('select * from rc_pilots;');

  return result.rows;
}

export const getPilotById = async (pilotId: string) => {
  const db = await new DataBaseConnection().connect();

  const result = await db.query({
    text: 'select * from rc_pilots where id = xasd$1',
    values: [pilotId],
  });

  return result.rows[0];
}