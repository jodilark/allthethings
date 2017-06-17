// ===============  DATABASE REQUESTS
// ...............  get a list of the settings from the database
exports.getSettings = (req, res) => {req.app.get('db').getSettings().then((response) => {res.status(200).send(response)})}
