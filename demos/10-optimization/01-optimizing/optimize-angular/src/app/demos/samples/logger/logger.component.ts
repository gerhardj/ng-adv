import { Component, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AILoggerService } from 'src/app/shared/logging/ailogger.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent {
  ngxLogger = inject(NGXLogger);
  appInsights = inject(AILoggerService);

  logNgx() {
    this.ngxLogger.debug('Entering LoggerComponent');
    this.ngxLogger.info('Multiple', 'Argument', 'Support');
    this.ngxLogger.error('Error', 'Error Details');
  }

  logAppInsights() {
    this.appInsights.logEvent('LoggerComponent', { name: 'LoggerComponent' });
  }
}
