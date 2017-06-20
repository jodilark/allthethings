INSERT INTO locations
(loc_class_id, description, container_id, x_coordinate, y_coordinate, z_coordinate, parent_location_id, child_locations_json)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);