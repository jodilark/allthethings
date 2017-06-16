Concept: Asset tracking for the home

What problem does this app solve?
With this app, you should be able to:
	know what you own (for yourself and for insurance reasons)
	know where it is
	know who has it out on loan
	know if and when you should store it, toss it, donate it or sell it
	
How does it solve those problems?
	Through user input of item, and location information combined with various tracking options.
	
Who is your target user?
	Anyone who wants to be hyper organized
	Anyone who loses items due to loaning them out, or misplacing them.
	Anyone who has stored anything in a box in the basement or storage unit
	
How much experience do they have with technology?
	basic data entry
	ability to operate camera on smart phone

mvp feature set
	login
		via Auth0
			google
			Custom
			facebook
			twitter
			github
		creates you as a user when you sign in for the first time
	logout
		returns you to landing page
	Public Landing page
		about
			summery of app purpose
			list of features
			signup
			login
		contact info
			email
			social media links
		--
		Do's:
			signup/login/logout
			redirect to social media links
		Dependencies:
			login/logout
	
	User dashboard (landing page after login)
		analytics (tbd)
			Depreciation tracking via time
		nav:
			create user
			manage users
			create items
			view inventory
			create location
			manage locations
			settings
		--
		Do's:
			use nav links
		Dependencies:
			landing page (for login)
			create user view
			manage users view
			create item view
			view inventory view
			create location view
			manage location view
			settings view
		
	CRUD for users
		for first user: via Auth0
		,then
		User Info
			first_name
			last_name
			contact_info
				current_address
				phone
				email
				social media
			renter rating (anyone other than yourself)
			status active/inactive
		--
		Do's:
			save
			edit
			search/filter/sort
			rate renter
			set address as default location (if default location exists, show location and ask to overwrite)
			set user status
		Dependencies:
			Auth0
			settings: default location
		
	CRUD for items
		Owner (defaults to current user, should have an option to set to none)
		short_name (required)
		Description (required)
		Quantity (defaults to 1 can be zero, cannot be negative)
		purchase price
		purchase date
		reason for purchase
		retailer item was purchased from
		Warranty period
		have original packaging
		Replacement link
		Replacement comment
		location (required)
			make new location (can also be used for move to storage)
		Move to storage
		common other locations (can add multiple)
		tracking information (can add multiple)
			make new tracking
		related items (can add multiple)
		has multiple pieces
			add/remove piece (pieces will be added as their own items with a location of this item)
		is consumable (removes (?) tracking options and deep-storage option)
		sentimental rating
			if put for rental, show are you sure flag if sentimental rating is >= 3
		access frequency
		date added (db only)
		mark as accessed (Do's)
		last accessed date/time ()
		--
		Do's:
			save
			delete
			edit
			mark as accessed
			move
			search/filter/short
			reorder
			rent
			Export of item data to csv
		Dependencies:
			users
			location
			tracking
			rent

	CRUD for tracking
		can have multiple values true/false
		track_name *tags would be a track category
		track_value
		--
		Do's:
			save
			edit
			search/filter/sort
		Dependencies:
			none

	CRUD Container Type (box, bin, bag, shelf, etc)
		name
		--
		Do's:
			save
		Dependencies:
			none

	CRUD location classification
		predefined:
			temporary
			storage
			deep-storage (packed up in a box and stored out of normal traffic areas)
		name
		Description
		--
		Do's:
			save
			delete (only if not on location)
		Dependencies:
			none

	CRUD for locations
		choose type of location
		Description of location
		Choose container type
		xyz co-ordinates/definition relative to a parent
		Choose parent locations (most senior most first, default to "default location from settings page)
		--
		Do's:
			save
			delete (cannot delete if has items)
			edit
			search/filter/sort
			create location type
			create container type
		Dependencies:
			Type of location
			Container type
			settings: default location
	
	CRUD for rentals (accessed from item list or view inventory list)
		Owner info (read only, owner defined on the item record)
		Renter info (can select from existing user, or create new user modal)
		time of rental
		agree to replace with signature
		--
		Do's:
			save
			edit
			archive
			call user create modal
		Dependencies:
			users
			items

	Settings
		time-frames
			move to storage
			move to deep-storage
			consider donating, tossing, or selling
		sentimental rental threshold
		default location definition (home address)
		--
		Do's:
			save
			restore to defaults
			edit

		Dependencies:
			locations table exists
			notification modals

possession
add ons
	add photos of items
	scan a storage/location barcode to get contents of container
	add an item through scanning a barcode/track item by barcode
	generate random barcodes and print
	change UOM
	location maps
	integrated google search
	loaned items geo location
	pantry options
		reorder (1-click amazon)
		add to shopping list
	market value
		setting to notify if market value reaches threshold
	sell on craigs list/classifieds/ebay (1-click)
	on-hand inventory
	reminder system
		take inventory
		re-order (pantry)
		call back rental



Routes
	create user
	manage users
	create items
	view inventory
	create location
	manage locations
	settings

Controllers
	server main controller for
		login
		logout
	Public Landing page	
	User dashboard (landing page after login)		
	Users
		create
		manage		
	Items
		create
		manage
	locations
		create
		manage
	Settings	

Directives
	Tracking
	Container
	Type of Location
	Rental

EndPoints (- symbol denotes that the api is a duplicate)
	Public Landing Page
		Login (/api/auth)
		getAuthentication get(/api/auth/me)
		postAuthentication post(/api/auth/me)
		putAuthentication put(/api/auth/me)
		getFeatureList get(/api/features)
	Dashboard
		Gets for all the data (analytics tbd)
		getSettings get(/api/settings)
	Create/Manage Users
		getStates get(/api/states)
		getCountry get(/api/country)
		getAllUsers get(/api/users)
		createUser post(/api/users)
		updateUser put(/api/users/:id)
		getDefaultLocation get(/api/settings/default_location)
		createDefaultLocation post(/api/settings/default_location)
		updateDefaultLocation put(/api/settings/default_location)
	Create Item
		getAllItems get(/api/items)
		- getAllUsers get(/api/users)
		getAllLocations get(/api/locations)
		getAlltrackbys get(/api/trackbys)
		createItem post(/api/items)
		updateItem put(/api/items/:id)
		deleteItems delete(/api/items:id)
	Rental
		- getAllItems get(/api/items)	
		- getAllUsers get(/api/users)
		getAllRentals get(/api/rentals)	
		createRental post(/api/rentals)
		updateRental put(/api/rentals/:id)
		deleteRental delete(/api/rentals/:id)
	Trackbys
		- getAlltrackbys get(/api/trackbys)
		createTrackby post(/api/trackbys)
		updateTrackby put(/api/trackby/:id)
	Containers
		getAllContainers get(/api/containers)
		createContainer post(/api/containers)
		updateContainer put(/api/containers/:id)
		- getAllLocations get(/api/locations)
		deleteContainer delete(/api/containers/:id)
	LocationClassification
		getLocClass get(/api/loc_classes)
		createLocClass post(/api/loc_classes)
		- getAllLocations get(/api/locations)		
		deleteLocClass delete(/api/loc_classes/:id)
	Locations
		- getLocClass get(/api/loc_classes)		
		- getAllLocations get(/api/locations)
		- getAllContainers get(/api/containers)
		- getDefaultLocation get(/api/settings/default_location)
		- updateDefaultLocation put(/api/settings/default_location)
		createLocation post(/api/locations)
		updateLocation put(/api/locations/:id)
		- getAllItems get(/api/items)
		deleteLocation delete(/api/locations/:id)
	Settings
		- getSettings get(/api/settings)		
		- getDefaultLocation get(/api/settings/default_location)		
		- updateDefaultLocation put(/api/settings/default_location)
		- getAllLocations get(/api/locations)
		- updateLocation put(/api/locations/:id)
		getDefaultSettings get(/api/settings/default)		
		updateSettings put(/api/settings)


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
		, zip int
		, renter_rating int
		, is_active boolean
		, auth_id int
	);
    -- INSERT INTO users
    -- (first_name, last_name , phone , email , address1 , address2 , city , state_id , country_id , zip , renter_rating , is_active , auth_id)
    -- VALUES
    -- ('Jodi', 'Parker', 8019496842, 'jodilparker@gmail.com', '6445 south orange sky court', '', 'West Jordan', 52, 1, 84081, 5, true, 1)
	-- ;
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
