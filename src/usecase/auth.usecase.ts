import { CODES } from '../common/codes';
import { Inversify } from '../common/inversify';
import { AuthUsecaseDto } from './dtos/auth.usecase.dto';
import { AuthUsecaseModel } from './models/auth.usecase.model';

export class AuthUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(dto: AuthUsecaseDto): Promise<AuthUsecaseModel>  {
    try {
      const response:any = await this.inversify.ajaxService.post('graphql', 
        {
          operationName: 'auth',
          variables: dto,
          query: `query auth($login: String!, $password: String!) {
            auth (
              dto: {
                login: $login
                password: $password
              }
            ) {
              accessToken
              id
              code
              name_first
              name_last
              description
              mail
              creation
              modification
              language
            }
          }`
        }
      );

      if(response.errors) {
        throw new Error(response.errors[0].message);
      }

      this.inversify.chromeService.setCookie({
        url: 'https://api.gold.happykiller.net/',
        name: 'accessToken',
        value: response.data.auth.accessToken
      });

      return {
        message: CODES.SUCCESS,
        data: response.data.auth
      }
    } catch (e: any) {
      return {
        message: CODES.AUTH_FAIL_WRONG_CREDENTIAL,
        error: e.message
      }
    }
  }
}