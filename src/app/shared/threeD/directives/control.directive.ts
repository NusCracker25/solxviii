import {
  Directive,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  Input
} from '@angular/core';
import {
  OrbitControls,
  PerspectiveCamera,
  FlyControl,
  PointerLockControls,
  MapControls,
  FirstPersonControls,
  EditorControls,
  DragControls
} from 'three-full';
@Directive({
  selector: '[appControl]'
})
export class ControlDirective implements AfterViewInit, OnInit {
  controls: any;
  private _camera: PerspectiveCamera = null;

  /**
   * control type allows for designer to select which control they want to enable
   *  0: OrbitControls (Default)
   *  1: Fly Control
   *  2: Pointer Lock
   *  3: Map Control
   *  4: FirstPerson Control
   */
  @Input() type = 'Orbit';

  /* description of 3D environment*/
  set camera(camera: PerspectiveCamera) {
    this._camera = camera;
    switch (this.type) {
      case 'Orbit': {
        this.controls = new OrbitControls(this._camera);
        // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 500000;
        this.controls.maxPolarAngle = Math.PI;
        break;
      }
      case 'Fly': {
        console.log('fly control');
        this.controls = new OrbitControls(this._camera);
        // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 500000;
        this.controls.maxPolarAngle = Math.PI;
      }
    }
  }

  constructor() {}

  ngOnInit() {
    this.controls = new OrbitControls(this._camera);
    // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 500000;
    this.controls.maxPolarAngle = Math.PI;
  }

  ngAfterViewInit() {
    this.controls = new OrbitControls(this._camera);
    // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 500000;
    this.controls.maxPolarAngle = Math.PI;
  }
}
