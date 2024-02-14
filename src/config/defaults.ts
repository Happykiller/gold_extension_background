import { Configuration } from '@src/config/configuration';

const defaults: Configuration = {
  mode: process.env.app_mode??'prod',
  server: {
    url: 'http://localhost/graphql'
  }
};

export { defaults };
