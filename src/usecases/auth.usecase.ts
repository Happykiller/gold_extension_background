import { CODES } from '../common/codes';
import { Inversify } from '../common/inversify';
import { AuthUsecaseDto } from './dtos/auth.usecase.dto';

export class AuthUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(dto: AuthUsecaseDto): Promise<any>  {
    try {
      const response:any = await this.inversify.ajaxService.post('auth/login', {
        login: dto.login,
        password: dto.password
      });

      if (response['session_id']) {
        this.inversify.otherRepository.sessionId = response['session_id'];
        this.inversify.chromeService.setCookie({
          name: 'PHPSESSID',
          value: response['session_id']
        });

        return {
          message: CODES.SUCCESS,
          sessionId: response['session_id']
        }
      };

      return {
        message: CODES.FAIL_WRONG_CREDENTIAL,
      }
    } catch (e: any) {
      return {
        message: CODES.FAIL_WRONG_CREDENTIAL,
        error: e.message
      }
    }
  }
}