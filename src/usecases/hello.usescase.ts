import { Inversify } from '@src/common/inversify';
import { HelloUsecaseModel } from '@usecase/models/hello.usecase.model';

export class HelloUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(dto: any): Promise<HelloUsecaseModel>  {
    return {
      data: `hello ${dto.name} from the background!`
    };
  }
}