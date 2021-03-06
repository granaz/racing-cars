DROP TABLE IF EXISTS rc_cars;
DROP TABLE IF EXISTS rc_parts;
DROP TABLE IF EXISTS rc_pilots;
DROP TABLE IF EXISTS rc_teams;

CREATE TABLE IF NOT EXISTS rc_cars(
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  manufactor varchar(255),
  model varchar(255),
  year integer,
  engine_disp decimal(2,1)
);

CREATE TABLE IF NOT EXISTS rc_teams(
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(255),
  car_id uuid,
  CONSTRAINT fk_car
    FOREIGN KEY(car_id) 
      REFERENCES rc_cars(id)
);

CREATE TABLE IF NOT EXISTS rc_pilots(
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(255),
  age integer,
  team_id uuid,
  CONSTRAINT fk_team
    FOREIGN KEY(team_id) 
      REFERENCES rc_teams(id)
);

CREATE TABLE IF NOT EXISTS rc_parts(
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  manufactor varchar(255),
  part_name varchar(255),
  car_id uuid,
  CONSTRAINT fk_car
    FOREIGN KEY(car_id) 
      REFERENCES rc_cars(id)
);
