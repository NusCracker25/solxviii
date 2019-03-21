import { ThreeStaticMdl } from './three-static-mdl';
import { Input } from '@angular/core';
import * as THREE from 'three-full';
import { ThreeMdl } from './three-mdl';

export class ThreeStaticElement implements ThreeStaticMdl, ThreeMdl {

  @Input() data;

  @Input() px = 0;
  @Input() py = 0;
  @Input() pz = 0;

  @Input() name = 'truc';
  @Input() uid = -1;

  mesh: THREE.Mesh;

  createMesh(): THREE.Mesh {
    // console.log('invoke ThreeStaticElement createMesh');
    return null;
  }
}
