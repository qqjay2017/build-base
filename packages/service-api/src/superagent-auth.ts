import request from "superagent";
import { IDependHeader } from "./request";

export interface ISuperagentAuthProps {
    headers ? :IDependHeader,
}
export function superagentAuth({
    headers={}
}={}){

    return (baseReq:request.SuperAgentRequest)=>{
        const ACCESS_TOKEN = sessionStorage.getItem("ACCESS_TOKEN");
        const defaultHeaders = {
          fp: localStorage.getItem("fp") || "1",
          ct: localStorage.getItem("ct") || "1",
          Authorization: "Bearer " + ACCESS_TOKEN,
          pt: sessionStorage.getItem("pt") || "1",
          ...(headers || {}),
        };


        Reflect.ownKeys(defaultHeaders).forEach((k: any) => {
            let _k: string = k as unknown as string;
            const val: string = (defaultHeaders as any)[_k];
            val && baseReq.set(_k, val);
          });
    }
}

export function resNewToken(res:any){
    if (res && res.header && res.header["access_token"]) {
        const access_token = res.header["access_token"];
        const data = JSON.parse(decodeURIComponent(access_token));

        sessionStorage.setItem("ACCESS_TOKEN", data.access_token);
        sessionStorage.setItem("USER_INFO", JSON.stringify(data.user_info));
        sessionStorage.setItem("USER_NAME", data.user_info.name);
        sessionStorage.setItem("EXPIRES_IN", data.expires_in);
        sessionStorage.setItem("REFRESH_TOKEN", data.refresh_token);
        sessionStorage.setItem("sessionId", data.refresh_token);
        localStorage.setItem(
          "storeSessionData",
          JSON.stringify({
            userInfo: data.user_info,
            token: data.access_token,
          })
        );
      }
}