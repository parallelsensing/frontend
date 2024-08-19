import {
    EventDispatcher,
    WebGLRenderer,
    Color,
    BoxGeometry,
    MeshBasicMaterial,
    AmbientLight,
    DirectionalLight,
    PerspectiveCamera,
    Scene,
    Group,
    Vector3,
    AxesHelper,
    Mesh,
    Raycaster,
    Vector2,
    Sprite,
    SpriteMaterial,
    CanvasTexture
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GltfLoader, GLTF_LOAD_EVENT } from './gltf-loader';

export const EVENT = {
    LOADING: 'modelLoading'
};

const Static = {
    X: 0,
    Y: 0,
    WIDTH: 1920,
    HEIGHT: 1080,
    DURATION: 1600,
    CAMERA_FAR: 50
};

export class NewPlatform extends EventDispatcher {
    private _canvas: any = null;
    private _camera: PerspectiveCamera; // 摄像头
    private _scene: Scene; // 场景
    private _models: Group; // 展位
    private _renderer: any = null; // 渲染器
    private _controls: any; //相机控制器
    private _axeshelper: any;
    private _boxgeo: BoxGeometry;
    private _boxmat: MeshBasicMaterial;
    private _boxmata: MeshBasicMaterial;
    private _box: Mesh;
    private _boxa: Mesh;
    private _raycaster: Raycaster; // 射线
    private _textureCube: any;

    constructor(canvas: HTMLElement, size: [number, number], onLoading: (e: any) => void) {
        super();
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(75, Static.WIDTH / Static.HEIGHT, 0.001, 10000);
        this._boxgeo = new BoxGeometry(0.9, 0.9, 0.6);
        this._boxmat = new MeshBasicMaterial({
            color: 0x00aa00,
            wireframe: true
        });
        this._boxmata = new MeshBasicMaterial({
            color: 0x00aa00,
            wireframe: true
        });
        this._scene.background = new Color(0xffffff);
        this._scene.environment = this._textureCube;
        this._box = new Mesh(this._boxgeo, this._boxmat);
        this._boxa = new Mesh(this._boxgeo, this._boxmata);
        this._box.position.set(-15, 15, 10);
        this._boxa.position.set(-25, 15, 10);
        this._boxa.name = '实时点云';
        this._box.name = '实时监控';
        this._raycaster = new Raycaster();

        this._camera.position.set(0, -20, 20);
        this._camera.lookAt(new Vector3(0, 0, 0));
        this._models = new Group();
        this._axeshelper = new AxesHelper(50);
        this._scene.add(this._models, this.getLights(), this._camera, this._axeshelper);
        this.addCanvas(canvas, size);
        this.modelInit();
        this.addEventListener(EVENT.LOADING, onLoading);
    }

    getLights() {
        const group = new Group();
        const sun = new DirectionalLight(0xffffff, 0.8);
        sun.position.set(50, 50, 0);
        group.add(new AmbientLight(0xffffff, 0.6), sun);
        return group;
    }

    /**
    * 装载
    * @param canvas 元素
    */
    addCanvas(canvas: HTMLElement, size: [number, number]) {
        this._canvas = canvas;
        this._renderer = new WebGLRenderer({ antialias: true });
        this._renderer.setSize(size[0], size[1]);
        this._canvas.appendChild(this._renderer.domElement);
        this._renderer.shadowMap.enabled = true;
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        if (this._controls) this._controls.update();
        this._renderer.render(this._scene, this._camera);
    };

    modelInit() {
        const modelBuild = new GltfLoader();
        modelBuild.addEventListener(GLTF_LOAD_EVENT.LOADING, (e: any) => {
            this.onLoading(e);
        });
        this._models.add(modelBuild, this._box, this._boxa);
        this._models.add(this.createLabel('实时监控', this._box.position));
        this._models.add(this.createLabel('实时点云', this._boxa.position));
        this.controlCamera();
    }

    onLoading = (e: any) => {
        const event = { type: EVENT.LOADING, data: e } as never;
        this.dispatchEvent(event);
    };

    controlCamera() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    }

    cast(screenX: number, screenY: number) {
        this._models.children.forEach((item: any) => {
            if (item.name === '实时监控' || item.name === '实时点云') {
                item.material.color = new Color(0x00aa00);
            }
        });

        // 获取画布相对于屏幕的偏移量
        const canvasRect = this._renderer.domElement.getBoundingClientRect();
        const canvasOffsetX = canvasRect.left;
        const canvasOffsetY = canvasRect.top;

        const width = canvasRect.right - canvasRect.left;
        const height = canvasRect.bottom - canvasRect.top;
        // 将屏幕坐标转换为画布坐标
        const canvasX = screenX - canvasOffsetX;
        const canvasY = screenY - canvasOffsetY;
        // 将画布坐标转换为标准化设备坐标
        const mouse = new Vector2();
        // 当画布尺寸改变的时候需要换分母
        mouse.x = (canvasX / width) * 2 - 1;
        mouse.y = -(canvasY / height) * 2 + 1;

        this._raycaster.setFromCamera(mouse, this._camera);
        const intersects: any = this._raycaster.intersectObjects(this._models.children.filter((item: any) => item.isMesh), false);

        if (intersects.length && intersects[0].object.name === '实时监控') {
            intersects[0].object.material.color = new Color(0x0000ff);
            return '实时监控';
        } else if (intersects.length && intersects[0].object.name === '实时点云') {
            intersects[0].object.material.color = new Color(0xff0000);
            return '实时点云';
        } else {
            console.log('无拾取');
        }
    }

    createLabel(text: string, position: Vector3): Sprite {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = '48px sans-serif';
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.fillText(text, 0, 48);
        }
        const texture = new CanvasTexture(canvas);
        const material = new SpriteMaterial({ map: texture });
        const sprite = new Sprite(material);
        sprite.scale.set(5, 2.5, 1);
        sprite.position.copy(position.clone().add(new Vector3(0, 1.5, 0))); // Adjust position to be above the sensor
        sprite.name = `${text}Label`;
        return sprite;
    }
}
