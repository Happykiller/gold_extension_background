import { CODES } from '@src/common/codes';
import { Inversify } from '@src/common/inversify';
import { OrderResultModel } from '@src/presentation/model/order.model';
import { CreateOperationUsecaseDto } from '@usecase/dtos/create.operation.usecase.dto';

export class CreateOperationUsecase {

  constructor(
    private inversify:Inversify
  ){}

  async execute(dto: CreateOperationUsecaseDto): Promise<OrderResultModel>  {
    try {
      const response:any = await this.inversify.ajaxService.post('graphql', 
        {
          operationName: 'createOperation',
          variables: dto,
          query: `mutation createOperation(
            $account_id: Int!
            $amount: Float!
            $date: String!
            $status_id: Int!
            $type_id: Int!
            $third_id: Int
            $category_id: Int
            $description: String
          ) {
            createOperation (
              dto: {
                account_id: $account_id
                amount: $amount
                date: $date
                status_id: $status_id
                type_id: $type_id
                third_id: $third_id
                category_id: $category_id
                description: $description
              }
            ) {
              id
              account_id
              account_id_dest
              amount
              date
              status_id
              type_id
              third_id
              category_id
              description
              creator_id
              creation_date
              modificator_id
              modification_date
            }
          }`
        }
      );

      if(response.errors) {
        throw new Error(response.errors[0].message);
      }

      return {
        message: CODES.SUCCESS,
        data: response.data.createOperation
      }
    } catch (e: any) {
      return {
        message: CODES.CREATE_OPERATION_FAIL,
        error: e.message
      }
    }
  }
}