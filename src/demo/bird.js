import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

function setupMode(data){
    const model =data.scene.children[0];
    const clip=data.animations[0];
    
    //播放器：传入动画所属的对象
    const mixer =new THREE.AnimationMixer(model);
    //返回所传入的剪辑参数的AnimationAction，根对象参数可选，默认值为混合器的默认根对象，第一个参数可以是动画剪辑(AnimationClip)对象或者动画剪辑的名称
    const action =mixer.clipAction(clip);
    action.play();
    model.tick=(delta)=>mixer.update(delta);
    return model;
}

const loader=new GLTFLoader()
//1.基于callback回调
//2.基于async await
// const parrotData=await loader.loadAsync('./src/assets/models/Parrot.glb');//2
// const flamingoData=await loader.loadAsync('./src/assets/models/Flamingo.glb');//3
// const storkData=await loader.loadAsync('./src/assets/models/Stork.glb');//4

const [parrotData,flamingoData,storkData]=await Promise.all([
    loader.loadAsync('./src/assets/models/Parrot.glb'),
    loader.loadAsync('./src/assets/models/Flamingo.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb')
])

const parrot=setupMode(parrotData)
parrot.position.set(120,-10,-100)

const stork=setupMode(storkData)

const flamingo=setupMode(flamingoData)
flamingo.position.set(-150,-10,-100)

export default [stork,parrot,flamingo]