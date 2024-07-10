declare module '@/utils/ros/ros3d.esm.js' {
  export class Viewer {
      constructor(options: ViewerOptions);
  }

  export class PointCloud2 {
      constructor(options: PointCloud2Options);
  }

  interface ViewerOptions {
      divID: string;
      width: number;
      height: number;
      background?: number;
  }

  interface PointCloud2Options {
      ros: any;
      topic: string;
      tfClient: any;
      rootObject: any;
  }
}