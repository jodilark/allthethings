UPDATE items
SET 
date_added = $1
,description = $2 
,frequency_period = $3
,frequency_qty = $4
,img = $5 
,is_consumable = $6
,is_part = $7 
,last_accessed = $8 
,location_id = $9
,original_package = $10
,other_common_loc_json = $11
,parent_item_id = $12 
,purchase_date = $13
,purchase_price = $14
,purchase_reason = $15 
,purchase_retailer = $16
,qty = $17
,replace_radio_default = $18
,replacement_comment = $19
,replacement_link = $20
,resale_value = $21 
,sentimental_rating = $22 
,short_name = $23
,trackby_json = $24
,upc = $25
,user_id = $26
,warrenty_period_in_days = $27
WHERE id = $28
;

