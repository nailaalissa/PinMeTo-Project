const express = require('express');
// const { getTokens, getLocations } = require('./apiController/fetchApi.js');
const router = express.Router();
const controller = require('./apiController/controller.js');
// to get Mapbox Key
router.get('/mapApi', async (req, res) => {
  try {
    const mapApi = process.env.MAPBOX_API_TOKEN;
    //console.log(mapApi);
    res.json({ mapboxApiToken: mapApi }); // Return the token as an object
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// fetch info for AccountId from PinMeTo API
router.get('/api', controller.getLocations);
// router.get('/api?companyName', controller.getLocations);
//fetch Store By Id  from PinMeTo API
router.get('/api-Store/:storeId', controller.getStore);

module.exports = router;
