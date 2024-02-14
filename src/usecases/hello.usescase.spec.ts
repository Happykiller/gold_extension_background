import { describe, expect, it } from '@jest/globals';

import { HelloUsecase } from './hello.usescase';

describe('GetSessionUsecase', () => {
  const usecase: HelloUsecase = new HelloUsecase();

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