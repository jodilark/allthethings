// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ....................  get a list of all locations from the database
exports.getLocationsList = (req, res) => req.app.get('db').getAllLocations().then((response) => res.send(response))

// ....................  get a list of all locations to populate lists
exports.getLocationsCustomList = (req, res) => req.app.get('db').getCustomLocations().then((response) => res.send(response))

// ....................  add a new location to the db
exports.createLocation = (req, res) => {
    let locationObj = [
        req.body.loc_class_id
        , req.body.description
        , req.body.container_id
        , req.body.x_coordinate
        , req.body.y_coordinate
        , req.body.z_coordinate
        , req.body.parent_location_id
        , null
    ]
    req.app.get('db').createLocation(locationObj).then((response) => res.send(`${req.body.description} was created`))
}