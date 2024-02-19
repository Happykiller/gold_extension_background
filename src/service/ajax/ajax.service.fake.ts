export class AjaxServiceFake {
  post(url:string, datas: any): Promise<any> {
    if (url === 'auth/login') {
      return Promise.resolve({
        data: {
          session_id: '3c5c6d0f50df637397bc250c42ce8314'
        }
      });
    } else if (url === 'getItems') {
      return Promise.resolve({
        data: [
          {
            id: 1,
            name: 'login',
            description: 'description',
            login: 'login',
            password: 'iuCpS#kStBDo6SmZcz=e4_dj',
            address: 'http:\/\/localhost:3000\/caca\/?login=qsdqs\u0026password=dqsdqsd',
            category: 'Autre'
          }
        ]
      });
    }
    throw new Error('Method not implemented.');
  }
  
  get(url:string, datas: any): Promise<any> {
    if (url === 'hello') {
      return Promise.resolve('hello');
    }
    throw new Error('Method not implemented.');
  }
} 