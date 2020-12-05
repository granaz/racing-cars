CREATE TABLE IF NOT EXISTS rc_races(
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  date timestamp,
  winner varchar(255),
  status varchar(255),
  team_id uuid,
  pilot_id uuid,
  car_id uuid,
  CONSTRAINT fk_car
    FOREIGN KEY(car_id) 
      REFERENCES rc_cars(id),
  CONSTRAINT fk_pilot
    FOREIGN KEY(pilot_id) 
      REFERENCES rc_pilots(id),
  CONSTRAINT fk_team
    FOREIGN KEY(team_id) 
      REFERENCES rc_teams(id)
);
