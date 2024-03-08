import { reactive } from "vue";
import SceneInit from "./SceneInit";
import * as THREE from 'three';
import {GUI} from "dat.gui";




export const graphState = reactive({
    test : undefined as any as SceneInit,
    editModeMesh : true,
    gui : new GUI(),
    objectSelected:undefined as any as THREE.Object3D<THREE.Object3DEventMap>,
    objectSelectedChange(obj:THREE.Object3D<THREE.Object3DEventMap>){
      this.objectSelected = obj
      this.test.transformControls.attach(obj)
      addMeshGui(obj)
    },

    addObj(){
      if(this.objectSelected.type != "Group")
      return 
      if(this.editModeMesh)
        addBox(this.objectSelected)
      else
      addGroup(this.objectSelected)

      console.log("childs", this.objectSelected.children)

    }
    
})

function init(){
  console.log("initialisation")
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();
    graphState.test = test
    const axesHelper = new THREE.AxesHelper(100);
    test.scene.add(axesHelper);
    var boxMesh = addGroup(test.scene)
    var b1 = addBox(boxMesh)
    var b2 = addBox(boxMesh)
    var b3 = addGroup(boxMesh)
    b2.position.set( 0, 0, -0.6 );
    test.transformControls.attach(boxMesh)
    addMeshGui(b1)
}


init()
export function addGroup(grp:THREE.Object3D<THREE.Object3DEventMap>){
    const group = new THREE.Group();
    grp.add(group);
    return group
  }

function addBox(grp:THREE.Object3D<THREE.Object3DEventMap>){
    const boxGeometry = new THREE.BoxGeometry(24, 2, 0.5);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial as any);
    grp.add(boxMesh);
    return boxMesh
  }

function addMeshGui(boxMesh:THREE.Object3D<THREE.Object3DEventMap>){
    //gui.destroy()
    //gui = new GUI();
    if(graphState.gui) graphState.gui.destroy()
    graphState.gui = new GUI()
    const geometryFolder = graphState.gui.addFolder('Mesh Geometry');
    geometryFolder.open();
    const positionFolder = geometryFolder.addFolder('Position');
  
    positionFolder.add(boxMesh.position, 'x', -50, 50).name('Position X Axis').onChange(v=> boxMesh.position.x = v);
    positionFolder.add(boxMesh.position, 'y', -50, 50).name('Position Y Axis').onChange(v=> boxMesh.position.y = v);
    positionFolder.add(boxMesh.position, 'z', -2, 10).name('Position Z Axis').onChange(v=> boxMesh.position.z = v);
    positionFolder.open();
  
    const rotationFolder = geometryFolder.addFolder('Rotation');
    rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    rotationFolder.open();
    
    const scaleFolder = geometryFolder.addFolder('Scale');
    scaleFolder.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
    scaleFolder.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleFolder.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');
    scaleFolder.open();
}