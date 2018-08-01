import { Component, OnInit } from '@angular/core';
import { ConfigsService } from './shared/config.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Configuration } from './shared/configuration';

@Component({
  selector: 'configs',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Configurations</h1>
        </div>
        <config-form class="col-xs-6 col-sm-3"></config-form>
    </div>
    <div class="row">
        <div *ngFor="let config of configs | async">
            <config-detail [config]='config'></config-detail>
        </div>
    </div>
  `
})
export class ConfigsComponent implements OnInit {
  configs: FirebaseListObservable<Configuration[]>;

  constructor(private configSvc: ConfigsService) {}

  ngOnInit() {
    this.configs = this.configSvc.getItemsList();
    // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
