import { CODES } from '@src/common/codes';
import { Inversify } from '@src/common/inversify';
import { GetOpeCategoriesUsecaseModel } from '@usecase/models/getOpeCategories.usecase.model';
import { OperationCategoryUsecaseModel } from '@usecase/models/operationCategory.usecase.model';

export class GetOpeCategoriesUsecase {

  constructor(
    private inversify:Inversify
  ){}

  categories:OperationCategoryUsecaseModel[] = [];

  async execute(): Promise<GetOpeCategoriesUsecaseModel>  {
    try {
      if (this.categories.length === 0) {
        const response:any = await this.inversify.ajaxService.post('graphql', 
          {
            operationName: 'operationCategories',
            variables: {},
            query: `query operationCategories {  
              operationCategories {
                id
                label
              }
            }`
          }
        );

        if(response.errors) {
          throw new Error(response.errors[0].message);
        }

        this.categories = response.data.operationCategories.sort((elt1:OperationCategoryUsecaseModel, elt2:OperationCategoryUsecaseModel) => elt1.label.localeCompare(elt2.label));
      }

      return {
        message: CODES.SUCCESS,
        data: this.categories
      }
    } catch (e: any) {
      return {
        message: CODES.FAIL,
        error: e.message
      }
    }
  }
}