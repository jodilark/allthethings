SELECT items.id, items.original_package, items.is_part, items.is_consumable, items.replacement_comment, items.replacement_link, users.id as "userID", users.first_name as "Owner", locations.id as "locationID", locations.description as "locationDescription", items.short_name, items.description, items.qty, items.img, items.purchase_price, items.purchase_date, items.purchase_reason, items.purchase_retailer, items.warrenty_period_in_days, items.other_common_loc_json, items.sentimental_rating, items.frequency_qty, items.frequency_period, items.replace_radio_default, items.trackby_json, items.upc, items.date_added, items.last_accessed, items.resale_value, items.parent_item_id
FROM items
JOIN users
ON items.user_id = users.id
JOIN locations
ON items.location_id = locations.id
ORDER BY items.id asc
;