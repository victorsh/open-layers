import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM({ name: 'tileWMS' })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const layer = new TileLayer({
  source: new TileWMS({
    projection: 'EPSG:4326', // here is the source projection
    url: 'https://ahocevar.com/geoserver/wms',
    params: {
      'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
    },
    wv: { name: 'tileWMS' }
  })
})
map.addLayer(layer)

window.addEventListener("load", (event) => {
  const layers = map.getAllLayers()
  for (const l of layers) {
    if (l.ol_uid === "24") {
      const opacity = localStorage.getItem('opacity')
      console.log(opacity)
      if (typeof opacity !== undefined) {
        l.setOpacity(Number(opacity))
      }
    }
  }

  document.getElementById('opacity-slider').oninput = (e) => {
    const opacity = (Number(e.target.value) / 100).toFixed(2)
    console.log('input opacity:', opacity)
    const layers = map.getAllLayers()
    for (const l of layers) {
      if (l.ol_uid === "24") {
        l.setOpacity(Number(opacity))
        console.log('state opacity:', l.state_.opacity)
        localStorage.setItem('opacity', opacity)
      }
    }
  };

  document.getElementById('opacity-slider').value = localStorage.getItem('opacity') * 100;
});
