import packageInfo from '../../package.json';

export class GetSystemInfosUsecase {
  async execute(): Promise<string>  {
    return packageInfo.version;
  }
}