INSERT INTO rc_cars(id, manufactor, model, year, engine) VALUES('a297bb80-6f89-41ba-81ba-46c8b8a69887', 'Ford', 'GT', 1969, 7.0) ON CONFLICT DO NOTHING;
INSERT INTO rc_parts(manufactor, part_name, car_id) VALUES('Ford', 'spare engine', 'a297bb80-6f89-41ba-81ba-46c8b8a69887') ON CONFLICT DO NOTHING;
INSERT INTO rc_teams(id, name, car_id) VALUES('effbb942-a4b8-4ec9-8ada-4a706a329567', 'Shelby-American Inc.', 'a297bb80-6f89-41ba-81ba-46c8b8a69887') ON CONFLICT DO NOTHING;
INSERT INTO rc_pilots(name, age, team_id) VALUES('Bill Gates', 65, 'effbb942-a4b8-4ec9-8ada-4a706a329567') ON CONFLICT DO NOTHING;
