// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ....................  get a list of all containers from the database
exports.getAllContainers = (req, res) => req.app.get('db').getContainers().then((response) => res.status(200).send(response))


// ....................  get a list of all containers from the database
exports.createContainer = (req, res) => {
    let name = req.body.name
    req.app.get('db').createContainers(name).then((response) => res.status(200).send(`${name} was created`))
}

// ....................  update a single container
exports.updateContainer = (req, res) => {
    let cId = req.params.id
    let name = req.body.name
    req.app.get('db').updateContainers(cId, name).then((response) => res.status(200).send(`Container ${cId} was updated`))
}

// ....................  delete a single container from the database
exports.deleteContainer = (req, res) => {
    let cId = req.params.id
    req.app.get('db').deleteContainers(cId).then((response) => res.status(200).send(`Container ${cId} was deleted`))
}
