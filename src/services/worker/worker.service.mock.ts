import { config } from '../../config';

export class WorkerServiceMock {

  constructor(){
    config.ext = {
      id: '007'
    };
  }

  async start(binding: Array<any>) {
    const search = window.location.search.slice(1);
    const order = search.split('=')[0];
    let params = null;
    if (search.split('=').length > 1) {
      params = decodeURIComponent( search.split('=')[1] );
      params = JSON.parse(params);
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