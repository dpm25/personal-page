import { RestModule } from './rest'

(function() {
    var basic_choropleth = new Datamap({
        element: document.getElementById("map-view"),
        projection: 'mercator',
        geographyConfig: {
            popupTemplate: function(e) {
                return '<div class="hoverinfo" style="width:150px; height:100px;"></div>';
            }
        }
    });
})();

(function() {
    var listSubUnits = document.querySelectorAll('[class*="datamaps-subunit"]');
    for (var i = 0; i < listSubUnits.length; i++) {

        listSubUnits[i].addEventListener('mousemove', function(e) {
            e.stopPropagation();
            var countryCode = e.target.className.baseVal.split(" ")[1];
            var restModule = new RestModule();
            restModule.rest('GET', 'https://restcountries.eu/rest/v1/alpha?codes=' + countryCode, null, function(err, response) {
              if (err) {
                console.log('Error fetching data from rest countries!');
              } else {
                var hoverinfo = document.getElementsByClassName('hoverinfo')[0];
                hoverinfo.innerHTML = '<strong>Country: </strong>' + response.name + '<br/>' +
                                      '<strong>Domains: </strong>' + response.topLevelDomains + '<br/>' +
                                      '<strong>Calling Codes: </strong>' + response.callingCodes;
              }
            });
        });
    }
})();
