INSERT INTO users
(country_id, inactive, first_name, last_name, phone, email, address1, address2, city, state_id, zip, renter_rating)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
