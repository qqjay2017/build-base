// base64 decode in browser
 
/**
 * base64解密
 * @param str base64字符串
 * @returns 
 */
export const base64Decode = (str: string) => {
    if(!str){
        return ''
    }
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

