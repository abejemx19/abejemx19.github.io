import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as dat from 'dat.gui';


const renderer = new Three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera( 
	45 /* fov*/ , 
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
	camera.position.set( -10, 30, 30);


	orbit.update();  //update the orbit controls everytime the camera moves

	const boxGeometry = new Three.BoxGeometry( 1, 1, 1 );
	const boxMaterial = new Three.MeshBasicMaterial( { color: 0x00ff00 } );
	const box = new Three.Mesh( boxGeometry, boxMaterial );
	scene.add( box );
	



    const planeGeometry = new Three.PlaneGeometry(30, 30);
    const planeMaterial = new Three.MeshBasicMaterial( 
        {color:  0xffffff,
        side: Three.DoubleSide } );
    const plane = new Three.Mesh( planeGeometry, planeMaterial );
    scene.add();
    plane.rotation.x = -0.5 * Math.PI;



    const gridHelper = new Three.GridHelper(30);
    scene.add( gridHelper );



//add a sphere
    const sphereGeometry = new Three.SphereGeometry(4, 100, 100);
    // const sphereMaterial = new Three.MeshBasicMaterial
    // ( {color: 0x0000ff
    // ,wireframe: true} );

    const sphereMaterial = new Three.MeshBasicMaterial //MeshLambertMaterial //MeshStandardMaterial
    ( {color: 0x0000ff
    ,wireframe: false} ); //This will be black because we have not added any light

    const sphere = new Three.Mesh( sphereGeometry, sphereMaterial );
    scene.add( sphere );

    //sphere.position.x = -10;
    //set sphere position
    sphere.position.set( -10, 10, 0);


//Use package dat.gui to create a Control Panel for color selection

    const gui = new dat.GUI(); 
    const options = {
        sphereColor: '#ffea00'
//runs fine without next line, but allows us to show the mesh in wifeframe mode
        ,wireframe: false, 
        speed: 0.01

    };

    gui.add(options, 'wireframe').onChange( function(e) { 
        //sphereMaterial.wireframe = e;  } );
        sphere.material.wireframe = e;  } ); //This will show the mesh in wireframe mode



    gui.add(options, 'speed', 0, 0.1);
        
        
    gui.addColor(options, 'sphereColor').onChange(function(e){
        //sphereMaterial.color.set(e);
        sphere.material.color.set(e);
    });



//Allow the ball to bounce
let step = 0;
//let speed = 0.01;



//Create a slider to control the speed of the bouncing ball
   


    // window.addEventListener('resize', onWindowResize, false)
    // function onWindowResize() {
    //     camera.aspect = window.innerWidth / window.innerHeight
    //     camera.updateProjectionMatrix()
    //     renderer.setSize(window.innerWidth, window.innerHeight)
    //     render()
    // }
    
    // const stats = Stats()
    // document.body.appendChild(stats.dom)

    // const cubeFolder = gui.addFolder('Cube')
    // cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
    // cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
    // cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
    // cubeFolder.open()
    // const cameraFolder = gui.addFolder('Camera')
    // cameraFolder.add(camera.position, 'z', 0, 10)
    // cameraFolder.open()

	//Create a function for the animation 
	function animate(time) {
		box.rotation.x = time/1000; //time is in milliseconds
		box.rotation.y = time/1000; 

        //Slider to control bouncing speed inside animate function
        step+= options.speed;
         
        sphere.position.y = 10 * Math.abs(Math.sin(step));


		renderer.render(scene, camera); // render 
	}
	
	renderer.setAnimationLoop( animate );






	
	//renderer.render(scene, camera); // render the scene

	
