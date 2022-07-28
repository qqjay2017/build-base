/**
 * 字符串base加密
 * @param input
 * @returns
 */

export function base64Encode(str: string): string {
  if(!str){
    return ''
}
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}


