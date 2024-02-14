import { Inversify } from '@src/common/inversify';
import { HelloUsecaseModel } from '@usecase/models/hello.usecase.model';

export class HelloUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(dto: any): Promise<HelloUsecaseModel>  {
    const localstore = await this.inversify.chromeService.getLocalStorage({
      name: 'gold-storage'
    });
    console.log('localstore', localstore);
    return {
      data: `hello ${dto.name} from the background!`
    };
  }
}