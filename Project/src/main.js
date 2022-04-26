import * as THREE from 'three';
import Stars from './envirment/stars';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = canvas.clientWidth/canvas.clientHeight; 
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const stars = new Stars(500, far);

  scene.add(stars.points);

  const render = () => {
      renderer.render(scene, camera);
  };

  requestAnimationFrame(render);
}

main();