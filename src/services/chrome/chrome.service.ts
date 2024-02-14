export default abstract class ChromeService {
  abstract setCookie(dto: any): void;
  abstract getCookie(dto: any): Promise<string>;
}