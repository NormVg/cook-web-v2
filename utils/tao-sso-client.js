// const ssoCookieData = {
//   session_id: tsso_sesssion_id.value,
//   expiryDate: tsso_expiryDate.value,
//   accessToken: tsso_accessToken.value,
//   refreshToken: tsso_refreshToken.value,
// };

const onVisitSSO = async (
  cookieData,
  taoAuthToken,
  taoAuthUrl,
  taoAuthCallback
) => {};

const isToken = async (cookieData) => {
  const requiredFields = ['session_id', 'expiryDate', 'accessToken', 'refreshToken'];

  return requiredFields.every(
    (key) => cookieData?.[key] !== undefined && cookieData[key] !== '' && cookieData[key] !== null
  );
};



const isTokenValid = async (cookieData,taoAuthUrl, taoAuthToken,appOrigin) => {
  const isValidUrl = `${taoAuthUrl}/api/v2/sso/is-valid?app=${appOrigin}&taoAuthToken=${taoAuthToken}&refreshToken=${cookieData.refreshToken}&accessToken=${cookieData.accessToken}&session_id=${cookieData.session_id}`;

  try {
    const response = await fetch(isValidUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      return false;
    }



    const data = await response.json();

    // console.log(data);


    if (data.status === 404){
      return undefined
    }

    return data.data[0].isValid

  } catch (error) {
    return false;
  }

};


const refreshTokenSSO =  async (cookieData,taoAuthUrl, taoAuthToken,appOrigin) => {
    const refreshUrl = `${taoAuthUrl}/api/v2/sso/refresh?app=${appOrigin}&taoAuthToken=${taoAuthToken}&refreshToken=${cookieData.refreshToken}&accessToken=${cookieData.accessToken}&session_id=${cookieData.session_id}`;

  try {
    const response = await fetch(refreshUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();

    if (data.data.length === 0){
      return false
    }




    return data.data[0];


  } catch (error) {
    console.error(error);
    return false;
  }
}


const getLoginSSO = async (taoAuthToken, taoAuthUrl, taoAuthCallback,appOrigin) => {

  return `${taoAuthUrl}/api/v2/sso/generate?app=${appOrigin}&taoAuthToken=${taoAuthToken}&next=${appOrigin}/${taoAuthCallback}`;

};

const parseUrlSSO = async (current_url) => {

  const url = new URL(current_url);

  const params = Object.fromEntries(url.searchParams.entries());

  const ssoCookieData = {
    session_id: params.id,
    expiryDate: params.expiryDate,
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
  };
  return ssoCookieData;
}

export { onVisitSSO, isToken, isTokenValid, getLoginSSO , parseUrlSSO , refreshTokenSSO };
