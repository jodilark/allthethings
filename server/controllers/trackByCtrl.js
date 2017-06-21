// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ....................  get a list of all trackbys from the database
exports.getTrackBy = (req, res) => req.app.get('db').getTrackBys().then((response) => res.status(200).send(response))


// ....................  get a list of all trackbys from the database
exports.createTrackby = (req, res) => {
    let trackbyObj = [req.body.trackby_name, req.body.trackby_value, req.body.trackby_category]
    req.app.get('db').createTrackBys(trackbyObj).then((response) => res.status(200).send(`${req.body.trackby_name} was created`))
}

// ....................  update a single trackby
exports.updateTrackby = (req, res) => {
    let trackbyObj = [req.params.id, req.body.trackby_name, req.body.trackby_value, req.body.trackby_category]
    req.app.get('db').updateTrackBys(trackbyObj).then((response) => res.status(200).send(`${req.body.trackby_name} was updated`))
}

// ....................  delete a single trackby from the database
exports.deleteTrackBy = (req, res) => {
    let cId = req.params.id
    req.app.get('db').deleteTrackBys(cId).then((response) => res.status(200).send(`trackby ${cId} was deleted`))
}