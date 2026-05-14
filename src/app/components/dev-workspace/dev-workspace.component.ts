import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

/**
 * Isometric 3D developer setup — REPLACES the old character animation.
 *
 * What we render:
 *  - A wooden desk
 *  - Curved monitor displaying live "code" (animated stripes)
 *  - Mechanical keyboard with RGB-edge glow
 *  - Mouse + mousepad
 *  - Lamp casting a purple key light
 *  - Coffee mug + small plant
 *  - Floating brand-color particles in the background
 *  - Subtle camera parallax to cursor
 */
@Component({
  selector: 'app-dev-workspace',
  standalone: true,
  template: `<div #host class="ws-host"></div>`,
  styles: [
    `
      :host { display: block; width: 100%; height: 100%; }
      .ws-host {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }
      .ws-host canvas { display: block; }
    `,
  ],
})
export class DevWorkspaceComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  private readonly platform = inject(PLATFORM_ID);

  /**
   * Gate: only initialise the heavy 3D once the parent says it's ready
   * (e.g. after the intro splash has played). Default `true` so the
   * component still works standalone.
   */
  readonly enabled = input<boolean>(true);

  // three.js essentials
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();

  // animated parts
  private screenMaterial!: THREE.ShaderMaterial;
  private keyboardKeys: THREE.Mesh[] = [];
  private particles!: THREE.Points;
  private workspace!: THREE.Group;
  private lampLight!: THREE.PointLight;

  // interaction
  private targetRotX = 0;
  private targetRotY = 0;
  private currentRotX = 0;
  private currentRotY = 0;

  private rafId = 0;
  private isInitialised = false;
  private isPaused = false;
  private isVisible = true;
  private io?: IntersectionObserver;
  private reducedMotion = false;

  // brand palette
  private readonly BRAND = 0x6c5ce7;
  private readonly BRAND_BRIGHT = 0x8a7ef5;
  private readonly ACCENT_CYAN = 0x67e8f9;
  private readonly ACCENT_VIOLET = 0xc084fc;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    // honor reduced motion
    this.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // pause while not visible (saves a LOT on tab-switching / scrolled-away)
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          this.isVisible = e.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    this.io.observe(this.host.nativeElement);

    if (this.enabled()) this.startEngine();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['enabled'] &&
      this.enabled() &&
      !this.isInitialised &&
      isPlatformBrowser(this.platform)
    ) {
      this.startEngine();
    }
  }

  private startEngine(): void {
    if (this.isInitialised) return;
    this.isInitialised = true;
    this.init();
    this.buildWorkspace();
    this.buildParticles();
    this.setupLighting();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.io?.disconnect();
    this.renderer?.dispose();
    this.scene?.traverse((o) => {
      if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose();
      const mat = (o as THREE.Mesh).material as THREE.Material | THREE.Material[];
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    });
  }

  @HostListener('document:visibilitychange')
  onTabVisibility() {
    this.isPaused = document.hidden;
  }

  // ─── init / setup ───────────────────────────────────────────────────────
  private init() {
    const el = this.host.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.04);

    // Isometric-ish camera
    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this.camera.position.set(7, 6, 9);
    this.camera.lookAt(0, 1.2, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(w, h);
    // 1.5 cap is the sweet spot — visually identical to 2 on most displays,
    // ~25% faster on retina screens.
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(this.renderer.domElement);
  }

  private buildWorkspace() {
    this.workspace = new THREE.Group();

    // ─── Desk ────────────────────────────────────────────────────────────
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x2a1f3d,
      roughness: 0.6,
      metalness: 0.1,
    });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(8, 0.18, 4.5), deskMat);
    desk.position.y = 0;
    desk.receiveShadow = true;
    this.workspace.add(desk);

    // Desk legs
    const legGeo = new THREE.BoxGeometry(0.16, 2.6, 0.16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.4, metalness: 0.6 });
    [-3.7, 3.7].forEach((x) => {
      [-1.9, 1.9].forEach((z) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, -1.3, z);
        leg.castShadow = true;
        this.workspace.add(leg);
      });
    });

    // ─── Monitor ─────────────────────────────────────────────────────────
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 2.0, -1);

    // bezel
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 2.7, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0f, roughness: 0.3, metalness: 0.5 }),
    );
    bezel.castShadow = true;
    monitorGroup.add(bezel);

    // SCREEN — animated shader playing "code"
    this.screenMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBrand: { value: new THREE.Color(this.BRAND) },
        uViolet: { value: new THREE.Color(this.ACCENT_VIOLET) },
        uCyan: { value: new THREE.Color(this.ACCENT_CYAN) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uBrand;
        uniform vec3 uViolet;
        uniform vec3 uCyan;
        varying vec2 vUv;

        // pseudo random
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

        void main() {
          // dark editor background
          vec3 col = vec3(0.04, 0.04, 0.07);

          // line index — divide into 22 horizontal "code" rows
          float line = floor(vUv.y * 22.0);
          float lineRand = hash(vec2(line, 0.0));

          // each row has random width "code" segments, slightly animated
          float t = uTime * 0.15 + lineRand * 6.28;
          float segStart = lineRand * 0.05;
          float segEnd = 0.1 + hash(vec2(line, 1.0)) * 0.7 + sin(t) * 0.05;

          // indent every other line
          float indent = mod(line, 2.0) > 0.5 ? 0.06 : 0.02;
          if (vUv.x > segStart + indent && vUv.x < segEnd) {
            // pick color per-row from the brand palette
            float pick = hash(vec2(line, 2.0));
            vec3 textCol = pick < 0.5
              ? mix(uBrand, uViolet, pick * 2.0)
              : mix(uViolet, uCyan, (pick - 0.5) * 2.0);
            // fake character grid
            float grid = step(0.5, fract(vUv.x * 80.0));
            col = mix(col, textCol, grid * 0.85);
          }

          // line number gutter
          if (vUv.x < 0.04) {
            col = vec3(0.08, 0.08, 0.13);
          }

          // active line highlight
          float activeLine = floor(mod(uTime * 1.2, 22.0));
          if (line == activeLine) {
            col += vec3(0.04, 0.03, 0.08);
          }

          // subtle scanline
          col *= 0.9 + 0.1 * sin(vUv.y * 600.0);

          // vignette
          vec2 d = vUv - 0.5;
          col *= 1.0 - dot(d, d) * 0.5;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.3, 2.4), this.screenMaterial);
    screen.position.z = 0.07;
    monitorGroup.add(screen);

    // monitor stand
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.7 }),
    );
    stand.position.y = -1.7;
    monitorGroup.add(stand);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.65, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.7 }),
    );
    base.position.y = -2.13;
    monitorGroup.add(base);

    this.workspace.add(monitorGroup);

    // ─── Keyboard with RGB keys ──────────────────────────────────────────
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, 0.16, 1.0);
    kbGroup.rotation.x = -0.05;

    const kbBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.12, 0.85),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.4, metalness: 0.5 }),
    );
    kbBase.castShadow = true;
    kbGroup.add(kbBase);

    // keys (4 rows × 12 cols)
    // NOTE: keys do NOT cast shadows individually — that's 48 extra shadow
    // casters per frame for tiny 0.16m cubes that no one would notice.
    // The keyboard base already casts a unified shadow.
    const keyGeo = new THREE.BoxGeometry(0.16, 0.07, 0.16);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x1c1c28, roughness: 0.5 });
    const palette = [this.BRAND, this.BRAND_BRIGHT, this.ACCENT_VIOLET, this.ACCENT_CYAN];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const key = new THREE.Mesh(keyGeo, keyMat.clone());
        key.position.set(
          -1.05 + c * 0.19,
          0.105,
          -0.3 + r * 0.2,
        );
        // tint each key bottom rim with brand color (we use children glow planes)
        const glow = new THREE.Mesh(
          new THREE.PlaneGeometry(0.18, 0.18),
          new THREE.MeshBasicMaterial({
            color: palette[(r + c) % palette.length],
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
          }),
        );
        glow.rotation.x = -Math.PI / 2;
        glow.position.y = -0.04;
        key.add(glow);
        kbGroup.add(key);
        this.keyboardKeys.push(key);
      }
    }
    this.workspace.add(kbGroup);

    // ─── Mouse + pad ─────────────────────────────────────────────────────
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.02, 0.85),
      new THREE.MeshStandardMaterial({ color: 0x1c1c28, roughness: 0.9 }),
    );
    pad.position.set(2.0, 0.10, 1.0);
    this.workspace.add(pad);

    const mouse = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 24, 16),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.6 }),
    );
    mouse.scale.set(0.8, 0.55, 1.1);
    mouse.position.set(2.0, 0.27, 1.0);
    mouse.castShadow = true;
    this.workspace.add(mouse);

    // ─── Lamp with purple light ──────────────────────────────────────────
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-3.0, 0.1, -1.5);

    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.7 }),
    );
    lampGroup.add(lampBase);

    const lampArm1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.7 }),
    );
    lampArm1.position.set(0, 0.7, 0);
    lampArm1.rotation.z = 0.3;
    lampArm1.position.x = 0.2;
    lampGroup.add(lampArm1);

    const lampArm2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x14141d, roughness: 0.3, metalness: 0.7 }),
    );
    lampArm2.position.set(0.7, 1.2, 0);
    lampArm2.rotation.z = Math.PI / 2 - 0.4;
    lampGroup.add(lampArm2);

    const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.45, 24, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x6c5ce7,
        emissive: 0x6c5ce7,
        emissiveIntensity: 0.3,
        roughness: 0.4,
        side: THREE.DoubleSide,
      }),
    );
    lampHead.position.set(1.2, 1.4, 0);
    lampHead.rotation.z = Math.PI - 0.6;
    lampGroup.add(lampHead);

    // bulb glow point light
    this.lampLight = new THREE.PointLight(this.BRAND, 8, 6, 1.8);
    this.lampLight.position.set(1.0, 1.25, -1.5);
    this.lampLight.castShadow = true;
    lampGroup.add(this.lampLight);

    this.workspace.add(lampGroup);

    // ─── Coffee mug ──────────────────────────────────────────────────────
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-2.4, 0.1, 1.2);

    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.18, 0.45, 24),
      new THREE.MeshStandardMaterial({ color: 0xf5f5f7, roughness: 0.4 }),
    );
    mug.position.y = 0.225;
    mug.castShadow = true;
    mugGroup.add(mug);

    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.035, 8, 16, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xf5f5f7, roughness: 0.4 }),
    );
    handle.rotation.y = Math.PI / 2;
    handle.position.set(-0.22, 0.2, 0);
    mugGroup.add(handle);

    // coffee inside (dark circle)
    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(0.2, 24),
      new THREE.MeshStandardMaterial({ color: 0x2a1810, roughness: 0.2 }),
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.452;
    mugGroup.add(coffee);

    this.workspace.add(mugGroup);

    // ─── Plant ───────────────────────────────────────────────────────────
    const plantGroup = new THREE.Group();
    plantGroup.position.set(3.4, 0.1, -1.3);

    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.26, 0.42, 16),
      new THREE.MeshStandardMaterial({ color: 0x3d2a1f, roughness: 0.8 }),
    );
    pot.position.y = 0.21;
    pot.castShadow = true;
    plantGroup.add(pot);

    // simple leafy plant with cones
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x4a7c59, roughness: 0.7 });
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.7, 8),
        leafMat,
      );
      const angle = (i / 7) * Math.PI * 2;
      leaf.position.set(Math.cos(angle) * 0.1, 0.6, Math.sin(angle) * 0.1);
      leaf.rotation.set(
        (Math.random() - 0.5) * 0.6,
        angle,
        (Math.random() - 0.5) * 0.6,
      );
      leaf.castShadow = true;
      plantGroup.add(leaf);
    }

    this.workspace.add(plantGroup);

    // ─── Floor (subtle grid plane) ───────────────────────────────────────
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      roughness: 0.95,
      metalness: 0.0,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.65;
    floor.receiveShadow = true;
    this.workspace.add(floor);

    // grid lines
    const grid = new THREE.GridHelper(40, 40, 0x6c5ce7, 0x222234);
    (grid.material as THREE.Material).opacity = 0.12;
    (grid.material as THREE.Material).transparent = true;
    grid.position.y = -2.64;
    this.workspace.add(grid);

    this.scene.add(this.workspace);

    // gentle pivot
    this.workspace.rotation.y = -0.3;
  }

  private buildParticles() {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cBrand = new THREE.Color(this.BRAND);
    const cViolet = new THREE.Color(this.ACCENT_VIOLET);
    const cCyan = new THREE.Color(this.ACCENT_CYAN);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 8 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;

      const pick = Math.random();
      const c = pick < 0.5 ? cBrand : pick < 0.8 ? cViolet : cCyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private setupLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.18);
    this.scene.add(ambient);

    // Soft fill from camera direction
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(5, 6, 6);
    fill.castShadow = true;
    // 512 looks identical to 1024 at this scale and is 4× cheaper
    fill.shadow.mapSize.width = 512;
    fill.shadow.mapSize.height = 512;
    fill.shadow.camera.near = 0.5;
    fill.shadow.camera.far = 30;
    this.scene.add(fill);

    // Brand-color rim light from behind
    const rim = new THREE.DirectionalLight(this.BRAND, 0.8);
    rim.position.set(-4, 4, -6);
    this.scene.add(rim);

    // Cyan accent
    const accent = new THREE.PointLight(this.ACCENT_CYAN, 1.2, 8);
    accent.position.set(4, 2, 3);
    this.scene.add(accent);
  }

  // ─── Interaction ────────────────────────────────────────────────────────
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.workspace) return;
    // normalize to -1..1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    this.targetRotY = -0.3 + x * 0.18;
    this.targetRotX = y * 0.06;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.renderer) return;
    const el = this.host.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ─── Animation loop ─────────────────────────────────────────────────────
  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate);

    // Pause work when offscreen / hidden tab — saves battery + CPU
    if (!this.isVisible || this.isPaused) {
      this.clock.getDelta(); // keep clock honest, no rendering work
      return;
    }

    const dt = this.clock.getDelta();
    const t = this.clock.getElapsedTime();

    // animated screen
    if (this.screenMaterial) {
      this.screenMaterial.uniforms['uTime'].value = t;
    }

    // soft camera/workspace follow
    this.currentRotY += (this.targetRotY - this.currentRotY) * 0.05;
    this.currentRotX += (this.targetRotX - this.currentRotX) * 0.05;
    if (this.workspace) {
      this.workspace.rotation.y = this.currentRotY;
      this.workspace.rotation.x = this.currentRotX;
      // gentle float (skip if user prefers reduced motion)
      if (!this.reducedMotion) {
        this.workspace.position.y = Math.sin(t * 0.5) * 0.05;
      }
    }

    // typing animation — random keys depress
    if (Math.random() > 0.85 && this.keyboardKeys.length) {
      const key = this.keyboardKeys[Math.floor(Math.random() * this.keyboardKeys.length)];
      key.position.y = 0.07;
      setTimeout(() => { key.position.y = 0.105; }, 80);
    }

    // lamp light pulse
    if (this.lampLight) {
      this.lampLight.intensity = 7 + Math.sin(t * 1.5) * 1.2;
    }

    // particles drift
    if (this.particles) {
      this.particles.rotation.y += dt * 0.02;
      const positions = this.particles.geometry.attributes['position'] as THREE.BufferAttribute;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        positions.setY(i, y + dt * 0.08);
        if (y > 6) positions.setY(i, -1);
      }
      positions.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  };
}
