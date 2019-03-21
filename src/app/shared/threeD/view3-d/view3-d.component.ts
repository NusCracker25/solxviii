import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SessionManagerService } from '@core/services/session-manager.service';
import { MapConcept } from '@core/definition/map-concept';
import { MapHttpService } from '@core/services/map-http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view3-d',
  templateUrl: './view3-d.component.html',
  styleUrls: ['./view3-d.component.scss']
})
export class View3DComponent implements OnInit {

  maps: Observable<MapConcept[]>;

  constructor(
    private session: SessionManagerService,
    private maphttp: MapHttpService
  ) { }

  ngOnInit() {

      this.maps = this.maphttp.getMaps();

  }

  openAddMap() {
    const mapC = this.maphttp.putMap( new MapConcept(-1, 'tututtutu'));
    mapC.subscribe(
     (response: MapConcept) => {
       console.log('create a map ' + response.name);
     }
    );
  }

}
