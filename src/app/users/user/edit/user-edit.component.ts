import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User3, Zone } from '../../shared/zone';
import { ZoneService } from '../../shared/zone.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  zones: FirebaseListObservable<Zone[]> = null; //  list of objects

  @Input() user: User3;

  constructor(private zoneSrv: ZoneService) {
    this.zones = this.zoneSrv.getZonesList();
 }

  ngOnInit() {
  }

  updateActive(value: string) {
    this.zoneSrv.updateZone(this.user.$key, { zone: value });
    this.zoneSrv.updateZonesUser(this.user.$key, { zone: value });
  }
}
