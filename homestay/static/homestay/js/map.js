(function (){
    let map_div = $('#map')
    let lng = map_div.attr('data-lng')
    let lat = map_div.attr('data-lat')

    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lng, lat]),
        zoom: 14
      })
    });

     var styles = {
       'geoMarker': new ol.style.Style({
         image: new ol.style.Circle({
           radius: 7,
           fill: new ol.style.Fill({color: 'black'}),
           stroke: new ol.style.Stroke({
             color: 'white', widthL: 2
           })
         })
       })
     };

     var layer = new ol.layer.Vector({
         source: new ol.source.Vector({
             features: [
                 new ol.Feature({
                   type: 'geoMarker',
                     geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
                 })
             ]
         }),
       style: function (feature) {
          return styles[feature.get('type')]
       }
     });

     map.addLayer(layer);
})();