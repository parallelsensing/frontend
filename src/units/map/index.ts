import mapboxgl from 'mapbox-gl';
import { useRouter } from 'vue-router';
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
export default class MapScene {
  _map: mapboxgl.Map;
  _mapcenter: [number, number];
  _markers: mapboxgl.Marker[];
  constructor(map: mapboxgl.Map, destArrays: any) {
    this._mapcenter = [116.3262, 39.978041];
    this._map = map;
    this._map.setCenter(this._mapcenter);
    this._map.setZoom(5);
    this._map.setPitch(62);
    this._map.setBearing(-20);
    this._markers = this.addDestinationMarkers(destArrays);
  }
  flyTo = (center: [number, number]) => {
    this._map.flyTo({
      center: center,
      zoom: 17.1, // starting zoom
      pitch: 62, // starting pitch
      bearing: -20, // starting bearing
      speed: 1.5, // 动画速度
      curve: 1 // 动画曲线
      // easing:
    });
  };
  //为目的地添加marker
  addDestinationMarkers = (DestArray: any) => {
    const destMarkers = [];
    for (let i = 0; i < DestArray.length; i++) {
      const destMarker = new mapboxgl.Marker();
      destMarker.setLngLat(DestArray[i].LngLat).addTo(this._map);
      destMarkers.push(destMarker);
    }
    return destMarkers;
  };
  addMarkerInfo = (markerInfoArray: HTMLElement[]) => {
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].getElement().addEventListener('mouseover', (e) => {
        markerInfoArray[i].style.display = 'block';
        markerInfoArray[i].style.left = e.pageX + 10 + 'px'; // 位置调整
        markerInfoArray[i].style.top = e.pageY + 10 + 'px'; // 位置调整
      });

      this._markers[i].getElement().addEventListener('mouseout', function () {
        markerInfoArray[i].style.display = 'none';
      });
    }
  };
  goToDist = () => {
    for (let i = 0; i < this._markers.length; i++) {
      const marker = this._markers[i];
      const markerCenter = marker.getLngLat();
      this._markers[i].getElement().addEventListener('click', () => {
         this.flyTo([markerCenter.lng,markerCenter.lat])
      });
    }
  };
  toPlatformPage = () => {
    const router = useRouter();
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].getElement().addEventListener('dblclick', function () {
        router.push('/platform');
      });
    }
  };
}
