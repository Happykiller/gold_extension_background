import AjaxService from '../services/ajax/ajax.service';
import WorkerService from '../services/worker/worker.service';
import ChromeService from '../services/chrome/chrome.service';
import { OtherRepository } from '../repository/other.repository';
import { AjaxServiceReal } from '../services/ajax/ajax.service.real';
import { AjaxServiceFake } from '../services/ajax/ajax.service.fake';
import { WorkerServiceMock } from '../services/worker/worker.service.mock';
import { ChromeServiceReal } from '../services/chrome/chrome.service.real';
import { WorkerServiceChrome } from '../services/worker/worker.service.chrome';
import { ChromeServiceBrowser } from '../services/chrome/chrome.service.browser';

export class Inversify {

  ajaxService: AjaxService;
  workerService: WorkerService;
  chromeService: ChromeService;
  otherRepository: OtherRepository;

  constructor() {
    this.otherRepository = new OtherRepository();

    if (process.env.app_mode === 'real') {
      this.chromeService = new ChromeServiceReal(chrome);
      this.workerService = new WorkerServiceChrome(chrome);
      this.ajaxService = new AjaxServiceReal(this);
    } else if (process.env.app_mode === 'axios') {
      this.chromeService = new ChromeServiceBrowser();
      this.workerService = new WorkerServiceMock();
      this.ajaxService = new AjaxServiceReal(this);
    } else {
      this.chromeService = new ChromeServiceBrowser();
      this.workerService = new WorkerServiceMock();
      this.ajaxService = new AjaxServiceFake();
    }
    
  }
}

const inversify = new Inversify();

export default inversify;