import { Component, OnInit, Input} from '@angular/core';
import * as THREE from 'three-full';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  /* description of 3D environment*/
  cameraO: THREE.PerspectiveCamera = null;

  get camera(): THREE.PerspectiveCamera {
    if (this.cameraO == null) {
      this.cameraO = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.cameraO.position.set(-200, 200, 800);
      }
    return this.cameraO;
  }
  @Input() cameraZ = 400;
  @Input() fieldOfView = 70;
  @Input() nearClippingPane = 1;
  @Input() farClippingPane = 100000;
  aspectRatio = 1;

  constructor() { }

  ngOnInit() {

  }

}
