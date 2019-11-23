var show = document.getElementById("show");
showWidth = show.clientWidth
showHeight = show.clientHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, showWidth/showHeight , 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( showWidth, showHeight);
show.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();