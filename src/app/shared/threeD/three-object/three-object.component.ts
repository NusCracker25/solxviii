import { Component, OnInit } from '@angular/core';
import { ThreeStaticElement } from '../definition/three-static-element';
import * as THREE from 'three-full';

@Component({
  selector: 'app-three-object',
  templateUrl: './three-object.component.html',
  styleUrls: ['./three-object.component.scss']
})
export class ThreeObjectComponent extends ThreeStaticElement implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

  createMesh(): THREE.Mesh {
    console.log('invoke object mesh creation');
    return null;
  }
}
