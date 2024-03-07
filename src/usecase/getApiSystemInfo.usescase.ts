import { CODES } from '@src/common/codes';
import { Inversify } from '@src/common/inversify';
import { OrderResultModel } from '@presentation/model/order.model';

export class GetApiSystemInfoUsecase {

  constructor(
    private inversify:Inversify
  ){}
  
  async execute(): Promise<OrderResultModel>  {
    try {
      const response:any = await this.inversify.ajaxService.post('graphql', 
        {
          operationName: 'systemInfo',
          query: `query systemInfo {  
            systemInfo {
              version
            }
          }`
        }
      );

      if(response.errors) {
        throw new Error(response.errors[0].message);
      }

      return {
        message: CODES.SUCCESS,
        data: response.data.systemInfo
      }
    } catch (e: any) {
      return {
        message: CODES.FAIL,
        error: e.message
      }
    }
  }
}