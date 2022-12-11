import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const renderer = new Three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera( 
	75 /* fov*/ , 
	window.innerWidth / window.innerHeight /* aspect ratio */, 
	0.1 /* near */, 
	1000  /* far */
	);

	const orbit = new OrbitControls(camera, renderer.domElement);
	const axesHelper = new Three.AxesHelper( 3 ); /* 5 is the size of the axes*/
	scene.add( axesHelper );

	// camera.position.z = 6;
	// camera.position.y = 2;
	// camera.position.x = 2;
	camera.position.set( 0, 2, 6 );


	orbit.update();  //update the orbit controls everytime the camera moves

	const boxGeometry = new Three.BoxGeometry( 1, 1, 1 );
	const boxMaterial = new Three.MeshBasicMaterial( { color: 0x00ff00 } );
	const box = new Three.Mesh( boxGeometry, boxMaterial );
	scene.add( box );
	

	//box.rotation.x = 5;
	//box.rotation.y = 5;
	//box.rotation.z = 5;

	//Create a function for the animation 
	function animate(time) {
		box.rotation.x = time/1000; //time is in milliseconds
		box.rotation.y = time/1000; 
		renderer.render(scene, camera); // render 
	}
	
	renderer.setAnimationLoop( animate );






	
	//renderer.render(scene, camera); // render the scene

	
