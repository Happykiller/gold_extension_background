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
              access_token
              id
              code
              name_first
              name_last
              description
              mail
              role
            }
          }`
        }
      );

      if(response.errors) {
        throw new Error(response.errors[0].message);
      }

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