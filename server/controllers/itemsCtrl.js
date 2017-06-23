// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// // ....................  get a list of all items from the database
// exports.getitemsList = (req, res) => req.app.get('db').getAllitems().then((response) => res.send(response))

// // ....................  get a list of all items to populate lists
// exports.getitemsCustomList = (req, res) => req.app.get('db').getCustomitems().then((response) => res.send(response))

// ....................  add a new item to the db
exports.createItem = (req, res) => {
    var dateAdded = new Date()
    var itemObj = [req.body.has_package, req.body.has_multiPiece, req.body.is_consumable, req.body.repOther, req.body.replink, req.body.owner_id, req.body.location_id, req.body.short_name, req.body.description, req.body.quantity, null, req.body.price, req.body.purchase_date, req.body.reason, req.body.retailer, req.body.warrenty, req.body.common, req.body.sentimental_rating, req.body.af_time, req.body.af_period, req.body.repItem, req.body.trackbys, req.body.upc, dateAdded, null, null, null]
    // console.log("got to the items ctrl", itemObj)
    req.app.get('db').createItems(itemObj).then((response) => res.send(`${req.body.short_name} was created`))
}

// // ....................  update specific item
// exports.updateitem = (req, res) => {
//     let itemObj = [req.params.id, req.body.loc_desc , req.body.parent_item_id, req.body.x_coordinate, req.body.y_coordinate, req.body.z_coordinate]
//     req.app.get('db').updateitems(itemObj).then((response) => res.send(`${req.body.loc_desc} was updated`))
// }

// // ....................  add a new item to the db
// exports.deleteitem = (req, res) => req.app.get('db').deleteitems(req.params.id).then((response) => res.send(`${req.body.loc_desc} was updated`))
