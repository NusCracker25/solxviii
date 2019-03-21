import {
  ViewChild,
  Input,
  AfterViewInit,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef } from '@angular/core';
import * as THREE from 'three-full';

@Directive({
  selector: '[appScene3D]'
})
export class Scene3DDirective implements AfterViewInit {

  constructor(
    // private templateRef: TemplateRef <any>,
    // private viewContainer : ViewContainerRef
    private canvasRef: ElementRef
  ) { }

  @Input() name: string;

/* description of 3D environment*/
private camera: THREE.PerspectiveCamera;

/* 3D interactive world */
private renderer: THREE.WebGLRenderer;
private scene: THREE.Scene;

/** screen definition */
private aspectRatio: number;
@Input()
public screenSize = 1.0;

/** dom element  */
private htmlDivCanvas: HTMLDivElement;

/* scene structure */
private cube: THREE.Mesh;


private get canvas(): HTMLDivElement {
  return this.canvasRef.nativeElement;
}

// @ViewChild('canvas', {read:ElementRef}) canvasRef: ElementRef;

/* CUBE PROPERTIES */

public rotationSpeedX = 0.005;


public rotationSpeedY = 0.00;


public size = 200;


public texture = '/assets/wrld/textures/crate.jpg';

@Input()
public sky = 'clouds';
// could be one of cloud, interstellar, moon, ocean, sand, sapce ,storm, sunset

/* STAGE PROPERTIES */

public cameraZ = 400;


public fieldOfView = 70;


public nearClippingPane = 1;


public farClippingPane = 100000;


/* STAGING, ANIMATION, AND RENDERING */

/**
 * Animate the cube
 */
private animateCube() {
  this.cube.rotation.x += this.rotationSpeedX;
  this.cube.rotation.y += this.rotationSpeedY;
}

/**
 * Create the cube
 */
private createCube() {
  const texture1 = new THREE.TextureLoader().load(this.texture);
  // let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
  const geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
  this.cube = new THREE.Mesh(geometry, material);
  // Add cube to scene
  this.scene.add(this.cube);
}

/**
 * create the sky box
 */
private setSkyBox() {
  this.scene.background = new THREE.CubeTextureLoader()
    .setPath('/assets/wrld/textures/sky/' + this.sky + '/')
    .load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ]);
}


/* create renderer for non css element */
private createRenderer() {
  this.scene = new THREE.Scene();
  // adding background
  this.setSkyBox();

  // definition of renderer settings
  this.renderer = new THREE.WebGLRenderer({
      // canvas: can,
      antialias: true,
      alpha: true
  });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setClearColor(0x000000, 1);
  this.renderer.setSize(window.innerWidth * this.screenSize, window.innerHeight * this.screenSize);

  // shadow
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // to antialias the shadow
  this.renderer.domElement.style.position = 'absolute'; // required
  // this.renderer.domElement.style.top = "40px";
  this.renderer.domElement.style.zIndex = '1'; // required
  this.htmlDivCanvas.appendChild(this.renderer.domElement);
  this.camera.position.z = this.cameraZ;
}


private getAspectRatio() {
   this.canvas.style.width = '100%';
   this.canvas.style.height = '100%';
   this.aspectRatio = (window.innerWidth * this.screenSize) / (window.innerHeight * this.screenSize);
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
  const component: Scene3DDirective = this;

  (function render(time) {

      requestAnimationFrame(render);
      component.animateCube();
      // renderer
      component.renderer.render(component.scene, component.camera);

  }());
}

private initializeScenes() {
  // set
  console.log(this.canvas);
  this.htmlDivCanvas = this.canvas;
  this.aspectRatio = (window.innerWidth * this.screenSize) / (window.innerHeight * this.screenSize);

  // for all scene/renderes
  this.createCamera();

  /////// webGl
  this.createRenderer();
  this.createCube();
  this.setSkyBox();
  this.renderer.render(this.scene, this.camera);

}

private createCamera() {
  this.camera = new THREE.PerspectiveCamera(
    this.fieldOfView,
    this.aspectRatio,
    this.nearClippingPane,
    this.farClippingPane
  );
  this.camera.position.set(-200, 200, 800);
}


//////////////////////////// / lifecycle hooks
  /* LIFECYCLE */

/**
 * We need to wait until template is bound to DOM, as we need the view
 * dimensions to create the scene. We could create the cube in a Init hook,
 * but we would be unable to add it to the scene until now.
 */
public ngAfterViewInit() {
  console.log('le canvas ' + this.canvas);
  console.log('name ' + this.name);
  // build scene
  this.initializeScenes();
  // then engage rendering loop with animation
  this.startRenderingLoop();
}


  /* EVENTS */

/**
 * Update scene after resizing.
 */
public onResize(event) {
  // this is forcing the definition of canvas to "really" fill the container (weirdly default height is taken into account only)
  this.camera.aspect = this.getAspectRatio();
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth * this.screenSize, window.innerHeight * this.screenSize);
  this.renderer.setPixelRatio(devicePixelRatio);
// this.render();
}

}
