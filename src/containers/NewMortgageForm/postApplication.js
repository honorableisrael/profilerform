import { useCallback, useEffect } from "react";
import http from "../../config/axios.config";
import cookies from "../../utils/cookies";


const postApplication = async (payload, appRef) => {
  const refKey = 'app_ref';
  const refInCookie = cookies.get(refKey);
  if (appRef) payload.app_ref = appRef;
  if (!appRef && refInCookie) payload.app_ref = refInCookie;
  if (!payload.email) payload.email = cookies.get('email');
  const url = `/mortgage/application-info`;
  const { data: { data: { application: serverResponse } } } = await http.post(url, payload);
  const { app_ref } = serverResponse;
  if (!appRef && app_ref && !refInCookie) cookies.set(refKey, app_ref, { path: window.location.pathname });
  return serverResponse;
}

export default postApplication