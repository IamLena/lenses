var show = document.getElementById("show");
console.log(show)
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, show.innerWidth / show.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(show.innerWidth, show.innerHeight);
show.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00f0f0});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();