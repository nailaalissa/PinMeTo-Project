const { getTokens, getLocations } = require('./fetchApi');

exports.getStore = async (req, res) => {
  const storeId = req.params.storeId;
  const companyName = req.query.companyName;
  const appId = process.env[`PINMETO_APP_ID_${companyName}`];
  const appSecret = process.env[`PINMETO_APP_SECRET_${companyName}`];
  const accountId = process.env[`PINMETO_ACCOUNT_ID_${companyName}`];
  const locationsUrl = `https://api.test.pinmeto.com/v2/${accountId}/locations/${storeId}`;
  const url = process.env.PINMETO_API_URL;

  try {
    const accessToken = await getTokens(url, appId, appSecret);
    const storeInfo = await getLocations(locationsUrl, accessToken);
    res.status(200).json(storeInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLocations = async (req, res) => {
  const companyName = req.query.companyName;
  const appId = process.env[`PINMETO_APP_ID_${companyName}`];
  const appSecret = process.env[`PINMETO_APP_SECRET_${companyName}`];
  const accountId = process.env[`PINMETO_ACCOUNT_ID_${companyName}`];
  const locationsUrl = `https://api.test.pinmeto.com/v2/${accountId}/locations`;
  const url = process.env.PINMETO_API_URL;

  try {
    const accessToken = await getTokens(url, appId, appSecret);
    const locations = await getLocations(locationsUrl, accessToken);
    const directions = locations.map((location) => ({
      name: location.name,
      coordinates: [location.location.lat, location.location.lon],
      address: location.address,
      storeId: location.storeId,
    }));
    res.status(200).json(directions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
