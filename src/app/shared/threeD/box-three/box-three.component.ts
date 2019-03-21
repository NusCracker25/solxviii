import { Component, OnInit, Input, Output, Optional } from '@angular/core';
import * as THREE from 'three-full';
import { ThreeObjectComponent } from '../three-object/three-object.component';
import { UniverseComponent } from '../universe/universe.component';

@Component({
  selector: 'app-box-three',
  templateUrl: './box-three.component.html',
  styleUrls: ['./box-three.component.css'],
  providers: [{provide: ThreeObjectComponent, useExisting: BoxThreeComponent}]
})
export class BoxThreeComponent extends ThreeObjectComponent implements OnInit {

  constructor(@Optional() public universe: UniverseComponent) {
    super();
  }
ngOnInit() {
  console.log('initialization d une boxe dans l univers '+this.universe);
  this.createMesh();
}
  createMesh(): THREE.Mesh {
    console.log('invoke box mesh  boxy creation');
    const texture1 = new THREE.TextureLoader().load('./assets/wrld/textures/crate.jpg');
    // let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
    const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.px, this.py, this.pz);
    this.universe.scene.add(this.mesh);
    return this.mesh;
  }

}
