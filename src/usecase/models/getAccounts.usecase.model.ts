import { AccountUsecaseModel } from '@usecase/models/account.usecase.model';

export interface GetAccountsUsecaseModel {
  message: string;
  data?: AccountUsecaseModel[],
  error?: string;
}