import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { CODES } from '../common/codes';
import { Inversify } from '../common/inversify';
import { GetSessionUsecase } from './getSession.usescase';
import { OtherRepository } from '../repository/other.repository';

describe('GetSessionUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockOtherRepository: MockProxy<OtherRepository> = mock<OtherRepository>();
  mockInversify.otherRepository = mockOtherRepository;

  const usecase: GetSessionUsecase = new GetSessionUsecase(mockInversify);

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get the session id', async () => {
      // arrange
      mockOtherRepository.sessionId = '45645456';
      // act
      const response = await usecase.execute();
      // assert
      expect(response).toEqual({message: CODES.SUCCESS, sessionId: '45645456'});
    });

  });
});