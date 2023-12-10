<script setup lang="ts">
import * as THREE from 'three'
import { TresCanvas } from '@tresjs/core';
import { ContactShadows, useGLTF, GLTFModel, OrbitControls, Plane } from '@tresjs/cientos'
import type { TreesGeometry } from 'three/examples/jsm/Addons.js';
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ref, type Ref, onMounted } from 'vue';

const gl = {
  clearColor: '#ded6d8',
  shadows: true,
  alpha: false,
  shadowMapType: THREE.PCFSoftShadowMap,
  outputColorSpace: THREE.SRGBColorSpace,
  toneMapping: THREE.NoToneMapping,
  windowSize: true,
}

// const renderRef = ref() as Ref<THREE.Scene>;
const sceneRef = ref() as Ref<THREE.Scene>;
const cameraRef = ref() as Ref<THREE.PerspectiveCamera>;
const modelRef = ref() as Ref<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>;

onMounted(() => {
  const scene = sceneRef.value;
  cameraRef.value = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);

  // console.log("Render ", renderRef.value.);

  scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
  console.log("Scene ", scene.fog);

  const GRID_SIZE = 5;
  const GRID_DIVISION = 10;
  const grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISION, "#888888", "#888888");

  sceneRef.value = scene;

});

// const { scene, nodes, animations, materials } = await useGLTF("/assets/models/table/1/littlewood_furniture.gltf", { draco: true })

// const loader = new GLTFLoader();
// const { scene } = await useLoader(loader, '/assets/models/table/1/littlewood_furniture.gltf')

function onClick(ev: any) {
  alert("Click Model");
  if (ev) {
    ev.object.material.color.set('#008080');
  }
}

function onPointerEnter(ev: any) {
  console.log(ev);
  if (ev) {
    ev.object.material.color.set('#DFFF45');
  }
}

const onReady = (model: any) => {
  const parameters = {
    // color: new Color('#e2eab8')
  }
  const matToon = new THREE.MeshToonMaterial(parameters);
  const matColor = new THREE.MeshBasicMaterial({ color: "#3c3c3c" });

  model.scene.traverse((child: THREE.Mesh) => {
    if (child.isMesh) {
      if (child.name.toLowerCase().includes("outline")) {
        child.material = matColor;
      }
      else {
        child.material = matToon;
        child.castShadow = true;
      }

      modelRef.value = child;
    }
  });
}
</script>

<template>
  <TresCanvas ref="sceneRef" v-bind="gl">

    <TresPerspectiveCamera ref="cameraRef" :position="[2, 2, 9]" :look-at="[0, 2, 0]" />
    <OrbitControls />

    <!-- <TresScene ref="sceneRef"> -->

    <Suspense>
      <!-- <primitive :object="nodes.littlewood_furniture" /> -->
      <!-- <primitive :object="scene" /> -->
      <GLTFModel ref="modelRef" path="/assets/models/table/1/littlewood_furniture.gltf" draco>
        <TresMeshToonMaterial :color='new THREE.Color(0xffffff)' />
      </GLTFModel>
    </Suspense>

    <!-- <TresDirectionalLight :color='new THREE.Color(0xffffff)' :position="[3, 3, 3]" :intensity="1" />
    <TresAmbientLight :intensity="2" /> -->

    <TresHemisphereLight />

<TresSpotLight :color="new THREE.Color(0xffffff)" :position="{ x: 5, y: 9, z: 7 }" :intensity="0.01" :angle="Math.PI / 3" :penumbra="0.3"
  cast-shadow/>

<TresPointLight :color="new THREE.Color(0xff0040)" :position="{ x: 0, y: 5, z: 2 }" :intensity="8"></TresPointLight>
<TresPointLight :color="new THREE.Color(0x0040ff)" :position="{ x: 0, y: 4, z: 2 }" :intensity=".8"></TresPointLight>
<TresPointLight :color="new THREE.Color(0x80ff80)" :position="{ x: 2, y: 9, z: -2 }" :intensity=".8"></TresPointLight>
<TresPointLight :color="new THREE.Color(0xffaa00)" :position="{ x: -2, y: 6, z: 2 }" :intensity=".8"></TresPointLight> 
    <TresGridHelper :size="5" :divisions="10" :colorGrid="new THREE.Color(0x888888)"></TresGridHelper>

    <ContactShadows :blur="0.5" :resolution="512" :opacity="0.2" />

    <Plane :width="2000" :height="2000" :position="[0, -0.02, 0]" :rotation="{ x: -Math.PI / 2 }" receive-shadow>
      <TresShadowMaterial receive-shadow :color="new THREE.Color(0x888888)" :transparent=true :opacity=0.005 :side=THREE.DoubleSide>
      </TresShadowMaterial>
      <!-- <TresMeshBasicMaterial :color='new THREE.Color(0xffffff)' /> -->
    </Plane>

    <!-- </TresScene> -->

  </TresCanvas>
</template>