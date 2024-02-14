import { CODES } from '../common/codes';
import { Inversify } from '../common/inversify';

export class GetSessionUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(): Promise<any>  {
    try {
      const response:any = await this.inversify.chromeService.getCookie({
        name: 'PHPSESSID'
      });

      if (response && response.value) {
        this.inversify.otherRepository.sessionId = response.value;
      }

      // For test sessionId
      await this.inversify.ajaxService.get('system/session', {});

      return {
        message: CODES.SUCCESS,
        sessionId: this.inversify.otherRepository.sessionId
      }
    } catch (e: any) {
      this.inversify.otherRepository.sessionId = '';
      return {
        message: CODES.FAIL,
        sessionId: ''
      }
    }
  }
}