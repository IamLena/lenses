var show = document.getElementById("show");
showWidth = show.clientWidth
showHeight = show.clientHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, showWidth/showHeight , 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize( showWidth, showHeight);
show.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 30, 30, 30 );
// var material = new THREE.MeshStandardMaterial({color: 0xffff00});
// var cube = new THREE.Mesh( geometry, material );
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add( cube );

var light = new THREE.PointLight( 0xffffff, 1, 1000 );
light.position.set( 50, 50, 60 );
light.castShadow = true;
scene.add( light );

var loader = new THREE.CubeTextureLoader();
loader.setPath( 'three.js-master/examples/textures/cube/pisa/' );
var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

textureCube.mapping = THREE.CubeRefractionMapping;
scene = new THREE.Scene();
scene.background = textureCube;

var geometry = new THREE.BoxGeometry( 200, 200, 200 );
var material = new THREE.MeshStandardMaterial({color: 0x000000});
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.receiveShadow = true;

scene.add( cube );

camera.position.x = -500
var angle = 0;
var radius = 500;

var animate = function () {
    requestAnimationFrame( animate );
    camera.position.x = radius * Math.cos( angle );  
    camera.position.z = radius * Math.sin( angle );
    camera.lookAt(0, 0, 0)
    angle += 0.005;

    renderer.render( scene, camera );
};

animate();
