import inversify, { Inversify } from '@src/common/inversify';
import { config } from '../../config';

export class WorkerServiceMock {

  constructor(
    private inversify:Inversify
  ){
    config.ext = {
      id: '007'
    };
  }

  async start(binding: Array<any>) {
    const search = window.location.search.slice(1);
  
    /**
     * Order
     */
    const orderString = search.split('&')[0];
    const order = orderString.split('=')[0];
    let params = null;
    if (orderString.split('=').length > 1) {
      params = decodeURIComponent( orderString.split('=')[1] );
      params = JSON.parse(params);
    }

    /**
     * AccessToken
     */
    try {
      const accessTokenString = search.split('&')[1];
      const accessToken = accessTokenString.split('=')[1];
      this.inversify.otherRepository.accessToken = accessToken;
    } catch(e) {
      console.log('Error with access token');
    }
  
    const elt = window.document.getElementById("app") || {
      innerHTML: null
    };

    if (params) {
      const command = binding.find(command => command.name === order);
  
      const response = await command.action(params);
      elt.innerHTML = JSON.stringify(response, undefined, 2);
    } else {
      elt.innerHTML = JSON.stringify(`Missing order like ?hello={"name":"fabrice"}`, undefined, 2);
    }
  }
} 