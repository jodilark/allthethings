# allthethings
Home asset tracking and inventory management

Setup and Run Instructions

Services I used:
• elephant SQL for my postgres sql server
• Auth0 for my authorization

To run, you will need to place a config file into the server folder (or define a custom path in the server.js file).

Config file:
default name = .config

contents of config file:

module.exports = {
domain: "localhost"
,clientID: "Oauth Client ID"
,clientSecret: "Oath Client Secret"
,secret: "session secret"
,user: "sql username"
,password: "sql password"
,database: "sql database (if using elephant sql, usually same as username)"
,host: "sql database URL"
,port: local port you are running on
}

You can sign up for a free Auth0 account and follow the instructions for node server implementation
Auth0 settings:
Authorized Callback URL: http://localhost:3000/auth/callback
Allowed logout URLs:  http://localhost:3000/#!/, http://localhost:3000/

Database Setup:
To initialize your DB, you can run the sql script in the \server\db\initialize_db folder
