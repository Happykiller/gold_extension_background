import { ChromeServiceGetCookieDto, ChromeServiceGetCookieModel, ChromeServiceGetLocalStorageDto, ChromeServiceSetCookieDto, ChromeServiceSetLocalStorageDto } from "./chrome.service.real";

export default abstract class ChromeService {
  abstract setCookie(dto: ChromeServiceSetCookieDto): void;
  abstract getCookie(dto: ChromeServiceGetCookieDto): Promise<ChromeServiceGetCookieModel>;
  abstract setLocalStorage(dto: ChromeServiceSetLocalStorageDto): Promise<void>;
  abstract getLocalStorage(dto: ChromeServiceGetLocalStorageDto): Promise<any>;
}