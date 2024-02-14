import { HelloUsecaseModel } from './models/hello.usecase.model';

export class HelloUsecase {

  async execute(dto: any): Promise<HelloUsecaseModel>  {
    return {
      data: `hello ${dto.name} from the background!`
    };
  }
}