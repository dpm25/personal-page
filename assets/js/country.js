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
            restModule.rest('GET', 'https://restcountries.eu/rest/v1/alpha?codes=' + countryCode, null, (err, response) =>  {
              var hoverinfo = document.getElementsByClassName('hoverinfo')[0];

              if (err) {
                console.log('Error fetching data from rest countries!');
                hoverinfo.innerHTML = '<strong>Oops...error fetching data from rest countries! </strong>';
              } else {
                var parsedJSON = JSON.parse(response);

                var jsonFetch = {
                  'name': restModule.getByKey(parsedJSON, 'name'),
                  'topLevelDomains': restModule.getByKey(parsedJSON, 'topLevelDomain'),
                  'callingCodes': restModule.getByKey(parsedJSON, 'callingCodes')
                }
                hoverinfo.innerHTML = '<strong>Country: </strong>' + jsonFetch.name + '<br/>' +
                                      '<strong>Domains: </strong>' + jsonFetch.topLevelDomains + '<br/>' +
                                      '<strong>Calling Codes: </strong>' + jsonFetch.callingCodes;
              }
            });
        });
    }
})();
