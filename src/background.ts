import { ORDERS } from '@src/common/orders';
import { Inversify } from '@src/common/inversify';
import { AuthUsecase } from '@usecase/auth.usecase';
import { HelloUsecase } from '@usecase/hello.usescase';
import { OrderResultModel } from '@presentation/model/order.model';
import { GetSessionInfoUsecase } from '@usecase/getSessionInfo.usecase';
import { GetSystemInfosUsecase } from '@usecase/getSystemInfos.usescase';
import { CreateOperationUsecase } from '@usecase/create.operation.usecase';
import { CreateOperationUsecaseDto } from '@usecase/dtos/create.operation.usecase.dto';

async function bootstrap() {

  const inversify = new Inversify();

  inversify.workerService.start([
    {
      name: ORDERS.GET_SEYSTEMINFOS,
      action: async ():Promise<OrderResultModel> => {
        const getSystemInfosUsecase: GetSystemInfosUsecase = new GetSystemInfosUsecase();
        return await getSystemInfosUsecase.execute();
      }
    },
    {
      name: ORDERS.AUTH,
      action: async (data: any):Promise<OrderResultModel> => {
        const authUsecase: AuthUsecase = new AuthUsecase(inversify);
        return await authUsecase.execute(data);
      }
    },
    {
      name: ORDERS.GET_SESSION_INFO,
      action: async ():Promise<OrderResultModel> => {
        const getSessionInfo: GetSessionInfoUsecase = new GetSessionInfoUsecase(inversify);
        return await getSessionInfo.execute();
      }
    },
    {
      name: ORDERS.HELLO,
      action: async (data: any):Promise<OrderResultModel> => {
        const helloUsecase: HelloUsecase = new HelloUsecase(inversify);
        return await helloUsecase.execute(data);
      }
    },
    {
      name: ORDERS.CREATE_OPERATION,
      action: async (data: CreateOperationUsecaseDto):Promise<OrderResultModel> => {
        const createOperationUsecase: CreateOperationUsecase = new CreateOperationUsecase(inversify);
        return await createOperationUsecase.execute(data);
      }
    },
  ]);
}
bootstrap();