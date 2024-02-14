export default abstract class ChromeService {
  abstract setCookie(dto: any): void;
  abstract getCookie(dto: any): Promise<string>;
  abstract setLocalStorage(dto: any): Promise<void>;
  abstract getLocalStorage(dto: any): Promise<any>;
}