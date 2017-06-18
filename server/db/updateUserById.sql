UPDATE users
SET 
	first_name = $2
	, last_name = $3
	, phone = $4
	, email = $5
	, address1 = $6
	, address2 = $7
	, city = $8
	, state_id = $9
	, country_id = $10
	, zip = $11
	, renter_rating = $12
	, inactive = $13
	, auth_id = $14
WHERE id = $1;

-- {
--     "id": 5
-- 	,"first_name": "Sherlock"
-- 	, "last_name": "Holmes"
-- 	, "phone": 2019874564
-- 	, "email": "bestonbakerstreet@imbetterthanyou.eu"
-- 	, "address1": "1313 bakerstreet"
-- 	, "address2": "B"
-- 	, "city": "London"
-- 	, "state_id": 47
-- 	, "country_id": 1
-- 	, "zip": 84118
-- 	, "renter_rating": 5
-- 	, "inactive": false
-- 	, "auth_id": null
-- }