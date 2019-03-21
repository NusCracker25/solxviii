import { Component, OnInit, Input } from '@angular/core';
import { ThreeObjectComponent } from '../three-object/three-object.component';
import * as THREE from 'three-full';

@Component({
  selector: 'app-mesh-stl',
  templateUrl: './mesh-stl.component.html',
  styleUrls: ['./mesh-stl.component.scss'],
  providers: [{provide: ThreeObjectComponent, useExisting: MeshSTLComponent}]
})
export class MeshSTLComponent extends ThreeObjectComponent {

    @Input() file = './assets/mdl/soline/test.stl';

  constructor() {
    super();
  }

  createMesh(): THREE.Mesh {
    const placeholder = new THREE.Object3D();
    const loader = new THREE.STLLoader();

    loader.load( this.file , function ( geometry ) {
        const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, - 0.25, 0.6 );
        mesh.rotation.set( 0, - Math.PI / 2, 0 );
        mesh.scale.set( 1, 1, 1 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        placeholder.add(mesh);
      } );
      this.mesh = placeholder;
      return this.mesh;
  }

}


