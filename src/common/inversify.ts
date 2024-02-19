import { config } from '@src/config';
import AjaxService from '@service/ajax/ajax.service';
import WorkerService from '@service/worker/worker.service';
import ChromeService from '@service/chrome/chrome.service';
import { OtherRepository } from '@repository/other.repository';
import { AjaxServiceReal } from '@service/ajax/ajax.service.real';
import { AjaxServiceFake } from '@service/ajax/ajax.service.fake';
import { WorkerServiceMock } from '@service/worker/worker.service.mock';
import { ChromeServiceReal } from '@service/chrome/chrome.service.real';
import { WorkerServiceChrome } from '@service/worker/worker.service.chrome';
import { ChromeServiceBrowser } from '@service/chrome/chrome.service.browser';

export class Inversify {
  ajaxService: AjaxService;
  workerService: WorkerService;
  chromeService: ChromeService;
  otherRepository: OtherRepository;

  constructor() {
    this.otherRepository = new OtherRepository();
    
    if (config.mode === 'real') {
      this.chromeService = new ChromeServiceReal(chrome);
      this.workerService = new WorkerServiceChrome(chrome);
      this.ajaxService = new AjaxServiceReal(this);
    } else if (config.mode === 'axios') {
      this.chromeService = new ChromeServiceBrowser();
      this.workerService = new WorkerServiceMock(this);
      this.ajaxService = new AjaxServiceReal(this);
    } else {
      this.chromeService = new ChromeServiceBrowser();
      this.workerService = new WorkerServiceMock(this);
      this.ajaxService = new AjaxServiceFake();
    }
    
  }
}

const inversify = new Inversify();

export default inversify;