import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { initControls } from './controls';

export default class SceneInit {
// NOTE: Core components to initialize Three.js app.
  public scene:THREE.Scene = undefined as any
  public renderer:THREE.WebGLRenderer = undefined as any
  aspect = window.innerWidth / window.innerHeight;

  cameraPersp = new THREE.PerspectiveCamera( 50, this.aspect, 0.01, 30000 );
  cameraOrtho = new THREE.OrthographicCamera( - 600 * this.aspect, 600 * this.aspect, 600, - 600, 0.01, 30000 );
  public camera:THREE.Camera = this.cameraPersp
  // NOTE: Camera params;
  public fov = 45
  public nearPlane = 1
  public farPlane = 1
  public canvasId:string=""

  // NOTE: Additional components.
  public clock?:THREE.Clock;
  public stats:Stats = undefined as any;
  public controls:OrbitControls=undefined as any;
  public transformControls:TransformControls=undefined as any;

  // NOTE: Lighting is basically required.
  public spotLight?:THREE.SpotLight;
  public ambientLight?:THREE.AmbientLight;

  constructor(canvasId:string) {
    this.canvasId = canvasId
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera.position.set( 0, 0, 50 );

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId) as any;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // spot light which is illuminating the chart directly
    /*this.spotLight = new THREE.SpotLight(0xffffff, 10);
    this.spotLight.castShadow = true;
    this.spotLight.position.set(0, 64, 32);
    this.scene.add(this.spotLight);*/

    const light = new THREE.SpotLight( 0xffffff, 4000 );
    light.position.set( 0, 0, 30 );
    this.scene.add( light );

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
    initControls(this)

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    //this.controls?.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer?.render(this.scene, this.camera);
  }

  onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    this.cameraPersp.aspect = aspect;
    this.cameraPersp.updateProjectionMatrix();

    this.cameraOrtho.left = this.cameraOrtho.bottom * aspect;
    this.cameraOrtho.right = this.cameraOrtho.top * aspect;
    this.cameraOrtho.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.render();
  }

}
