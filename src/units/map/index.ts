import mapboxgl from 'mapbox-gl';
import { useRouter } from 'vue-router';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
export default class MapScene {
  _map: mapboxgl.Map;
  _marker: mapboxgl.Marker;
  _mapcenter: [number, number];
  constructor(map: mapboxgl.Map) {
    this._mapcenter = [116.3262, 39.978041];
    this._map = map;
    this._map.setCenter(this._mapcenter);
    this._map.setZoom(5);
    this._map.setPitch(62);
    this._map.setBearing(-20);
    this._marker = new mapboxgl.Marker();
    this._marker.setLngLat(this._mapcenter).addTo(this._map);
  }
  getMapContainer = () => {
    this._map.getContainer;
  };
  flyTo = () => {
    this._map.flyTo({
      center: [116.3262, 39.978041],
      zoom: 17.1, // starting zoom
      pitch: 62, // starting pitch
      bearing: -20, // starting bearing
      speed: 1.5, // 动画速度
      curve: 1 // 动画曲线
      // easing:
    });
  };

  toPlatformPage = () => {
    const router = useRouter();
    this._marker.getElement().addEventListener('click', function () {
      router.push('/platform');
    });
  };

  addMarkerInfo = (markerInfo: HTMLElement) => {
    this._marker.getElement().addEventListener('mouseover', (e) => {
      markerInfo.style.display = 'block';
      markerInfo.style.left = e.pageX + 10 + 'px'; // 位置调整
      markerInfo.style.top = e.pageY + 10 + 'px'; // 位置调整
    });
    this._marker.getElement().addEventListener('mouseout', function () {
      markerInfo.style.display = 'none';
    });
  };
}
