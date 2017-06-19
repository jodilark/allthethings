
-- SCHEMA DELETE
	DROP TABLE IF EXISTS auth CASCADE;
	DROP TABLE IF EXISTS features CASCADE;
	DROP TABLE IF EXISTS declutter CASCADE;
	DROP TABLE IF EXISTS settings CASCADE;
	DROP TABLE IF EXISTS users CASCADE;
	DROP TABLE IF EXISTS items CASCADE;
	DROP TABLE IF EXISTS locations CASCADE;
	DROP TABLE IF EXISTS trackbys CASCADE;
	DROP TABLE IF EXISTS containers CASCADE;
	DROP TABLE IF EXISTS loc_classes CASCADE;
	DROP TABLE IF EXISTS country CASCADE;
	DROP TABLE IF EXISTS state CASCADE;
	DROP TABLE IF EXISTS rental CASCADE;

-- SCHEMA
	-- AUTH
	CREATE TABLE IF NOT EXISTS auth
	(
		id serial primary key
        ,code varchar
	);
	INSERT INTO auth (code) VALUES ('F4KJ3F');

	-- FEATURES
	CREATE TABLE IF NOT EXISTS features
	(
		id serial primary key
		, description varchar
	);
    INSERT INTO features
    (description)
    VALUES
    ('Tracks all the things!')
    , ('Rent out things that you don''t have a sentimental attachment to')
    , ('Track who is borrowing what')
    , ('Create custom locations, and containers')
    , ('Track warrenty information on things that you purchased')
    , ('See when you should store, toss, donate, or sell your items')
    , ('Track items by custom fields')
    , ('Find what is in a box without opening it')
    , ('Tracks the common locations of your things')
    ;

	-- DECLUTTER
	CREATE TABLE IF NOT EXISTS declutter
	(
		id serial primary key
		, time_frame_days int
		, time_frame_action varchar
	);
	INSERT INTO declutter
	(time_frame_days, time_frame_action)
	VALUES
	(2,'Move to Storage')
	, (90, 'Move to Deep-Storage')
	, (365, 'Consider Donating, Tossing, Selling')
	;

    --SETTINGS
    CREATE TABLE IF NOT EXISTS settings
    (
        id serial primary key
        , sentimental_rental_threshold int
		, location_id int
        , declutter_id int
    );
    -- INSERT INTO settings
    -- (sentimental_rental_threshold, location_id, declutter_id)
    -- VALUES
    -- (3, 1, 1)
    -- ;

	-- USERS
	CREATE TABLE IF NOT EXISTS users
	(
		id serial primary key
		, first_name varchar
		, last_name varchar
		, phone numeric
		, email varchar
		, address1 varchar
		, address2 varchar
		, city varchar
		, state_id int
		, country_id int
		, zip numeric
		, renter_rating int
		, inactive boolean
		, auth_id int
		, first_login boolean
	);
    INSERT INTO users
    (first_name, last_name , phone , email , address1 , address2 , city , state_id , country_id , zip , renter_rating , inactive , auth_id, first_login)
    VALUES
    ('Jodi', 'Parker', 8019496842, 'jodilparker@gmail.com', '6445 south orange sky court', '', 'West Jordan', 52, 1, 84081, 5, false, 1, false)
	;
    -- UPDATE users
    -- SET first_name = 'servo'
    -- WHERE id = 1
    -- ;
    
    -- ITEMS
	CREATE TABLE IF NOT EXISTS items
	(
		id serial primary key
		, user_id int
		, short_name varchar
		, description varchar(500)
		, qty int
        , img varchar(500)
		, purchase_price money
		, purchase_date date
		, purchase_reason varchar(500)
		, purchase_retailer varchar
		, warrenty_period_in_days int
		, original_package boolean
		, replacement_link varchar(500)
		, replacement_comment varchar(500)
		, location_id int
		, other_common_loc_json jsonb
		, trackby_json jsonb
		, is_part boolean
		, parent_item_id int
		, is_consumable boolean
		, sentimental_rating int
		, frequency_used varchar
		, date_added timestamp
		, last_accessed timestamp
		, resale_value money
	);

    -- INSERT INTO items
    -- (user_id, short_name, description, qty, img,purchase_price, purchase_date, purchase_reason, purchase_retailer, warrenty_period_in_days, original_package, replacement_link, replacement_comment, location_id, other_common_loc_json, trackby_json, is_part, parent_item_id, is_consumable, sentimental_rating, frequency_used, date_added, last_accessed, resale_value)
    -- VALUES
    -- (
    --     1
	-- 	, 'Samus Amibo'
	-- 	, 'An amibo of samas standing'
	-- 	, 1
    --     , 'https://images-na.ssl-images-amazon.com/images/I/71opuzMsIfL._AC_SX215_.jpg'
	-- 	, 15.99
	-- 	, '2015-12-25'::date
	-- 	, 'christmas gift'
	-- 	, 'amazon'
	-- 	, null
	-- 	, false
	-- 	, 'https://www.amazon.com/Samus-amiibo-Super-Smash-Bros/dp/B00N49EEO2/ref=sr_1_1/131-1826149-9240022?ie=UTF8&qid=1497643476&sr=8-1&keywords=amiibo%2Bsamus%2Baran&th=1'
	-- 	, null
	-- 	, 352
	-- 	, '[{"location_id":23},{"location_id":52}]'
	-- 	, '[{"trackby_id":4},{"trackby_id":7}]'
	-- 	, false
	-- 	, null
	-- 	, false
	-- 	, 4
	-- 	, 2
	-- 	, now()
	-- 	, now()
	-- 	, 15.99
	-- );

	-- LOCATIONS
	CREATE TABLE IF NOT EXISTS locations
	(
		id serial primary key
		, loc_class_id int
		, description varchar
		, container_id int
		, x_coordinate int
		, y_coordinate int
		, z_coordinate int
		, parent_location_id int
		, child_locations_json jsonb
	);
	-- INSERT INTO locations
	-- (loc_class_id, description, container_id, x_coordinate, y_coordinate, z_coordinate, parent_location_id, child_locations_json)
    -- VALUES
	-- (
	-- 	3
	-- 	, 'Jodi''s desk'
	-- 	, 23
	-- 	, null
	-- 	, 1
	-- 	, 2
	-- 	, 3
	-- 	, '[{"location_id":12}, {"location_id":4}]'
	-- );

	-- TRACKBYS
	CREATE TABLE IF NOT EXISTS trackbys
	(
		id serial primary key
		, trackby_name varchar
		, trackby_value varchar
		, trackby_category varchar
	);
	-- INSERT INTO trackbys
	-- (trackby_name, trackby_value, trackby_category)
	-- VALUES
	-- ('hobby', 'gaming', null);

	-- CONTAINERS
	CREATE TABLE IF NOT EXISTS containers
	(
		id serial primary key
		, name varchar
	);
    -- INSERT INTO containers
    -- (name)
    -- VALUES
    -- ('desk');

	-- LOCATION CLASSIFICATIONS
	CREATE TABLE IF NOT EXISTS loc_classes
	(
		id serial primary key
		, name varchar
		, description varchar(500)
	);
	INSERT INTO loc_classes
	(name, description)
	VALUES
	('temporary', 'this location may not exist in a few minutes, hours, days')
	, ('storage', 'a location that resides in normal traffic areas')
	, ('deep-storage', 'a location that is hard to reach and is outside of normal traffic areas')
	;

	-- COUNTRY
	CREATE TABLE IF NOT EXISTS country
	(
		id serial primary key
		, code varchar
		, name varchar
	);
    INSERT INTO country (code,name) VALUES ('USA','United States of America');

	-- STATE
	CREATE TABLE IF NOT EXISTS state
	(
		id serial primary key
		, code varchar
		, name varchar
	);
    INSERT INTO state (code,name) VALUES ('AL','Alabama');
    INSERT INTO state (code,name) VALUES ('AK','Alaska');
    INSERT INTO state (code,name) VALUES ('AS','American Samoa');
    INSERT INTO state (code,name) VALUES ('AZ','Arizona');
    INSERT INTO state (code,name) VALUES ('AR','Arkansas');
    INSERT INTO state (code,name) VALUES ('CA','California');
    INSERT INTO state (code,name) VALUES ('CO','Colorado');
    INSERT INTO state (code,name) VALUES ('CT','Connecticut');
    INSERT INTO state (code,name) VALUES ('DE','Delaware');
    INSERT INTO state (code,name) VALUES ('DC','District of Columbia');
    INSERT INTO state (code,name) VALUES ('FM','Federated States of Micronesia');
    INSERT INTO state (code,name) VALUES ('FL','Florida');
    INSERT INTO state (code,name) VALUES ('GA','Georgia');
    INSERT INTO state (code,name) VALUES ('GU','Guam');
    INSERT INTO state (code,name) VALUES ('HI','Hawaii');
    INSERT INTO state (code,name) VALUES ('ID','Idaho');
    INSERT INTO state (code,name) VALUES ('IL','Illinois');
    INSERT INTO state (code,name) VALUES ('IN','Indiana');
    INSERT INTO state (code,name) VALUES ('IA','Iowa');
    INSERT INTO state (code,name) VALUES ('KS','Kansas');
    INSERT INTO state (code,name) VALUES ('KY','Kentucky');
    INSERT INTO state (code,name) VALUES ('LA','Louisiana');
    INSERT INTO state (code,name) VALUES ('ME','Maine');
    INSERT INTO state (code,name) VALUES ('MH','Marshall Islands');
    INSERT INTO state (code,name) VALUES ('MD','Maryland');
    INSERT INTO state (code,name) VALUES ('MA','Massachusetts');
    INSERT INTO state (code,name) VALUES ('MI','Michigan');
    INSERT INTO state (code,name) VALUES ('MN','Minnesota');
    INSERT INTO state (code,name) VALUES ('MS','Mississippi');
    INSERT INTO state (code,name) VALUES ('MO','Missouri');
    INSERT INTO state (code,name) VALUES ('MT','Montana');
    INSERT INTO state (code,name) VALUES ('NE','Nebraska');
    INSERT INTO state (code,name) VALUES ('NV','Nevada');
    INSERT INTO state (code,name) VALUES ('NH','New Hampshire');
    INSERT INTO state (code,name) VALUES ('NJ','New Jersey');
    INSERT INTO state (code,name) VALUES ('NM','New Mexico');
    INSERT INTO state (code,name) VALUES ('NY','New York');
    INSERT INTO state (code,name) VALUES ('NC','North Carolina');
    INSERT INTO state (code,name) VALUES ('ND','North Dakota');
    INSERT INTO state (code,name) VALUES ('MP','Northern Mariana Islands');
    INSERT INTO state (code,name) VALUES ('OH','Ohio');
    INSERT INTO state (code,name) VALUES ('OK','Oklahoma');
    INSERT INTO state (code,name) VALUES ('OR','Oregon');
    INSERT INTO state (code,name) VALUES ('PW','Palau');
    INSERT INTO state (code,name) VALUES ('PA','Pennsylvania');
    INSERT INTO state (code,name) VALUES ('PR','Puerto Rico');
    INSERT INTO state (code,name) VALUES ('RI','Rhode Island');
    INSERT INTO state (code,name) VALUES ('SC','South Carolina');
    INSERT INTO state (code,name) VALUES ('SD','South Dakota');
    INSERT INTO state (code,name) VALUES ('TN','Tennessee');
    INSERT INTO state (code,name) VALUES ('TX','Texas');
    INSERT INTO state (code,name) VALUES ('UT','Utah');
    INSERT INTO state (code,name) VALUES ('VT','Vermont');
    INSERT INTO state (code,name) VALUES ('VI','Virgin Islands');
    INSERT INTO state (code,name) VALUES ('VA','Virginia');
    INSERT INTO state (code,name) VALUES ('WA','Washington');
    INSERT INTO state (code,name) VALUES ('WV','West Virginia');
    INSERT INTO state (code,name) VALUES ('WI','Wisconsin');
    INSERT INTO state (code,name) VALUES ('WY','Wyoming');

	-- RENTAL
	CREATE TABLE IF NOT EXISTS rental
	(
		id serial primary key
		, item_owner_id int
		, renter_user_id int
		, rent_start_time_date timestamp
		, rent_due_date date
		, agreement_signed boolean
	);
	-- INSERT INTO rental
	-- (item_owner_id, renter_user_id, rent_start_time_date, rent_due_date, agreement_signed)
	-- VALUES
	-- (
	-- 	1
	-- 	, 2
	-- 	, now()
	-- 	, '2017-07-04'::date
	-- 	, true
	-- );
