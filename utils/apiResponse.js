const apiResponse = (status,data, msg) => {

  return {
    "status":status,
    "data": data,
    "msg": msg,
  };

}


export {apiResponse};
