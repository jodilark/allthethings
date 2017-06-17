SELECT users.id, users.first_name , users.last_name , users.phone , users.email , users.address1 , users.address2 , users.city , state.name as "state" , country.name as "country" , users.zip , users.renter_rating , users.is_active as "active" , users.auth_id  FROM users
JOIN state
ON users.state_id = state.id
JOIN country
ON users.country_id = country.id;

		