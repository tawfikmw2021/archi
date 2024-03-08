
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import SceneInit from './SceneInit';
import * as THREE from 'three';


export function initControls(sceneInit:SceneInit) {
    //renderer = new THREE.WebGLRenderer( { antialias: true } );
    sceneInit.renderer.setPixelRatio( window.devicePixelRatio );
    sceneInit.renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( sceneInit.renderer.domElement );


    //scene = new THREE.Scene();
    let gridHelper = new THREE.GridHelper( 100, 100, 0x888888, 0x444444 )
    gridHelper.rotateOnAxis(new THREE.Vector3(1,0,0), 0.5*Math.PI)
    sceneInit.scene.add( gridHelper );

    //const ambientLight = new THREE.AmbientLight( 0xffffff );
    //sceneInit.scene.add( ambientLight );

    //const light = new THREE.DirectionalLight( 0xffffff, 4 );
    //light.position.set( 1, 1, 1 );
    //sceneInit.scene.add( light );

    const texture = new THREE.TextureLoader().load( 'textures/crate.gif', sceneInit.render );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = sceneInit.renderer.capabilities.getMaxAnisotropy();

    //orbit = new OrbitControls( sceneInit.camera, renderer.domElement );
    sceneInit.controls?.update();
    sceneInit.controls?.addEventListener( 'change', sceneInit.render );

    sceneInit.transformControls = new TransformControls( sceneInit.camera, sceneInit.renderer.domElement );
    sceneInit.transformControls.addEventListener( 'change', sceneInit.render );

    sceneInit.transformControls.addEventListener( 'dragging-changed', function ( event:any ) {

        sceneInit.controls.enabled = ! event.value;

    } );


    sceneInit.scene.add( sceneInit.transformControls );


    window.addEventListener( 'keydown', function ( event ) {

        switch ( event.keyCode ) {

            case 81: // Q
                sceneInit.transformControls.setSpace( sceneInit.transformControls.space === 'local' ? 'world' : 'local' );
                break;

            case 16: // Shift
            sceneInit.transformControls.setTranslationSnap( 100 );
            sceneInit.transformControls.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
            sceneInit.transformControls.setScaleSnap( 0.25 );
                break;

            case 87: // W
            console.log("ff")
            sceneInit.transformControls.object?.position.set(0,0,0)
            sceneInit.transformControls.setMode( 'translate' );
                break;

            case 69: // E
            sceneInit.transformControls.setMode( 'rotate' );
                break;

            case 82: // R
            sceneInit.transformControls.setMode( 'scale' );
                break;

            case 67: // C
                const position = sceneInit.camera.position.clone();

                sceneInit.camera = (sceneInit.camera as any).isPerspectiveCamera ? sceneInit.cameraOrtho : sceneInit.cameraPersp;
                sceneInit.camera.position.copy( position );

                sceneInit.controls.object = sceneInit.camera;
                sceneInit.transformControls.camera = sceneInit.camera;

                sceneInit.camera.lookAt( sceneInit.controls.target.x, sceneInit.controls.target.y, sceneInit.controls.target.z );
                sceneInit.onWindowResize();
                break;

            case 86: // V
                const randomFoV = Math.random() + 0.1;
                const randomZoom = Math.random() + 0.1;

                sceneInit.cameraPersp.fov = randomFoV * 160;
                sceneInit.cameraOrtho.bottom = - randomFoV * 500;
                sceneInit.cameraOrtho.top = randomFoV * 500;

                sceneInit.cameraPersp.zoom = randomZoom * 5;
                sceneInit.cameraOrtho.zoom = randomZoom * 5;
                sceneInit.onWindowResize();
                break;

            case 187:
            case 107: // +, =, num+
                sceneInit.transformControls.setSize( sceneInit.transformControls.size + 0.1 );
                break;

            case 189:
            case 109: // -, _, num-
            sceneInit.transformControls.setSize( Math.max( sceneInit.transformControls.size - 0.1, 0.1 ) );
                break;

            case 88: // X
            sceneInit.transformControls.showX = ! sceneInit.transformControls.showX;
                break;

            case 89: // Y
            sceneInit.transformControls.showY = ! sceneInit.transformControls.showY;
                break;

            case 90: // Z
            sceneInit.transformControls.showZ = ! sceneInit.transformControls.showZ;
                break;

            case 32: // Spacebar
            sceneInit.transformControls.enabled = ! sceneInit.transformControls.enabled;
                break;

            case 27: // Esc
            sceneInit.transformControls.reset();
                break;

        }

    } );

    window.addEventListener( 'keyup', function ( event ) {

        switch ( event.keyCode ) {

            case 16: // Shift
            sceneInit.transformControls.setTranslationSnap( null );
            sceneInit.transformControls.setRotationSnap( null );
            sceneInit.transformControls.setScaleSnap( null );
                break;

        }

    } );

}