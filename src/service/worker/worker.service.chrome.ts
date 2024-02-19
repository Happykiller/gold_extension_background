import { config } from '../../config';

export class WorkerServiceChrome {

  constructor(
    private chrome:any
  ){
    config.ext = {
      id: chrome.runtime.id
    };
  }

  start(binding: Array<any>) {
    this.chrome.runtime.onMessage.addListener((msg:any, sender:any, sendResponse:any) => {
      (async function () {
        if (config.ext?.id === sender.id) {

          const bind = binding.find(element => {
            return element.name === msg.data.order.name
          });

          if (bind) {
            const response:any = await bind.action(msg.data.order.data);
            sendResponse(response);
          } else {
            sendResponse(null);
          }
        }
      })();
    
      // return true to indicate you want to send a response asynchronously
      return true;
    });
  }
} 