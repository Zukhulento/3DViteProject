import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import  background  from './assets/background.png'
import profile from './assets/potrait.jpeg'
import moonPic from './assets/moon.jpg'
import sunPic from './assets/sun.jpg'
import normalPic from './assets/normal.jpg'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000 )

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene,camera)

//Adding object 
//1st Step, Geometry
const geometry = new THREE.TorusGeometry(10, 3,16,100) //Circle form
//const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true }) //Adding color and frame
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347})
const torus = new THREE.Mesh(geometry,material) //Creating torus and applying props

scene.add(torus)//Adding torus to scene

//Adding light
const pointLight = new THREE.PointLight(0xffffff)//Hexadecimal literal
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)//Hexadecimal literal

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)//Hexadecimal literal
const gridHelper = new THREE.GridHelper(200,50)
//scene.add(lightHelper, gridHelper)
//Adding controls to move around
const controls = new OrbitControls(camera,renderer.domElement)
//Adding stars randomly
function addStar(){
  const geometry = new THREE.SphereGeometry(0.10, 24 ,24 ) //Creating Star
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff}) //Adding Color
  const star = new THREE.Mesh(geometry, material) // Applying props

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) //Generating random position

  star.position.set(x,y,z)//Setting position to the star
  scene.add(star) //Adding star to scene
}

Array(200).fill().forEach(addStar) //Looping the star creation 200 times

const spaceTexture = new THREE.TextureLoader().load(background)
scene.background = spaceTexture


//Avatar on cube

const LuisTexture = new THREE.TextureLoader().load(profile)

const luis = new THREE.Mesh(
  new THREE.BoxGeometry(5,6,5),
  new THREE.MeshBasicMaterial( {map:LuisTexture})
)
luis.position.z = -10;
luis.position.setX(0)
luis.position.setY(0)
scene.add(luis)


//Moon 
const moonMap = new THREE.TextureLoader().load(moonPic)
const normalTexture = new THREE.TextureLoader().load(normalPic)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: moonMap,
    normalMap: normalTexture
  })
)

scene.add(moon)
//Sun
const sunMap = new THREE.TextureLoader().load(sunPic)

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: sunMap,
    normalMap: normalTexture
  })
)

scene.add(sun)


//Moving sun and moon

torus.position.z = -10
torus.position.setX(-20)
torus.position.setY(-10) 


moon.position.z = -30;
moon.position.setX(-10)
sun.position.setY(5)

sun.position.z = -50;
sun.position.setX(50)
sun.position.setY(20)



//Function to move camera
function moveCamera(){
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05
  sun.rotation.x += 0.05
  sun.rotation.y += 0.075
  sun.rotation.z += 0.05

  luis.rotation.y += 0.01
  luis.rotation.z += 0.01


  camera.position.z = t*-0.01
  camera.position.x = t*-0.0002
  camera.position.y = t*-0.0002

}


document.body.onscroll = moveCamera;
moveCamera();

//Animation loop function
function animate(){
requestAnimationFrame( animate)
renderer.render(scene, camera)

torus.rotation.x += 0.01;
torus.rotation.y += 0.005;
torus.rotation.z += 0.01;
moon.rotation.z += 0.005
sun.rotation.z+= 0.005


}
animate()