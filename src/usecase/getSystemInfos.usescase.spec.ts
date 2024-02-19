import { describe, expect, it } from '@jest/globals';

import { GetSystemInfosUsecase } from './getSystemInfos.usescase';

describe('GetSessionUsecase', () => {
  const usecase: GetSystemInfosUsecase = new GetSystemInfosUsecase();

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
      const response = await usecase.execute();
      // assert
      expect(response).toBeDefined();
    });

  });
});