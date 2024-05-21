exports.getTokens = async (url, appId, appSecret) => {
  const authentication = Buffer.from(`${appId}:${appSecret}`).toString('base64');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authentication}`,
    },
    body: 'grant_type=client_credentials',
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const responseData = await response.json();
    //console.log(responseData.access_token);
    return responseData.access_token;
  } catch (error) {
    throw error;
  }
};

exports.getLocations = async (url, accessToken) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
};
