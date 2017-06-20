SELECT
loc_classes.name as "loc_class_name"
, loc_classes.description as "loc_class_desc"
, containers.name as "loc_container"
, locations.id
, locations.description as "loc_desc"
, locations.loc_class_id
, locations.container_id
, locations.x_coordinate
, locations.y_coordinate
, locations.z_coordinate
, locations.parent_location_id
FROM locations
JOIN loc_classes
ON loc_classes.id = locations.loc_class_id
JOIN containers
ON containers.id = locations.container_id
ORDER BY id asc
;