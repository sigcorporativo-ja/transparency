# M.plugin.Transparency

Plugin que permite aplicar un efecto de transparencia a la capa seleccionada.

![Imagen1](../img/transparency_1.png)

# Dependencias

- transparency.ol.min.js
- transparency.ol.min.css


```html
 <link href="../../plugins/transparency/transparency.ol.min.css" rel="stylesheet" />
 <script type="text/javascript" src="../../plugins/transparency/transparency.ol.min.js"></script>
```

# Parámetros

- El constructor se inicializa con un JSON de options con los siguientes atributos:

- **layer**. Parámetro obligatorio. Array que puede contener el/los nombre/s de la/s capa/s (que está/n en el mapa), la/s url en formato mapea para insertar una capa a través de servicios WMS ó WMTS, o la capa como objeto.
  A esta/s capa/s se le aplicará el efecto de transparencia.

- **position**. Indica la posición donde se mostrará el plugin.
  - 'TL':top left
  - 'TR':top right (default)
  - 'BL':bottom left
  - 'BR':bottom right

- **radius**. Campo numérico que modifica el radio del efecto transparencia. Tiene un rango entre 30 y 200.

- **border**. Muestra un borde alrededor del radio. Su valor por defecto es *true*.

- **borderColor**. Indica el color que tendrá el border del radio. Su valor por defecto es *'white'*.

# Ejemplos de uso

## Ejemplo 1
Insertar una capa a través de un servicio WMS. La URL en formato mapea sigue la siguiente estructura:
  - Servicio,Leyenda,URL,Nombre. Separados por "*".
```javascript
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['WMS*IGN*http://www.ign.es/wms-inspire/ign-base*IGNBaseTodo'],
  collapsible: false
});

   map.addPlugin(mp);
```

## Ejemplo 2
Insertar dos capas a través de servicio WMS.
```javascript
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['WMS*Redes*http://www.ideandalucia.es/wms/mta400v_2008?*Redes_energeticas', 'WMS*IGN*http://www.ign.es/wms-inspire/ign-base*IGNBaseTodo'],
  border: false,
});

   map.addPlugin(mp);
```

## Ejemplo 3
Insertar una capa WMS por nombre.
```javascript
const wms = new M.layer.WMS({
  url: 'http://www.ign.es/wms-inspire/unidades-administrativas?',
  name: 'AU.AdministrativeBoundary',
  legend: 'Limite administrativo',
  tiled: false,
}, {});
map,addWMS(wms);
const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['AU.AdministrativeBoundary'],
  border: true,
  borderColor: 'red';
});

   map.addPlugin(mp);
```

## Ejemplo 4
Insertar una capa WMS como objeto.
```javascript
const wms = new M.layer.WMS({
  url: 'http://www.ign.es/wms-inspire/unidades-administrativas?',
  name: 'AU.AdministrativeBoundary',
  legend: 'Limite administrativo',
  tiled: false,
}, {});
map,addWMS(wms);
const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: [wms],
});

   map.addPlugin(mp);
```

## Ejemplo 5
Insertar una capa a través de servicio WMTS.
```javascript
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['WMTS*http://www.ign.es/wmts/pnoa-ma?*OI.OrthoimageCoverage*EPSG:25830*PNOA']
});

   map.addPlugin(mp);
```

## Ejemplo 6
Insertar una capa WMTS por nombre.
```javascript
let wmts = new M.layer.WMTS({
  url: "http://www.ideandalucia.es/geowebcache/service/wmts",
  name: "toporaster",
  matrixSet: "EPSG:25830",
  legend: "Toporaster"
}, {
  format: 'image/png'
});
map.addWMTS(wmts);
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['toporaster'],
});

   map.addPlugin(mp);
```

## Ejemplo 7
Insertar una capa WMTS como objeto.
```javascript
let wmts = new M.layer.WMTS({
  url: "http://www.ideandalucia.es/geowebcache/service/wmts",
  name: "toporaster",
  matrixSet: "EPSG:25830",
  legend: "Toporaster"
}, {
  format: 'image/png'
});
map.addWMTS(wmts);
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: [wmts],
});

   map.addPlugin(mp);
```

## Ejemplo 8
Especificar radio
```javascript
let wmts = new M.layer.WMTS({
  url: "http://www.ideandalucia.es/geowebcache/service/wmts",
  name: "toporaster",
  matrixSet: "EPSG:25830",
  legend: "Toporaster"
}, {
  format: 'image/png'
});
map.addWMTS(wmts);
  const mp = new M.plugin.Transparency({
  position: 'TL',
  layers: ['toporaster'],
  radius: 200
});

   map.addPlugin(mp);
```
