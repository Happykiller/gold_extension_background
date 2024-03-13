import { OperationThridUsecaseModel } from "@usecase/models/operationThrid.usecase.model";

export interface GetThirdsUsecaseModel {
  message: string;
  data?: OperationThridUsecaseModel[],
  error?: string;
}