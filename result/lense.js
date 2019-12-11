// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,0,600);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	// SKYBOX
	var imagePrefix = "images/bridge/";
	var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];
	var imageSuffix = ".jpg";
	var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
	var urls = [];
	for (var i = 0; i < 6; i++)
		urls.push( imagePrefix + directions[i] + imageSuffix );
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray ); // change mashfacematerial
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );


	// PENGUIN
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) { };

	var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath( './images/' );
		mtlLoader.load( 'penguin.mtl', function( materials ) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( './images/' );
			objLoader.load( 'penguin.obj', function ( object ) {
				object.position.z = -400;
				object.position.y = -50;
				object.rotation.x = -Math.PI/2;
				scene.add( object );
			}, onProgress, onError );
		});
    
    // LENSE	
	this.refractSphereCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
	scene.add( refractSphereCamera );
	this.refractSphereCamera.renderTarget.texture.mapping = THREE.CubeRefractionMapping;

	this.refractionMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
		refractionRatio: 0.6, 
		reflectivity: 0.9,
		envMap: this.refractSphereCamera.renderTarget.texture });
		
	
	var sphereGeometry = new THREE.SphereGeometry( 100, 64, 32 );
	this.sphere = new THREE.Mesh( sphereGeometry, refractionMaterial );
	sphere.position.set(0, 0, 0);
	scene.add(sphere);
	refractSphereCamera.position = sphere.position;
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{	
	controls.update();
}

function render() 
{
	sphere.visible = false;
	refractSphereCamera.update( renderer, scene );
	sphere.visible = true;
	renderer.render( scene, camera );
}