import dayjs from 'dayjs'
export function dateFormatBase(text?: string | number, template = 'YYYY-MM-DD') {
    if (!text) {
      return '--';
    }
    
    if(typeof text === 'string'){
        text = Number(text)
    }
    return dayjs(text).format(template);
  }
  

export function dateFormat(date?: string | number){
    return dateFormatBase(date)
}

export function timeFormat(date?: string | number){
    return dateFormatBase(date,'YYYY-MM-DD HH:mm:ss')
}

