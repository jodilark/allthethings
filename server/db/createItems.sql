INSERT INTO items
(original_package, is_part, is_consumable, replacement_comment, replacement_link, user_id, location_id, short_name, description, qty, img, purchase_price, purchase_date, purchase_reason, purchase_retailer, warrenty_period_in_days, other_common_loc_json, sentimental_rating, frequency_qty, frequency_period, replace_radio_default, trackby_json, upc, date_added, last_accessed, resale_value, parent_item_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)