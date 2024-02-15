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
    accessToken: ''
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
      const data = {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiZmFybyIsImlkIjoxLCJpYXQiOjE3MDc5MjAzOTIsImV4cCI6MTcwNzk0OTE5Mn0.UoayTTvKw7wo38tjnvAC9Omxv_2YMH8U-NGoT0257s4",
        id: 1,
        code: "faro",
        name_first: "Fabrice",
        name_last: "Rosito",
        description: "Admin",
        mail: "fabrice.rosito@gmail.com",
        creation: "1706429496000",
        modification: "1706429496000",
        language: "fr"
      };
      mockAjaxService.post.mockResolvedValue({
        data: {
          auth: data
        }
      });
      // act
      const response = await usecase.execute({
        login: 'login',
        password: 'password'
      });
      // assert
      expect(response).toEqual({message: CODES.SUCCESS, data});
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
      expect(response).toEqual({message: CODES.AUTH_FAIL_WRONG_CREDENTIAL});
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
      expect(response).toEqual({message: CODES.AUTH_FAIL_WRONG_CREDENTIAL, error: 'error'});
    });

  });
});