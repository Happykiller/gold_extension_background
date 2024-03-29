import { CODES } from '@src/common/codes';
import { Inversify } from '@src/common/inversify';
import { AuthUsecaseModel } from '@usecase/models/auth.usecase.model';

export class GetSessionInfoUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(): Promise<AuthUsecaseModel>  {
    try {
      const response:any = await this.inversify.ajaxService.post('graphql', 
        {
          operationName: 'getSessionInfo',
          query: `query getSessionInfo {
            getSessionInfo {
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
        value: response.data.getSessionInfo.accessToken
      });

      return {
        message: CODES.SUCCESS,
        data: response.data.getSessionInfo
      }
    } catch (e: any) {
      return {
        message: CODES.GET_SESSION_INFO_FAIL,
        error: e.message
      }
    }
  }
}