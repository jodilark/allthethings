// ===============  DATABASE REQUESTS
// ...............  get a list of all features from the database
exports.getFeatureList = (req, res) => {req.app.get('db').getFeatures().then((response) => {res.status(200).send(response)})}
