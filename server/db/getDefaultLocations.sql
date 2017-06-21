SELECT settings.*, locations.description 
FROM settings 
JOIN locations 
ON settings.location_id = locations.id
;