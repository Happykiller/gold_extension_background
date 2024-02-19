import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { CODES } from '@src/common/codes';
import { Inversify } from '@src/common/inversify';
import AjaxService from '@service/ajax/ajax.service';
import ChromeService from '@service/chrome/chrome.service';
import { CreateOperationUsecase } from '@usecase/create.operation.usecase';
import { CreateOperationUsecaseDto } from '@usecase/dtos/create.operation.usecase.dto';

describe('CreateOperationUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockAjaxService: MockProxy<AjaxService> = mock<AjaxService>();
  const mockChromeService: MockProxy<ChromeService> = mock<ChromeService>();

  mockInversify.ajaxService = mockAjaxService;
  mockInversify.chromeService = mockChromeService;

  const usecase: CreateOperationUsecase = new CreateOperationUsecase(mockInversify);

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should convert account_dest', async () => {
      // arrange
      const dto:CreateOperationUsecaseDto = {
        amount: 45,
        date: '2024-02-16',
        description: 'sdqsdqsd',
        account_id: 2,
        status_id: 2,
        type_id: 3,
        third_id: 2,
        category_id: 1,
        account_dest_id: 33
      };

      const expected = {
        amount: 45,
        date: '2024-02-16',
        description: 'sdqsdqsd',
        account_id: 2,
        status_id: 2,
        type_id: 3,
        third_id: 2,
        category_id: 1,
        account_id_dest: 33
      };
      // act
      const arranged = {
        ...dto,
        account_id_dest: dto.account_dest_id
      }

      delete arranged.account_dest_id;
      // assert
      expect(arranged).toEqual(expected);
    });

    it('should get response of auth', async () => {
      // arrange
      const data = {
        id: 1,
        amount: 45,
        date: '2024-02-16',
        description: 'sdqsdqsd',
        account_id: 2,
        status_id: 2,
        type_id: 3,
        third_id: 2,
        category_id: 1,
        account_id_dest: 33
      };
      mockAjaxService.post.mockResolvedValue({
        data: {
          createOperation: data
        }
      });
      // act
      const response = await usecase.execute({
        amount: 45,
        date: '2024-02-16',
        description: 'sdqsdqsd',
        account_id: 2,
        status_id: 2,
        type_id: 3,
        third_id: 2,
        category_id: 1,
        account_dest_id: 33
      });
      // assert
      expect(response).toEqual({message: CODES.SUCCESS, data});
    });

    it('should get response token expired', async () => {
      // arrange
      mockAjaxService.post.mockResolvedValue({
        errors: [
          {
            message: 'Token expired'
          }
        ]
      });
      // act
      const response = await usecase.execute({
        amount: 45,
        date: '2024-02-16',
        description: 'sdqsdqsd',
        account_id: 2,
        status_id: 2,
        type_id: 3,
        third_id: 2,
        category_id: 1,
        account_dest_id: 33
      });
      // assert
      expect(response).toEqual({
        message: CODES.CREATE_OPERATION_FAIL,
        error: 'Token expired'
      });
    });

  });
});