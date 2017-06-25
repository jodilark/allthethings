//  »»»»»»»»»»»»»»»»»»»║   REQUIRE MODULES
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
const cors = require('cors')
const Auth0Strategy = require('passport-auth0')
const passport = require('passport')
const config = require('./.config')
const Quagga = require('quagga').default

//  »»»»»»»»»»»»»»»»»»»║   REQUIRE FILES
const userCtrl = require('./controllers/userCtrl')
const homeCtrl = require('./controllers/homeCtrl')
const settingsCtrl = require('./controllers/settingsCtrl')
const containerCtrl = require('./controllers/containerCtrl')
const locClassCtrl = require('./controllers/locClassCtrl')
const locationsCtrl = require('./controllers/locationsCtrl')
const trackByCtrl = require('./controllers/trackByCtrl')
const itemsCtrl = require('./controllers/itemsCtrl')


//  »»»»»»»»»»»»»»»»»»»║   OTHER VARIABLES
const port = 3000

//  »»»»»»»»»»»»»»»»»»»║   MIDDLEWARE
const app = express()
app.use(express.static('../public'))
app.use(bodyParser.json())
app.use(cors())


// .................... quagga
if(typeof document !== "undefined")
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

// .................... database
massive({
  host: config.host
  , port: 5432
  , database: config.database
  , user: config.user
  , password: config.password
}).then(function (db) {
  app.set('db', db),
    console.log('connected to allthethings database')
});

// .................... session setups
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: config.secret
}))

// .................... passport setups
app.use(passport.initialize())
app.use(passport.session())


// .................... make the strategy (still part of passport setups)
var strategy = new Auth0Strategy({
  domain: config.domain,
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: 'http://localhost:3000/auth/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
  // .................... check to see if user exists
  app.get('db').checkIfUserExists(profile.id).then((resp) => {
    let user = resp[0]
    if (!user) {
      user = profile
      user.isFirstTime = true
      // console.log("IF: ", user)
    }
    else {
      user.isFirstTime = false
      
    }
    // console.log("outside: ", Object.keys(user))
    return done(null, user);
  })
});

// check authentication COME BACK TO THIS
const authChecker = (req, res) => {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
}

// »»»»»»»»»»»»»»»»»»»║ INVOKE PASSPORT METHODS
// .................... pass in the strategy
passport.use(strategy);

// .................... serialize user data
passport.serializeUser(function (user, done) {
  // console.log(user)
  done(null, user);
});

// ...deserialize user data
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//  .................... authorization endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
  passport.authenticate('auth0', { successRedirect: '/#!/user_create_new', failureRedirect: '/login' }), (req, res) => {
    res.status(200).send(req.user)    
  })
app.get('/auth/me', function (req, res) {
  if (!req.user) return res.sendStatus(403);
  res.status(200).send(req.user);
})

// .................... logout
app.get('/auth/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.send('/');
})

//  »»»»»»»»»»»»»»»»»»»║ ENDPOINTS

//  .................... public landing page
app.get('/api/features', homeCtrl.getFeatureList)

//  .................... dashboard
// Gets for all the data ('analytics tbd', $changemeCtrl.)
app.get('/api/settings', settingsCtrl.getSettings)

//  .................... create/manage users
app.get('/api/states', userCtrl.getStatesList)
app.get('/api/country', userCtrl.getCountriesList)
app.get('/api/users', userCtrl.getAllUsers)
app.get('/api/users/custom', userCtrl.getMUData)
app.post('/api/users', userCtrl.createNewUser)
app.put('/api/users/:id', userCtrl.updateUser)


//  .................... create/manage items
app.get('/api/items', itemsCtrl.getAllItems)
app.get('/api/items/custom', itemsCtrl.getItemsCustomList)
app.post('/api/items', itemsCtrl.createItem)
app.put('/api/items/:id', itemsCtrl.updateItem)
// app.delete('/api/items:id', itemsCtrl.deleteItems)

//  .................... rental
// app.get('/api/rentals', $changemeCtrl.getAllRentals)
// app.post('/api/rentals', $changemeCtrl.createRental)
// app.put('/api/rentals/:id', $changemeCtrl.updateRental)
// app.delete('/api/rentals/:id', $changemeCtrl.deleteRental)

//  .................... trackbys
app.get('/api/trackbys', trackByCtrl.getTrackBy)
app.post('/api/trackbys', trackByCtrl.createTrackby)
app.put('/api/trackbys/:id', trackByCtrl.updateTrackby)
app.delete('/api/trackbys/:id', trackByCtrl.deleteTrackBy)

//  .................... containers
app.get('/api/containers', containerCtrl.getAllContainers)
app.post('/api/containers', containerCtrl.createContainer)
app.put('/api/containers/:id', containerCtrl.updateContainer)
app.delete('/api/containers/:id', containerCtrl.deleteContainer)

//  .................... location classifications
app.get('/api/loc_classes', locClassCtrl.getLocClass)
app.post('/api/loc_classes', locClassCtrl.createLocClass)
app.put('/api/loc_classes/:id', locClassCtrl.updateLocClass)
app.delete('/api/loc_classes/:id', locClassCtrl.deleteLocClass)

//  .................... locations
app.get('/api/locations', locationsCtrl.getLocationsList)
app.get('/api/locations/custom', locationsCtrl.getLocationsCustomList)
app.post('/api/locations', locationsCtrl.createLocation)
app.put('/api/locations/:id', locationsCtrl.updateLocation)
app.delete('/api/locations/:id', locationsCtrl.deleteLocation)

//  .................... settings
// app.get('/api/settings/default', $changemeCtrl.getDefaultSettings)
// app.put('/api/settings', $changemeCtrl.updateSettings)
app.get('/api/settings/default_location', settingsCtrl.getDefaultLocation)
// app.post('/api/settings/default_location', settingsCtrl.createDefaultLocation)
app.put('/api/settings/default_location', settingsCtrl.updateDefaultLocation)


//  »»»»»»»»»»»»»»»»»»»║   TESTS
app.listen(port, () => console.log(`listening on port ${port}`))