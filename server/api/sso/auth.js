export default defineEventHandler(async (event) => {

  const body = getQuery(event)





  setCookie(event, 'tsso_accessToken', body.accessToken ? body.accessToken : '' , {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  setCookie(event, 'tsso_refreshToken', body.refreshToken ? body.refreshToken : ''   , {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  setCookie(event, 'tsso_sesssion_id', body.id ? body.id : '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  setCookie(event, 'tsso_expiryDate', body.expiryDate ? body.expiryDate : '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  return await sendRedirect(event,body.next ? body.next :"/")

});
