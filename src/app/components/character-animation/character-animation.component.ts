import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-character-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="threejs-container" #rendererContainer></div>
  `,
  styles: [`
    .threejs-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  `]
})
export class CharacterAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private character!: THREE.Group;
  private head: THREE.Object3D | null = null;
  private eyes!: THREE.Group;
  private mouseX = 0;
  private mouseY = 0;
  private windowHalfX = 0;
  private windowHalfY = 0;
  private animationId: number | null = null;
  private particleSystem!: THREE.Points;
  private clock = new THREE.Clock();

  // Color principal morado
  private mainColor = 0x6c5ce7; // El color que solicitaste #6c5ce7
  
  // Colores secundarios (variaciones del mismo tono)
  private brandColors = {
    darkBackground: 0x000000, // Fondo negro como solicitaste
    mainPurple: 0x6c5ce7,    // Color principal
    lightPurple: 0x8a7ef5,   // Una versión más clara del color principal
    darkPurple: 0x5549c9     // Una versión más oscura del color principal
  };

  constructor() { }

  ngOnInit(): void { 
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.createModernCharacter();
    this.createMonochromaticParticles();
    this.addModernLighting();
    
    // Agregar eventos del mouse
    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Iniciar bucle de animación
    this.animate();
  }

  ngOnDestroy(): void {
    // Limpiar recursos y eventos
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    
    document.removeEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThree(): void {
    try {
      // Crear escena con fondo negro como solicitaste
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(this.brandColors.darkBackground);
      this.scene.fog = new THREE.FogExp2(this.brandColors.darkBackground, 0.035);
      
      // Crear cámara
      const aspect = this.getContainerAspect();
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      this.camera.position.set(0, 1.5, 4);
      this.camera.lookAt(0, 1.5, 0);
      
      // Crear renderer con antialiasing para bordes suaves
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      
      this.renderer.setSize(
        this.rendererContainer.nativeElement.clientWidth,
        this.rendererContainer.nativeElement.clientHeight
      );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      
      // Añadir renderer al DOM
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      
      // Crear controles de cámara (desactivados para el usuario)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.enableRotate = false;
      this.controls.update();
    } catch (error) {
      console.error('Error al inicializar Three.js:', error);
    }
  }

  private createModernCharacter(): void {
    try {
      // Crear grupo principal para el personaje
      this.character = new THREE.Group();
      
      // Materiales 
      const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xffdbac, // Tono de piel natural
        roughness: 0.3,
        metalness: 0.0,
        envMapIntensity: 1.0
      });
      
      const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x191919, // Negro para el pelo
        roughness: 0.4,
        metalness: 0.05,
        envMapIntensity: 0.8
      });
      
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.1,
        envMapIntensity: 1.2
      });
      
      const pupilMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b60e4, // Azul para pupilas
        roughness: 0.1,
        metalness: 0.2,
        envMapIntensity: 1.5
      });
      
      const clothingMaterial = new THREE.MeshStandardMaterial({
        color: 0x0f4c81, // Azul más profundo para ropa
        roughness: 0.5,
        metalness: 0.1,
        envMapIntensity: 0.7
      });
      
      // Crear cabeza estilo cartoon
      const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const head = new THREE.Mesh(headGeometry, skinMaterial);
      head.position.y = 0.5;
      head.castShadow = true;
      
      // Crear pelo
      const hairGroup = new THREE.Group();
      
      // Base del pelo
      const hairBaseGeometry = new THREE.SphereGeometry(0.52, 32, 16);
      hairBaseGeometry.scale(1, 0.7, 1);
      const hairBase = new THREE.Mesh(hairBaseGeometry, hairMaterial);
      hairBase.position.y = 0.15;
      hairBase.position.z = -0.06;
      
      // Flequillo
      const fringeGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.3);
      fringeGeometry.translate(0, 0, 0);
      const fringe = new THREE.Mesh(
        fringeGeometry,
        hairMaterial
      );
      fringe.position.set(0, 0.35, 0.35);
      fringe.rotation.x = Math.PI * 0.15;
      
      // Lados del pelo
      const sideHairLeft = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.4, 0.4),
        hairMaterial
      );
      sideHairLeft.position.set(-0.45, 0.1, 0);
      sideHairLeft.rotation.z = Math.PI * 0.1;
      
      const sideHairRight = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.4, 0.4),
        hairMaterial
      );
      sideHairRight.position.set(0.45, 0.1, 0);
      sideHairRight.rotation.z = -Math.PI * 0.1;
      
      hairGroup.add(hairBase);
      hairGroup.add(fringe);
      hairGroup.add(sideHairLeft);
      hairGroup.add(sideHairRight);
      
      // Gafas en la cabeza
      const glassesGroup = new THREE.Group();
      
      const glassesMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.7,
        envMapIntensity: 1.0
      });
      
      // Marco de gafas
      const glassesFrameGeometry = new THREE.BoxGeometry(0.85, 0.08, 0.05);
      const glassesFrame = new THREE.Mesh(glassesFrameGeometry, glassesMaterial);
      glassesFrame.position.set(0, 0.25, 0.47);
      
      // Las gafas están en la cabeza
      glassesFrame.position.y += 0.3;
      
      glassesGroup.add(glassesFrame);
      
      // Crear ojos expresivos
      this.eyes = new THREE.Group();
      
      // Ojo izquierdo
      const leftEyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const leftEye = new THREE.Mesh(leftEyeGeometry, eyeMaterial);
      leftEye.position.set(-0.18, 0.05, 0.4);
      
      // Pupila izquierda
      const leftPupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const leftPupil = new THREE.Mesh(leftPupilGeometry, pupilMaterial);
      leftPupil.position.z = 0.05;
      leftEye.add(leftPupil);
      
      // Ojo derecho
      const rightEyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const rightEye = new THREE.Mesh(rightEyeGeometry, eyeMaterial);
      rightEye.position.set(0.18, 0.05, 0.4);
      
      // Pupila derecha
      const rightPupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const rightPupil = new THREE.Mesh(rightPupilGeometry, pupilMaterial);
      rightPupil.position.z = 0.05;
      rightEye.add(rightPupil);
      
      // Añadir pestañas a ambos ojos
      const eyelashMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      
      // Función para crear pestañas
      const createEyelashes = (eyeX: number, isLeft: boolean) => {
        const lashGroup = new THREE.Group();
        const lashCount = 5;
        const lashLength = 0.05;
        
        for (let i = 0; i < lashCount; i++) {
          const angle = isLeft ? 
            (Math.PI * 0.25) + i * (Math.PI * 0.15) : 
            (Math.PI * 0.75) - i * (Math.PI * 0.15);
          
          const lash = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, lashLength, 0.01),
            eyelashMaterial
          );
          
          lash.position.set(
            eyeX + Math.cos(angle) * 0.09,
            0.05 + Math.sin(angle) * 0.09,
            0.44
          );
          
          lash.rotation.z = angle + Math.PI * 0.5;
          lashGroup.add(lash);
        }
        
        return lashGroup;
      };
      
      // Crear y añadir pestañas para ambos ojos
      const leftEyelashes = createEyelashes(-0.18, true);
      const rightEyelashes = createEyelashes(0.18, false);
      
      this.eyes.add(leftEyelashes);
      this.eyes.add(rightEyelashes);
      
      // Cejas
      const eyebrowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      
      const leftEyebrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.02, 0.01),
        eyebrowMaterial
      );
      leftEyebrow.position.set(-0.18, 0.18, 0.45);
      leftEyebrow.rotation.z = -Math.PI * 0.05;
      
      const rightEyebrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.02, 0.01),
        eyebrowMaterial
      );
      rightEyebrow.position.set(0.18, 0.18, 0.45);
      rightEyebrow.rotation.z = Math.PI * 0.05;
      
      this.eyes.add(leftEye);
      this.eyes.add(rightEye);
      this.eyes.add(leftEyebrow);
      this.eyes.add(rightEyebrow);
      
      // Crear nariz
      const noseGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const nose = new THREE.Mesh(noseGeometry, skinMaterial);
      nose.position.set(0, 0, 0.48);
      nose.scale.y = 1.2;
      
      // Crear sonrisa sutil
      const subtleSmileMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
      const subtleSmileGeometry = new THREE.TorusGeometry(0.12, 0.01, 16, 16, Math.PI * 0.4);
      const subtleSmile = new THREE.Mesh(subtleSmileGeometry, subtleSmileMaterial);
      subtleSmile.position.set(0, -0.12, 0.42);
      subtleSmile.rotation.x = Math.PI / 2;
      subtleSmile.rotation.z = Math.PI;
      
      // Crear cuello
      const neckGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.3, 32);
      const neck = new THREE.Mesh(neckGeometry, skinMaterial);
      neck.position.y = -0.15;
      neck.castShadow = true;
      
      // Crear cuerpo con sudadera azul
      const torsoGeometry = new THREE.CylinderGeometry(0.35, 0.3, 0.8, 32);
      const torso = new THREE.Mesh(torsoGeometry, clothingMaterial);
      torso.position.y = -0.7;
      torso.castShadow = true;
      
      // Cuello de la sudadera
      const collarGeometry = new THREE.TorusGeometry(0.18, 0.05, 16, 32, Math.PI * 2);
      const collar = new THREE.Mesh(collarGeometry, clothingMaterial);
      collar.position.y = -0.25;
      collar.rotation.x = Math.PI / 2;
      
      // Añadir todo al grupo de la cabeza
      head.add(hairGroup);
      head.add(this.eyes);
      head.add(nose);
      head.add(subtleSmile);
      head.add(glassesGroup);
      
      // Crear brazos
      const createArm = (posX: number) => {
        const armGroup = new THREE.Group();
        
        const upperArmGeometry = new THREE.CylinderGeometry(0.1, 0.09, 0.5, 32);
        const upperArm = new THREE.Mesh(upperArmGeometry, clothingMaterial);
        upperArm.position.y = -0.25;
        upperArm.castShadow = true;
        
        const handGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const hand = new THREE.Mesh(handGeometry, skinMaterial);
        hand.position.y = -0.5;
        hand.scale.y = 0.8;
        hand.castShadow = true;
        
        armGroup.add(upperArm);
        armGroup.add(hand);
        
        // Posicionar brazo
        armGroup.position.set(posX, -0.5, 0);
        
        // Establecer rotación inicial
        if (posX < 0) {
          armGroup.rotation.z = Math.PI * 0.05;
        } else {
          armGroup.rotation.z = -Math.PI * 0.05;
        }
        
        return armGroup;
      };
      
      const leftArm = createArm(-0.4);
      const rightArm = createArm(0.4);
      
      // Añadir todo al grupo del personaje
      this.character.add(head);
      this.character.add(neck);
      this.character.add(collar);
      this.character.add(torso);
      this.character.add(leftArm);
      this.character.add(rightArm);
      
      // Guardar referencia a la cabeza para la animación
      this.head = head;
      
      // Ajustar posición del personaje
      this.character.position.y = 0;
      
      // Añadir el personaje a la escena
      this.scene.add(this.character);
      
      // Escalar para que se vea más pequeño
      this.character.scale.set(0.75, 0.75, 0.75);
      
    } catch (error) {
      console.error('Error al crear personaje moderno:', error);
    }
  }

  private createMonochromaticParticles(): void {
    try {
      // Crear sistema de partículas usando SOLO el color morado que solicitaste
      const particlesCount = 250;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      const sizes = new Float32Array(particlesCount);
      
      // Convertir a objeto Color de THREE.js
      const mainColor = new THREE.Color(this.mainColor);
      
      // Crear variaciones del mismo color para dar profundidad pero mantener la identidad
      const colorLight = new THREE.Color(this.mainColor).multiplyScalar(1.2); // Versión más clara
      const colorDark = new THREE.Color(this.mainColor).multiplyScalar(0.8);  // Versión más oscura
      
      // Generar posiciones aleatorias
      for (let i = 0; i < particlesCount; i++) {
        // Posiciones
        const radius = 3 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi) - 2;
        
        // Tamaños variados
        sizes[i] = Math.random() * 0.06 + 0.02;
        
        // Asignar solo el color morado que solicitaste con ligeras variaciones
        let selectedColor;
        
        const variation = Math.random();
        if (variation > 0.7) {
          selectedColor = colorLight;  // Versión más clara ocasionalmente
        } else if (variation > 0.4) {
          selectedColor = mainColor;   // Color principal la mayoría de las veces
        } else {
          selectedColor = colorDark;   // Versión más oscura ocasionalmente
        }
        
        colors[i * 3] = selectedColor.r;
        colors[i * 3 + 1] = selectedColor.g;
        colors[i * 3 + 2] = selectedColor.b;
      }
      
      // Crear geometría de partículas
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Cargar textura para partículas más suaves
      const particleTexture = new THREE.TextureLoader().load('assets/textures/particle.png');
      
      // Material de partículas
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: particleTexture || null,
        sizeAttenuation: true
      });
      
      // Crear sistema de partículas
      this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      this.scene.add(this.particleSystem);
      
      // Crear nodos y conexiones con el color solicitado
      this.createMonochromaticNodes();
    } catch (error) {
      console.error('Error al crear partículas:', error);
    }
  }

  private createMonochromaticNodes(): void {
    try {
      // Crear nodos (esferas brillantes) con SOLO el color morado solicitado
      const nodePositions = [
        new THREE.Vector3(1.5, 0.5, -1.0),
        new THREE.Vector3(-1.5, 1.0, -1.5),
        new THREE.Vector3(0.5, 2.0, -2.0),
        new THREE.Vector3(-1.0, -1.0, -2.5),
        new THREE.Vector3(2.0, -0.5, -1.5),
        new THREE.Vector3(-2.0, 0.0, -1.0),
        new THREE.Vector3(0.0, -2.0, -2.0),
        new THREE.Vector3(1.0, -1.5, -3.0)
      ];
      
      // Usar solo el color morado principal y pequeñas variaciones
      const nodeColors = [
        this.mainColor,
        this.brandColors.lightPurple,
        this.mainColor,
        this.brandColors.darkPurple,
        this.mainColor,
        this.brandColors.lightPurple,
        this.mainColor,
        this.brandColors.darkPurple
      ];
      
      // Tamaños para variar un poco
      const nodeSizes = [0.08, 0.1, 0.07, 0.09, 0.06, 0.08, 0.1, 0.07];
      
      // Grupo para los nodos
      const nodesGroup = new THREE.Group();
      
      for (let i = 0; i < nodePositions.length; i++) {
        // Material con brillo
        const nodeMaterial = new THREE.MeshStandardMaterial({
          color: nodeColors[i],
          emissive: nodeColors[i],
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.9,
          metalness: 0.3,
          roughness: 0.2
        });
        
        const nodeGeometry = new THREE.SphereGeometry(nodeSizes[i], 16, 16);
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(nodePositions[i]);
        nodesGroup.add(node);
        
        // Añadir luz puntual en cada nodo
        const nodeLight = new THREE.PointLight(nodeColors[i], 0.5, 2);
        nodeLight.position.copy(nodePositions[i]);
        this.scene.add(nodeLight);
      }
      
      this.scene.add(nodesGroup);
      
      // Crear conexiones (líneas)
      const linesGroup = new THREE.Group();
      
      for (let i = 0; i < nodePositions.length; i++) {
        // Conectar cada nodo con otros
        for (let j = i + 1; j < nodePositions.length; j++) {
          // Solo conectar algunos nodos, no todos
          if (Math.random() > 0.6) continue;
          
          const start = nodePositions[i];
          const end = nodePositions[j];
          
          // Calcular distancia entre nodos
          const distance = start.distanceTo(end);
          
          // Solo conectar nodos que no estén muy lejos
          if (distance < 3.5) {
            const points = [start, end];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            
            // Usar siempre el color principal para las líneas
            const lineMaterial = new THREE.LineBasicMaterial({
              color: this.mainColor,
              transparent: true,
              opacity: 0.3 + Math.random() * 0.2,
              blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            linesGroup.add(line);
          }
        }
      }
      
      this.scene.add(linesGroup);
      
      // Animar las líneas y nodos
      const animateNodes = () => {
        nodesGroup.children.forEach((node, index) => {
          node.position.y += Math.sin(this.clock.getElapsedTime() * 0.5 + index) * 0.001;
        });
        
        requestAnimationFrame(animateNodes);
      };
      
      animateNodes();
      
    } catch (error) {
      console.error('Error al crear nodos y conexiones:', error);
    }
  }

  private addModernLighting(): void {
    try {
      // Luz ambiente sutil
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(ambientLight);
      
      // Luz principal (frente)
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.7);
      mainLight.position.set(2, 2, 3);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      mainLight.shadow.camera.near = 0.5;
      mainLight.shadow.camera.far = 15;
      mainLight.shadow.normalBias = 0.02;
      this.scene.add(mainLight);
      
      // Luz de acento con el color morado solicitado
      const accentLight = new THREE.DirectionalLight(this.mainColor, 0.4);
      accentLight.position.set(-3, 1, 2);
      this.scene.add(accentLight);
      
      // Luz de contorno (atrás)
      const rimLight = new THREE.DirectionalLight(this.mainColor, 0.5);
      rimLight.position.set(0, 0, -3);
      this.scene.add(rimLight);
      
      // Luz puntual morada para realzar partículas
      const spotLight = new THREE.SpotLight(this.mainColor, 1, 10, Math.PI / 4, 0.3, 1);
      spotLight.position.set(-2, 3, 2);
      this.scene.add(spotLight);
    } catch (error) {
      console.error('Error al añadir luces:', error);
    }
  }

  private onDocumentMouseMove(event: MouseEvent): void {
    // Calcular posición del mouse normalizada (-1 a 1)
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
  }

  private onWindowResize(): void {
    if (this.camera && this.renderer) {
      try {
        // Actualizar tamaño del renderer
        this.renderer.setSize(
          this.rendererContainer.nativeElement.clientWidth,
          this.rendererContainer.nativeElement.clientHeight
        );
        
        // Actualizar aspecto de la cámara
        this.camera.aspect = this.getContainerAspect();
        this.camera.updateProjectionMatrix();
        
        // Actualizar posición de la cámara
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
      } catch (error) {
        console.error('Error en el resize:', error);
      }
    }
  }

  private getContainerAspect(): number {
    return this.rendererContainer.nativeElement.clientWidth / 
           this.rendererContainer.nativeElement.clientHeight;
  }

  private animate(): void {
    try {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
      
      const delta = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();
      
      // Animar el personaje
      if (this.character) {
        // Efecto de flotación suave
        this.character.position.y = Math.sin(elapsedTime * 0.6) * 0.08;
        
        // Rotación muy sutil
        this.character.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;
        
        // Movimiento suave de brazos
        if (this.character.children.length >= 6) {
          const leftArm = this.character.children[4];
          const rightArm = this.character.children[5];
          
          if (leftArm && rightArm) {
            leftArm.rotation.z = Math.PI * 0.05 + Math.sin(elapsedTime * 0.5) * 0.04;
            rightArm.rotation.z = -Math.PI * 0.05 - Math.sin(elapsedTime * 0.5) * 0.04;
          }
        }
      }
      
      // Animar cabeza y ojos para seguir al ratón
      if (this.head && this.eyes) {
        // Limitar rotación a valores razonables
        const targetHeadRotY = this.mouseX * 0.2;
        const targetHeadRotX = this.mouseY * 0.15;
        
        // Suavizar movimientos con interpolación
        this.head.rotation.y += (targetHeadRotY - this.head.rotation.y) * 0.05;
        this.head.rotation.x += (targetHeadRotX - this.head.rotation.x) * 0.05;
        
        // Mover pupilas para seguir al cursor
        this.eyes.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.children.length > 0 && 
             (child.position.x === -0.18 || child.position.x === 0.18)) {
            const pupil = child.children[0];
            if (pupil) {
              pupil.position.x = this.mouseX * 0.03;
              pupil.position.y = this.mouseY * 0.03;
            }
          }
        });
      }
      
      // Animar sistema de partículas
      if (this.particleSystem) {
        // Rotación muy lenta
        this.particleSystem.rotation.y += delta * 0.02;
        
        // Efecto de "respiración" del sistema de partículas
        const scale = 1 + Math.sin(elapsedTime * 0.2) * 0.02;
        this.particleSystem.scale.set(scale, scale, scale);
        
        // Hacer que algunas partículas brillen más
        const particleSizes = this.particleSystem.geometry.attributes['size'] as THREE.BufferAttribute;
        
        if (particleSizes) {
          for (let i = 0; i < particleSizes.count; i++) {
            // Hacer que el tamaño varíe suavemente con el tiempo
            const originalSize = particleSizes.getX(i);
            const newSize = originalSize * (1 + Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.2);
            particleSizes.setX(i, newSize);
          }
          particleSizes.needsUpdate = true;
        }
      }
      
      // Parpadeo ocasional
      if (this.eyes && Math.random() > 0.997) {
        this.blinkEyes();
      }
      
      // Renderizar escena
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    } catch (error) {
      console.error('Error en animación:', error);
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }
  
  // Método para hacer parpadear los ojos
  private blinkEyes(): void {
    if (!this.eyes) return;
    
    // Encontrar los ojos
    let leftEye: THREE.Object3D | undefined;
    let rightEye: THREE.Object3D | undefined;
    
    this.eyes.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.position.x === -0.18) leftEye = child;
        if (child.position.x === 0.18) rightEye = child;
      }
    });
    
    // Verificar que los ojos son instancias de Mesh
    if (!leftEye || !rightEye || 
        !(leftEye instanceof THREE.Mesh) || 
        !(rightEye instanceof THREE.Mesh)) {
      return;
    }
    
    // Ahora TypeScript sabe que son THREE.Mesh y tienen propiedad scale
    const originalScaleY = leftEye.scale.y;
    
    // Cerrar ojos (escalar en Y)
    leftEye.scale.y = 0.1;
    rightEye.scale.y = 0.1;
    
    // Abrir ojos después de un breve tiempo
    const leftEyeRef = leftEye;  // Crear referencias que se mantienen en el closure
    const rightEyeRef = rightEye;
    
    setTimeout(() => {
      if (leftEyeRef && rightEyeRef) {
        leftEyeRef.scale.y = originalScaleY;
        rightEyeRef.scale.y = originalScaleY;
      }
    }, 150);
  }
}