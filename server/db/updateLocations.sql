UPDATE locations
SET 
description = $2
, parent_location_id = $3
, x_coordinate = $4
, y_coordinate = $5
, z_coordinate = $6
WHERE id = $1
;