import { config } from '@src/config';
import { Inversify } from '@src/common/inversify';

export class AjaxServiceReal {

  constructor(
    private inversify:Inversify
  ){}

  async post(url:string, datas: any): Promise<any> {
    const response = await fetch(config.server?.url + url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datas)
    });

    return response.json();
  }

  async get(url:string, datas: any): Promise<any> {

    let createQueryString = (data:any) => {
      return Object.keys(data).map(key => {
        let val = data[key]
        if (val !== null && typeof val === 'object') val = createQueryString(val)
        return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
      }).join('&')
    }

    const response = await fetch(config.server?.url + url + '?'  + createQueryString(datas), {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    });

    return response.json();
  }
} 