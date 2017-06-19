// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ....................  get a list of all location classifications from the database
exports.getLocClass = (req, res) => req.app.get('db').getLocClasses().then((response) => res.status(200).send(response))


// ....................  get a list of all location classifications from the database
exports.createLocClass = (req, res) => {
    let name = req.body.name
    let description = req.body.description
    req.app.get('db').createLocClass(name, description).then((response) => res.status(200).send(`${name, description} was created`))
}

// ....................  update a single location classification
exports.updateLocClass = (req, res) => {
    let cId = req.params.id
    let name = req.body.name
    let description = req.body.description
    req.app.get('db').updateClass(cId, name, description).then((response) => res.status(200).send(`location classification ${cId} was updated`))
}

// ....................  delete a single location classification from the database
exports.deleteLocClass = (req, res) => {
    let cId = req.params.id
    req.app.get('db').deleteClass(cId).then((response) => res.status(200).send(`location classification ${cId} was deleted`))
}
