import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import cube from "./demo/cube";
import bird from "./demo/bird";

const clock=new THREE.Clock();

let camera, scene, renderer, stats, gui, settings = {};
function init() {
    // 场景
    scene = new THREE.Scene();
    scene.background=new THREE.Color('skyblue');

    //添加物体
    scene.add(...bird);

    // 相机
    camera = new THREE.PerspectiveCamera(
        30, // 视野角度
        window.innerWidth / window.innerHeight, // 长宽比
        0.1, // 近截面（near）
        1000 // 远截面（far）
    );
    camera.position.set(80,300, 600);
    camera.lookAt(0, 0, 0);

    // 光源
    const ambientLight = new THREE.HemisphereLight(
        'white',
        'darkslategrey',
        5,
    );
    const mainLight=new THREE.DirectionalLight('white',4);
    mainLight.position.set(10,10,10);
    scene.add(ambientLight,mainLight);
    
    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    //renderer.setClearColor(0xffffff)
    document.body.appendChild(renderer.domElement);
    // window.addEventListener('resize', onWindowResize);
    window.onresize = onWindowResize;
    initHelper();
    initGUI();
}

function animate() {
    renderer.setAnimationLoop(()=>{
    // 浏览器刷新的时候渲染器重新渲染
    renderer.render(scene, camera);
    //requestAnimationFrame(animate);
    //获取自.oldTime设置后到当前的秒数，同时将.oldTime设置为当前时间
    const delta=clock.getDelta();
    bird.forEach(bird=>bird.tick(delta))
    stats.update();
    });
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
}

function initHelper() {
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  // const gridHelper = new THREE.GridHelper(1000, 100);
  // scene.add(gridHelper);

  //创建stats对象
  stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
}

function initGUI() {
  gui = new GUI();
}

init();
animate();
