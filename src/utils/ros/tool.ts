import * as ROS3D from 'ros3d'
import mockMsg from  "./data1";





const drawDemo = (cloudPointObj:ROS3D.PointCloud2)=>{
  // let multiNum = 1;//倍数，原始测试数据 data2 57654*32
  console.log("drawDemo %o", cloudPointObj);
  const msg = mockMsg;
  const uint8Arr = new Uint8Array(msg.data.length);
  // for (var n = 0; n < multiNum; n++) {
    for (let i = 0; i < msg.data.length; i++) {
      const nnBase = msg.data.length ; //倍数基准点
      uint8Arr[nnBase + i] = msg.data[i];
        if (i > msg.point_step && (i % msg.point_step) - 1 === 0) {
          const subBase = nnBase + i - msg.point_step;
          uint8Arr[subBase + 4] = uint8Arr[subBase + 4] + 30 ; //y
          uint8Arr[subBase + 5] = uint8Arr[subBase + 5] + 30 ;
          uint8Arr[subBase + 7] = uint8Arr[subBase + 7] + 30 ;
          uint8Arr[subBase + 16] = uint8Arr[subBase + 16] + 10; //B
        }
      uint8Arr[nnBase];
    }
    // }
  msg.data = Array.from(uint8Arr) as number[];
  msg.width = msg.data.length / msg.point_step;
 
  cloudPointObj.processMessage(msg);
  
}
export {drawDemo}


