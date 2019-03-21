import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three-full';
import { ThreeObjectComponent } from '../three-object/three-object.component';

@Component({
  selector: 'app-mesh-json',
  templateUrl: './mesh-json.component.html',
  styleUrls: ['./mesh-json.component.scss'],
  providers: [{provide: ThreeObjectComponent, useExisting: MeshJSONComponent}]
})
export class MeshJSONComponent extends ThreeObjectComponent {
  @Input() jsonSource = './assets/mdl/platform/platform.json';

  constructor() {
    super();
  }

  createMesh(): THREE.Mesh {
    // const texture1 = new THREE.TextureLoader().load('./assets/wrld/textures/crate.jpg');
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const material = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
    // const geometry = new THREE.BoxBufferGeometry(200, 500, 200);

    // this.mesh = new THREE.Mesh(geometry, material);
    // return this.mesh;
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const placeholder = new THREE.Object3D();
    const loader = new THREE.ObjectLoader();
    loader.load(this.jsonSource, function(platform) {
      placeholder.add(platform);
    });
    // this.mesh = new THREE.Mesh(placeholder, material);
    this.mesh = placeholder;
    return this.mesh;
  }
}
