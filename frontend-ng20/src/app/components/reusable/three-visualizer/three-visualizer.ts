import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-stl-viewer',
  template: `<div #viewerContainer class="w-full h-96 bg-custom-blue-night rounded-xl overflow-hidden"></div>`,
  styles: []
})
export class StlViewerComponent implements AfterViewInit, OnChanges {
  @Input() stlFile!: File | null;
  @ViewChild('viewerContainer', { static: true }) viewerRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private currentMesh: THREE.Mesh | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initThree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stlFile'] && this.stlFile) {
      this.loadSTL(this.stlFile);
    }
  }

  private initThree() {
    const container = this.viewerRef.nativeElement;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#27104e');

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 100);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 1, 1).normalize();
    this.scene.add(dirLight);

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;

    this.animate();
  }

  private loadSTL(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const loader = new STLLoader();
      const geometry = loader.parse(event.target.result);

      const material = new THREE.MeshPhongMaterial({
        color: 0xddacf5,
        shininess: 100,
        specular: 0x222222
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Clear previous mesh
      if (this.currentMesh) {
        this.scene.remove(this.currentMesh);
      }

      // Auto-center and scale
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox!;
      const size = bbox.getSize(new THREE.Vector3()).length();
      const center = bbox.getCenter(new THREE.Vector3());
      mesh.geometry.translate(-center.x, -center.y, -center.z);

      const scale = 50 / size; // scale down if too large
      mesh.scale.setScalar(scale);

      this.currentMesh = mesh;
      this.scene.add(mesh);
    };
    reader.readAsArrayBuffer(file);
  }

  private animate = () => {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        requestAnimationFrame(loop);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      loop();
    });
  };
}
