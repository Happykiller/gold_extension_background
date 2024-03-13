import { OperationCategoryUsecaseModel } from '@usecase/models/operationCategory.usecase.model';

export interface GetOpeCategoriesUsecaseModel {
  message: string;
  data?: OperationCategoryUsecaseModel[],
  error?: string;
}