import { CODES } from '@src/common/codes';
import packageInfo from '../../package.json';
import { OrderResultModel } from '@presentation/model/order.model';

export class GetSystemInfosUsecase {
  async execute(): Promise<OrderResultModel>  {
    return {
      message: CODES.SUCCESS,
      data: packageInfo.version
    };
  }
}