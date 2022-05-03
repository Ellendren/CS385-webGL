import * as THREE from 'three';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import OuterRing from './ds9/OuterRing';
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

  const outer_ring = new OuterRing();

  scene.add(stars.points);
  scene.add(outer_ring.mesh);

  const render = () => {

    renderer.render(scene, camera);
  };

  controls.addEventListener( 'change', () => {
    requestAnimationFrame(render);
  })

  requestAnimationFrame(render);
}

main();