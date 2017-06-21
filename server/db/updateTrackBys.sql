UPDATE trackbys
SET
trackby_name = $2
, trackby_value = $3
, trackby_category = $4
WHERE id = $1
;