import { Type } from '@angular/core';
import * as THREE from 'three-full';

export class ThreeItem {
  constructor(public component: Type<any>, public data: any) {}
  mesh: THREE.Mesh;
}
