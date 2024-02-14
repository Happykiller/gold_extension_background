import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { CODES } from '../common/codes';
import { AuthUsecase } from './auth.usecase';
import { Inversify } from '../common/inversify';
import AjaxService from '../services/ajax/ajax.service';
import ChromeService from '../services/chrome/chrome.service';

describe('AuthUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockAjaxService: MockProxy<AjaxService> = mock<AjaxService>();
  const mockChromeService: MockProxy<ChromeService> = mock<ChromeService>();

  mockInversify.ajaxService = mockAjaxService;
  mockInversify.otherRepository = {
    sessionId: ''
  };
  mockInversify.chromeService = mockChromeService;

  const usecase: AuthUsecase = new AuthUsecase(mockInversify);

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get response of auth', async () => {
      // arrange
      mockAjaxService.post.mockResolvedValue({
        'session_id': '45645456'
      });
      // act
      const response = await usecase.execute({
        login: 'login',
        password: 'password'
      });
      // assert
      expect(response).toEqual({message: CODES.SUCCESS, sessionId: '45645456'});
    });

    it('should get response of auth', async () => {
      // arrange
      mockAjaxService.post.mockResolvedValue({});
      // act
      const response = await usecase.execute({
        login: 'login',
        password: 'password'
      });
      // assert
      expect(response).toEqual({message: CODES.FAIL_WRONG_CREDENTIAL});
    });

    it('should get response of auth', async () => {
      // arrange
      mockAjaxService.post.mockRejectedValue(new Error('error'));
      // act
      const response = await usecase.execute({
        login: 'login',
        password: 'password'
      });
      // assert
      expect(response).toEqual({message: CODES.FAIL_WRONG_CREDENTIAL, error: 'error'});
    });

  });
});