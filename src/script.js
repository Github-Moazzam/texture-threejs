import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { max, step } from "three/webgpu";

import { Pane } from "tweakpane";
const pane = new Pane();
// Canvas
const canvas = document.querySelector("canvas.webgl");

//init texture loader
const textureLoader = new THREE.TextureLoader();







// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};



// Scene
const scene = new THREE.Scene();

const grassTexture = textureLoader.load('/texture/badlands-boulders-bl/badlands-boulders_albedo.png')

grassTexture.repeat.set(2,2);
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping

  pane.addBinding(grassTexture, 'offset',{
    x:{
      min:-1,
      max:1,
      step:0.001

    },
    y:{
      min:-1,
      max:1,
      step:0.001

    }
  })


//geometry
const geometry = new THREE.BoxGeometry(1,1,1);
const torosKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,200,200)
const planeGeometry = new THREE.PlaneGeometry(1,1)

//Material
const material = new THREE.MeshBasicMaterial();
  // material.color = new THREE.Color('green')

  material.map = grassTexture 



  const group = new THREE.Group();
  scene.add(group)






// Create Mesh
const box1Mesh = new THREE.Mesh(geometry,material);

box1Mesh.position.x = 1.5;
const box2Mesh = new THREE.Mesh(torosKnotGeometry,material);

box2Mesh.position.x = -1.5;
const box3Mesh = new THREE.Mesh(geometry,material);

const plane = new THREE.Mesh(planeGeometry,material)
plane.rotation.x = -(Math.PI * 0.5)
plane.scale.set(100,100)

// group.add(box1Mesh,box2Mesh,box3Mesh)
group.add(plane)





//lighting
const light = new THREE.AmbientLight(0xffffff,0.4); 
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff,1.2);
pointLight.position.set(-5,5,5);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 10;
camera.position.y = 5;

scene.add(camera);

//Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});



//renderer set size
renderer.setSize(sizes.width, sizes.height);

//Resizing feature
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Clock
const clock = new THREE.Clock();
let previousTime = 0;

//Render Loop
const tick = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

// box1Mesh.rotation.y += delta * 1

 
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
