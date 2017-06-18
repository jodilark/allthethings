// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ....................  get a list of all state names from the database
exports.getStatesList = (req, res) => req.app.get('db').getStates().then((response) => res.send(response))

// ....................  get a list of all countries from the database
exports.getCountriesList = (req, res) => req.app.get('db').getCountries().then((response) => res.send(response))

// ....................  adds a new user to the database
exports.createNewUser = (req, res) => {
    // console.log(req.body)
    var userBody = [req.body.country_id, req.body.inactive, req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.address1, req.body.address2, req.body.city, req.body.state_id, req.body.zip, req.body.renter_rating]
    req.app.get('db').createUser(userBody).then((response) => res.status(200).send(`User has been created successfully`))
}

// ....................  gets a list of all users
exports.getAllUsers = (req, res) => req.app.get('db').getAllUsers().then((resp) => res.send(resp))

// ....................  gets a list of columns on the user table
exports.getUserColumns = (req, res) => req.app.get('db').getUserColumnList().then((resp) => res.send(resp))

// ....................  deletes all users
exports.deleteAllUsers = (req, res) => req.app.get('db').deleteAllTheUsers().then((resp) => res.send(`all users have been deleted ${resp}`))

// ....................  gets data for the manage user table
exports.getMUData = (req, res) => req.app.get('db').popManageUserTable().then((resp) => res.send(resp))

// ....................  updates a user
exports.updateUser = (req, res) => {
    var uId = [
        req.params.id
        , req.body.firstName
        , req.body.lastName
        , req.body.phone
        , req.body.email
        , req.body.address1
        , req.body.address2
        , req.body.city
        , req.body.state_id
        , req.body.country_id
        , req.body.zip
        , req.body.renter_rating
        , req.body.inactive
        , req.body.auth_id
    ]
    req.app.get('db').updateUserById(uId).then((resp) => res.send(`User ${req.params.id} was updated`))
}