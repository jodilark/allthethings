// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ...............  get a list of the settings from the database
exports.getSettings = (req, res) => {req.app.get('db').getSettings().then((response) => {res.status(200).send(response)})}

// ...............  get default location from settings in the database
exports.getDefaultLocation = (req, res) => req.app.get('db').getDefaultLocations().then((response) => {res.status(200).send(response)})

// ...............  update default location
exports.updateDefaultLocation = (req, res) => {
    let id = req.body.d_location_id
    req.app.get('db').updateDefaultLoc(id).then((response) => {res.status(200).send(`Default location with id of ${id} was updated successfully`)})
}
