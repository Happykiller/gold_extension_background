import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { HelloUsecase } from '@usecase/hello.usescase';
import { Inversify } from '@src/common/inversify';

describe('GetSessionUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();

  const usecase: HelloUsecase = new HelloUsecase(mockInversify);

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get the session id', async () => {
      // arrange
      // act
      const response = await usecase.execute({
        name: 'Fabrice'
      });
      // assert
      expect(response).toEqual({data: 'hello Fabrice from the background!'});
    });

  });
});