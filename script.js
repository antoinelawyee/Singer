var mymap = L.map('mapid').setView([48.866667, 2.333333], 12);
var layerGroup = L.layerGroup().addTo(mymap);





var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(mymap);

var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);



var marker = L.marker([48.866667, 2.333333], {
  markerUrl: 'http://leafletjs.com/docs/images/leaf-green.png',
  shadowUrl: 'leaf-shadow.png',
})


var circle = L.circle([48.84527837954024, 2.2616395023845515], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 500
})

var polygon = L.polygon([
    [48.866667, 2.333333],
    [48.84527837954024, 2.2616395023845515],
    [48.86564638918743, 2.3212051391601562]
])

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");



async function getData(query) {
  if(query==undefined){
    query = " ";
  }

    let url =
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=" + query + "&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type";
    let response = await fetch(url);
  
    let data = await response.json();

    layerGroup.clearLayers();

    data.records.forEach(function(event) {
      // le titre de l'événement
      let title = event.fields.title;
      //l'adresse de l'évènement
      let rue = event.fields.address_street;
      let ville = event.fields.address_city;
      let code_postale = event.fields.address_zipcode;
      let date = event.fields.date_start;
      let contact = event.fields.contact_name;
      let image = event.fields.cover_url;

      
      // on vérifie que l'événement a bien le champs 'lat_lon'
      if(event.fields.lat_lon) {
  
        // si oui, on ajoute le marqueur
        
        // julien : ce code est bien, tu ajoute le marqueur à la carte
     
        // si oui, on ajoute le marqueur
        marker = L.marker(event.fields.lat_lon)
        marker.bindPopup( title + "<br> "+  ville  +" "+ code_postale +"<br> "+ rue +"<br> "+ contact +"<br> "+ date +"<br> "+ '<img style="width:100%" url=https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215__180.png">')
        .addTo(layerGroup);


        // la latitude
        let latitude = event.fields.lat_lon[0];
        // la longitude
        let longitude = event.fields.lat_lon[1];
    
            // pour tester, on les affiche dans la console
            console.log(title + " " + latitude + " " + longitude)
                 
      }
  
    });
  }
  getData();

  function onFormSubmit(event){
    event.preventDefault();
    console.log(searchInput.value);
    let query = searchInput.value;

    getData(searchInput.value)
   // if(query == searchInput.value)
    //"https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type" + query;
    //alert('coucou');

    //getData(searchInput.value);
    //si get data(query) n'est pas vide, insérer la valeur dans le texte (url)
    //console.log(category);
  }


  

  document.getElementById('change').addEventListener('click', function() {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
 
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        minZoom: 0,
        maxZoom: 20,
    }).addTo(mymap);
    var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);
  });


    document.getElementById('change2').addEventListener('click', function() {
      // Fly to a random location by offsetting the point -74.50, 40
      // by up to 5 degrees.
      var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    }).addTo(mymap);
      var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);
    });

    //changer la classe css bottom mode sombre/clair