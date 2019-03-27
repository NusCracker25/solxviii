import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  ContentChildren,
  ContentChild,
  QueryList,
  AfterContentInit,
  OnChanges,
  DoCheck,
  AfterContentChecked
} from '@angular/core';
import * as THREE from 'three-full';
import { ControlDirective } from '../directives/control.directive';
import { ThreeObjectComponent } from '../three-object/three-object.component';
import { BoxThreeComponent } from '../box-three/box-three.component';
import { NgControlStatus } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})
export class UniverseComponent implements OnInit , AfterViewInit {
  //////////////// REFERENCES TO HTML Native Elements
  private get canvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('cvsView')
  private canvasRef: ElementRef;

   /**
   * control type allows for designer to select which control they want to enable
   *  0: OrbitControls (Default)
   *  1: Fly Control
   *  2: Pointer Lock
   *  3: Map Control
   *  4: FirstPerson Control
   */
  @Input() control = 'Orbit';
  private controls: any;

  /** dom element  */
  private htmlDivCanvas: HTMLDivElement;

  /* description of 3D environment*/
  private camera: THREE.PerspectiveCamera;
  public cameraZ = 400;
  public fieldOfView = 70;
  public nearClippingPane = 1;
  public farClippingPane = 100000;

  /** screen definition */
  private aspectRatio: number;
  @Input()
  public screenSize = 1.0;

  /* 3D interactive world */
  private renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  @ContentChildren(ThreeObjectComponent) boxes: QueryList<ThreeObjectComponent>;

  /* environment texture */
  @Input()
  public sky = 'clouds';

  constructor() {}

  //////////////// Initialization
  ngOnInit() {
   // this.getAspectRatio();
   console.log('on Init');
   console.log('contenu de la scene: ' + JSON.stringify(this.boxes));
  }

  public ngAfterViewInit() {
    // console.log(' ngOnInit/Universe contenu: ' + this.boxes.length);
    // build scene
    this.initializeScenes();
    // then engage rendering loop with animation
    this.startRenderingLoop();
  }


  private initializeScenes() {
    // set
    this.htmlDivCanvas = this.canvas;
    // this.aspectRatio =
    //   (window.innerWidth * this.screenSize) /
    //   (window.innerHeight * this.screenSize);
    this.getAspectRatio();

    // for all scene/renderes
    this.createCamera();

    /////// webGl
    this.createRenderer();
    this.setSkyBox();
    // add boxes
    // console.log('contenu de la scene: ' + JSON.stringify(this.boxes));
    this.boxes.forEach(box => {
      const mesh = box.createMesh();
      console.log('creation de ' + box.name);
      this.scene.add(mesh);
      mesh.position.set(box.px, box.py, box.pz);
    });

    this.renderer.render(this.scene, this.camera);
    this.setControl(this.control);
  }

  private createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    // this.camera.position.set(-200, 200, 800);
    this.camera.position.set( 100, 0, 20);
  }

  /* create renderer for non css element */
  private createRenderer() {
    this.scene = new THREE.Scene();
    // adding background
    // this.setSkyBox();

    // definition of renderer settings
    this.renderer = new THREE.WebGLRenderer({
      // canvas: this.htmlDivCanvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    // this.renderer.setSize(
    //   window.innerWidth * this.screenSize,
    //   window.innerHeight * this.screenSize
    // );
    this.renderer.setSize(
      this.htmlDivCanvas.clientWidth * this.screenSize,
      this.htmlDivCanvas.clientHeight * this.screenSize
    );
    // shadow
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // to antialias the shadow
    this.renderer.domElement.style.position = 'absolute'; // required
    // this.renderer.domElement.style.top = "40px";
    this.renderer.domElement.style.zIndex = '1'; // required
    this.htmlDivCanvas.appendChild(this.renderer.domElement);
    this.camera.position.z = this.cameraZ;
  }

public setControl(control: string) {
  // this.controls.camera = this.camera;
  if (control == null && control === undefined) {
    this.control = 'orbit';
  } else {
    this.control = control;
  }

  switch (this.control) {
    case 'orbit': {
      this.controls = new THREE.OrbitControls(this.camera);
      // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 500000;
      this.controls.maxPolarAngle = Math.PI;
      break;
    }
    case 'fly': {
      console.log('fly control');
      this.controls = new THREE.FlyControls( this.camera );
      this.controls.movementSpeed = 1000;
      this.controls.domElement = this.renderer.domElement;
      this.controls.rollSpeed = Math.PI / 24;
      this.controls.autoForward = false;
      this.controls.dragToLook = true;
      break;
    }
    case 'map': {
      console.log('map control');
      this.controls = new THREE.MapControls( this.camera , this.renderer.domElement );
      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 100;
      this.controls.maxDistance = 500;
      this.controls.maxPolarAngle = Math.PI / 2;
      break;
    }
    case 'pointer': {
      console.log('pointer control');
      this.controls = new THREE.FlyControls( this.camera );
      this.controls.movementSpeed = 1000;
      this.controls.domElement = this.renderer.domElement;
      this.controls.rollSpeed = Math.PI / 24;
      this.controls.autoForward = false;
      this.controls.dragToLook = false;
      break;
    }
    case 'fps': {
      console.log('fps');
      this.controls = new THREE.FlyControls( this.camera );
      this.controls.movementSpeed = 1000;
      this.controls.domElement = this.renderer.domElement;
      this.controls.rollSpeed = Math.PI / 24;
      this.controls.autoForward = false;
      this.controls.dragToLook = false;
      break;
    }
    default :
      console.log('on ne sait pas quoi faire alors on pose un orbit control');
      this.controls = new THREE.OrbitControls(this.camera);
      // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
      this.controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 500000;
      this.controls.maxPolarAngle = Math.PI;
      break;
  }

  }


  /**
   * create the sky box
   */
  private setSkyBox() {
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath('/assets/wrld/textures/sky/' + this.sky + '/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
  }

  private getAspectRatio() {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.aspectRatio =
    (this.htmlDivCanvas.clientWidth * this.screenSize) /
    (this.htmlDivCanvas.clientHeight * this.screenSize);

    return this.aspectRatio;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template

    this.renderer.setPixelRatio(devicePixelRatio);
    // this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // this.cssRenderer.setPixelRatio(devicePixelRatio);
    // this.cssRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.camera.aspect = this.getAspectRatio();
    const component: UniverseComponent = this;
    let currentTime = 0;
    const controls_ = this.controls;
    (function render(time) {
      requestAnimationFrame(render);
      const dt = time - currentTime;
      currentTime = time;
      controls_.update(dt);
      // component.animateCube();
      // renderer
      component.renderer.render(component.scene, component.camera);

    })();
  }

  /* EVENTS */
  /**
   * Update view after resizing.
   */
  public onResize(event) {
    // this is forcing the definition of canvas to "really" fill the container (weirdly default height is taken into account only)
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.htmlDivCanvas.clientWidth * this.screenSize,
      this.htmlDivCanvas.clientHeight * this.screenSize
    );
    console.log('dimension canvas: h:  ' + this.htmlDivCanvas.clientHeight + ' px;   w:  ' + this.htmlDivCanvas.clientWidth + 'px');
    this.renderer.setPixelRatio(devicePixelRatio);
    // this.render();
  }
}
