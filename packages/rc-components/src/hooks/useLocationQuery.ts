

export function useLocationQuery<T = Record<string,any>>(){
    let search = window.location.search || "";
    search = decodeURIComponent(window.location.search);
    if (search.startsWith("?")) {
      search = search.substring(1);
    }
    const tempArr = search.split("&");

    const locationQuery =  tempArr.reduce<T>((memo,cur)=>{

        const itemArr = cur.split("=");
        memo[itemArr[0]] = itemArr[1]
        return memo;

    },{} as T)

    return {
        locationQuery
    }
    
}