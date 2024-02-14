import ChromeService from './chrome.service';

export class ChromeServiceReal extends ChromeService {

  constructor(
    private chrome:any
  ){
    super();
  }

  setCookie(dto: any) {
    this.chrome.cookies.set({ url: "https://kalydian.xefi.fr/", name: dto.name, value: dto.value });
  }

  private chromeRuntimeGetCookie = (dto: any): Promise<string> => {
    return new Promise ((resolve, reject) => {
      try {
        this.chrome.cookies.get(dto, resolve);
      } catch (e) {
        reject(e);
      }
    })
  }
  
  getCookie(dto: any): Promise<string> {
    return this.chromeRuntimeGetCookie({url: "https://kalydian.xefi.fr/", name: dto.name});
  }
}
