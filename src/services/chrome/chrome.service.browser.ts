import ChromeService from './chrome.service';

export class ChromeServiceBrowser extends ChromeService {
  setCookie(dto: any) {
    window.document.cookie = dto.name + '=' + dto.value;
  }
  
  getCookie(dto: any): Promise<string> {
    const value = `; ${document.cookie}`;
    let response = '';
    const parts:any = value.split(`; ${dto.name}=`);
    if (parts.length === 2) {
      response = parts.pop().split(';').shift();
    }
    return Promise.resolve(response);
  }
}
