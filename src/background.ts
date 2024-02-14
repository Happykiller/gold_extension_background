import { ORDERS } from './common/orders';
import { Inversify } from './common/inversify';
import { AuthUsecase } from './usecases/auth.usecase';
import { HelloUsecase } from './usecases/hello.usescase';
import { GetSessionUsecase } from './usecases/getSession.usescase';
import { GetSystemInfosUsecase } from './usecases/getSystemInfos.usescase';

async function bootstrap() {

  const inversify = new Inversify();

  inversify.workerService.start([
    {
      name: ORDERS.GET_SEYSTEMINFOS,
      action: async () => {
        const getSystemInfosUsecase: GetSystemInfosUsecase = new GetSystemInfosUsecase();
        return await getSystemInfosUsecase.execute();
      }
    },
    {
      name: ORDERS.GET_SESSION,
      action: async () => {
        const getSessionUsecase: GetSessionUsecase = new GetSessionUsecase(inversify);
        return await getSessionUsecase.execute();
      }
    },
    {
      name: ORDERS.AUTH,
      action: async (data: any) => {
        const authUsecase: AuthUsecase = new AuthUsecase(inversify);
        return await authUsecase.execute(data);
      }
    },
    {
      name: ORDERS.HELLO,
      action: async (data: any) => {
        const helloUsecase: HelloUsecase = new HelloUsecase();
        return await helloUsecase.execute(data);
      }
    },
  ]);
}
bootstrap();