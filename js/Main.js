function init(){
	var map = new L.Map("map");
	
	/* Tilestream Layer example: */
	var landshadeUrl = "/tiles/v2/landShade/{z}/{x}/{y}.png",
		landshade = new L.TileLayer(landshadeUrl, {maxZoom: 12}); 
	
	/* ESRI tiled service example: */
	/* var natGeoLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");*/
	//var worldTransportation = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer");
	//var worldImagery = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
	//var worldBoundaries = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
	
	// Cloudmade / OpenStreetMap tiled layer
	/*var cmUrl = 'http://{s}.tile.cloudmade.com/f7d28795be6846849741b30c3e4db9a9/997/256/{z}/{x}/{y}.png',
		cmAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		cmOptions = { maxZoom: 18, attribution: cmAttribution };
	
	var cloudmade = new L.TileLayer(cmUrl, cmOptions);//, {styleId: 999});*/
	
	/*set opacity*/
	//worldTransportation.setOpacity(0.5)
	//worldBoundaries.setOpacity(1)
	
	/* Bing maps example: 
	var bingLayer = new L.TileLayer.Bing(<<Bing Maps API Key>>, "Road"); */
	
	/* WMS layer example: */
	var wmsUrl = "/geoserver/wms",
		wmsLayer = new L.TileLayer.WMS(wmsUrl, { 
			maxZoom: 10, 
			layers: "vae:azmines", 
			format: "image/png", 
			transparent: true 
		}); 
	/**/
	

/* WFS GeoJSON layer */
	var wfsLayer = new L.GeoJSON.WFS("/geoserver/wfs", "vae:aziconic", {
		pointToLayer: function(latlng) { 
			return new L.Marker(latlng, { 
				icon: new L.Icon({ 
					iconUrl:  "style/images/play.png",
					iconSize: new L.Point(24, 24), 
				}) 
			});
		},
		popupObj: new JadeContent("templates/example.jade"),
		popupOptions: { maxWidth: 1000, centered: true },
		hoverFld: "name"
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	map.setView(center, 7);
	map.addLayer(wfsLayer);
	map.addLayer(landshade);

	
	/*setTimeout(function() { 
		map.addLayer(worldBoundaries);
		setTimeout(function() {
			map.addLayer(worldTransportation);
		}, 250)
	}, 250)*/
	
	
	}