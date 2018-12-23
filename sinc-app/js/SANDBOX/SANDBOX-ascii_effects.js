
var camera, scene, renderer, effect;
// var sphere, plane;
let lighting, spheres;
var start = Date.now();

let blockM01 = document.getElementById("block-m01");

let skip = 5;
let skipCount = 0;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	camera.position.y = -250;

	scene = new THREE.Scene();

	lighting = new THREE.Group();
	scene.add(lighting);

	var light = new THREE.PointLight( 0xffffff, 3 );
	light.position.set( 500, 0, 500 );
	lighting.add( light );

	var light2 = new THREE.PointLight( 0xffffff, 0.5 );
	light2.position.set( - 250, 10, - 250 );
	lighting.add( light2 );

	spheres = new THREE.Group();
	scene.add(spheres);

	let sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true }) );
	let sphere2 = new THREE.Mesh( new THREE.SphereBufferGeometry( 40, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true }) );
	let sphere3 = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true }) );
	sphere2.position.x = 500;
	sphere3.position.x = -250;
	sphere3.position.z = 350;
	spheres.add(sphere, sphere2, sphere3);
	
	
	// plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
	// plane.position.y = - 200;
	// plane.rotation.x = - Math.PI / 2;
	// scene.add( plane );

	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(blockM01.clientWidth, blockM01.clientHeight);
	camera.aspect = blockM01.clientWidth / blockM01.clientHeight;
	camera.updateProjectionMatrix();

	effect = new THREE.AsciiEffect(
		renderer, 
		" .:-=+*#%@",
		// ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
		{resolution: 0.2, invert: false} 
	);
	effect.setSize(blockM01.clientWidth, blockM01.clientHeight);
	effect.domElement.style.color = "lightgray";

	blockM01.appendChild( effect.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	var timer = Date.now() - start;
	spheres.position.x = Math.sin( timer * 0.0004 ) * 25;
	spheres.position.y = Math.sin( timer * 0.0003 ) * 100;
	spheres.position.z = Math.sin( timer * 0.0005 ) * 150;
	spheres.rotation.x = timer * 0.0003;
	spheres.rotation.z = timer * 0.0002;
	lighting.rotation.y = -timer * 0.0005;
	lighting.rotation.z = timer * 0.00025;
	if(skipCount == skip) {
		effect.render( scene, camera );
		skipCount = 0;
	} else {
		skipCount++;
	}
}

function onWindowResize() {
	renderer.setSize(blockM01.clientWidth, blockM01.clientHeight);
	camera.aspect = blockM01.clientWidth / blockM01.clientHeight;
	camera.updateProjectionMatrix();
	effect.setSize(blockM01.clientWidth, blockM01.clientHeight);
}
