var map;
function init(){
	map = new L.Map("map");
	
	/* ESRI tiled service */
	//var imgLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
	//var boundLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
	
	// Cloudmade / OpenStreetMap tiled layer
	var cmUrl = 'http://{s}.tile.cloudmade.com/f7d28795be6846849741b30c3e4db9a9/997/256/{z}/{x}/{y}.png',
		cmAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		cmOptions = { maxZoom: 18, attribution: cmAttribution };
	
	var cloudmade = new L.TileLayer(cmUrl, cmOptions);//, {styleId: 999});
	
	/* WMS layer */
	var wmsUrl = "/geoserver/wms";
		wmsLayer = new L.TileLayer.WMS(wmsUrl, {
			maxZoom: 10, 
			layers: "vae:aziconic", 
			format: "image/png", 
			transparent: true 
		}); 
	
	/* WFS GeoJSON layer */
	var wfsLayer = new L.GeoJSON.WFS("/geoserver/wfs", "vae:aziconic", {
		pointToLayer: function(latlng) { 
			return new L.Marker(latlng, { 
				icon: new L.Icon({ 
					iconUrl: "style/images/yellow-circle.png", 
					iconSize: new L.Point(40, 40) 
				}) 
			});
		},
		popupObj: new JadeContent("templates/example.jade"),
		popupOptions: { maxWidth: 1000, centered: true },
		hoverFld: "name"
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	
	map.setView(center, 7).addLayer(cloudmade);

	/*setTimeout(function(){
		map.addLayer(boundLayer);},
		100);*/
	
	setTimeout(function(){
		map.addLayer(wmsLayer);},
		1000);
	
	map.addLayer(wfsLayer);

}