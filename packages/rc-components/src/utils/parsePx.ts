export function parsePx(value?:string|number|null){
    if(value===undefined||value===null||value===''){
        return undefined
    }
    if(typeof value ==='number'){
        return value+'px'
    }else {
        return value
    }
}