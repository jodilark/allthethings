// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// // ....................  get a list of all items from the database
exports.getAllItems = (req, res) => req.app.get('db').getAllitem().then((response) => res.send(response))

// // ....................  get a list of all items to populate lists
exports.getItemsCustomList = (req, res) => req.app.get('db').getItemList().then((response) => res.send(response))

// ....................  add a new item to the db
exports.createItem = (req, res) => {
    var dateAdded = new Date()
    let itemObj = [req.body.has_package, req.body.has_multiPiece, req.body.is_consumable, req.body.repOther, req.body.replink, req.body.owner_id, req.body.location_id, req.body.short_name, req.body.description, req.body.quantity, null, req.body.price, req.body.purchase_date, req.body.reason, req.body.retailer, req.body.warrenty, req.body.common, req.body.sentimental_rating, req.body.af_time, req.body.af_period, req.body.repItem, req.body.trackbys, req.body.upc, dateAdded, null, null, null]
    // console.log("got to the items ctrl", itemObj)
    req.app.get('db').createItems(itemObj).then((response) => res.send(`${req.body.short_name} was created`))
}

// // ....................  update specific item
exports.updateItem = (req, res) => {
    let itemObj = [req.body.date_added, req.body.description, req.body.frequency_period, req.body.frequency_qty, req.body.img, req.body.is_consumable, req.body.is_part, req.body.last_accessed, req.body.locationID, req.body.original_package, req.body.other_common_loc_json, req.body.parent_item_id, req.body.purchase_date, req.body.purchase_price, req.body.purchase_reason, req.body.purchase_retailer, req.body.qty, req.body.replace_radio_default, req.body.replacement_comment, req.body.replacement_link, req.body.resale_value, req.body.sentimental_rating, req.body.short_name, req.body.trackby_json, req.body.upc, req.body.userID, req.body.warrenty_period_in_days, req.params.id]
    req.app.get('db').updateItems(itemObj).then((response) => res.send(`${req.body.short_name} was updated`))
}

// // ....................  add a new item to the db
// exports.deleteitem = (req, res) => req.app.get('db').deleteitems(req.params.id).then((response) => res.send(`${req.body.loc_desc} was updated`))
