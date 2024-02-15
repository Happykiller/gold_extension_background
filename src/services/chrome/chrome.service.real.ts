import ChromeService from './chrome.service';

export interface ChromeServiceSetCookieDto {
  url: string
  name: string
  value: string
}

export interface ChromeServiceGetCookieDto {
  url: string
  name: string
}

export interface ChromeServiceSetLocalStorageDto {
  name: string
  value: string
}

export interface ChromeServiceGetLocalStorageDto {
  name: string
}

export interface ChromeServiceGetCookieModel {
  domain: string
  hostOnly: boolean
  httpOnly: boolean
  name: string
  path: string
  sameSite: string
  secure: boolean
  session: boolean
  storeId: string
  value: string
}

export class ChromeServiceReal extends ChromeService {

  constructor(
    private chrome:any
  ){
    super();
  }

  setCookie(dto: ChromeServiceSetCookieDto) {
    this.chrome.cookies.set(dto);
  }

  private chromeRuntimeGetCookie = (dto: ChromeServiceGetCookieDto): Promise<ChromeServiceGetCookieModel> => {
    return new Promise ((resolve, reject) => {
      try {
        this.chrome.cookies.get(dto, resolve);
      } catch (e) {
        reject(e);
      }
    })
  }
  
  getCookie(dto: ChromeServiceGetCookieDto): Promise<ChromeServiceGetCookieModel> {
    return this.chromeRuntimeGetCookie(dto);
  }

  setLocalStorage(dto: ChromeServiceSetLocalStorageDto) {
    const data = {
      [dto.name]: dto.value
    };
    chrome.storage.local.set(data);
    return Promise.resolve();
  }
  
  async getLocalStorage(dto: ChromeServiceGetLocalStorageDto): Promise<any> {
    return chrome.storage.local.get([dto.name]);
  }
}
