export function getCompanyId(){
   const userInfoObj = JSON.parse(sessionStorage.getItem('USER_INFO')||'{}')
    
   return userInfoObj.defaultCompId

}