import * as THREE from 'three';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import Stars from './envirment/stars';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = canvas.clientWidth/canvas.clientHeight; 
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const controls = new ArcballControls(camera, renderer.domElement, scene);
  controls.setGizmosVisible(false);

  const stars = new Stars(2000, far);

  scene.add(stars.points);

  const render = () => {

    renderer.render(scene, camera);
  };

  controls.addEventListener( 'change', () => {
    requestAnimationFrame(render);
  })

  requestAnimationFrame(render);
}

main();