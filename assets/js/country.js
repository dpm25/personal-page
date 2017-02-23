import { RestModule } from './rest'

(function() {
    let basic_choropleth = new Datamap({
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
    let listSubUnits = document.querySelectorAll('[class*="datamaps-subunit"]');
    for (let i = 0; i < listSubUnits.length; i++) {

        listSubUnits[i].addEventListener('mousemove', function(e) {
            e.stopPropagation();
            let countryCode = e.target.className.baseVal.split(" ")[1];
            let restModule = new RestModule();
            restModule.get('https://restcountries.eu/rest/v1/alpha?codes=' + countryCode, (err, response) =>  {
              let hoverinfo = document.getElementsByClassName('hoverinfo')[0];

              if (err) {
                console.log('Error fetching data from rest countries!');
                hoverinfo.innerHTML = '<strong>Oops...error fetching data from rest countries! </strong>';
              } else {
                let parsedJSON = JSON.parse(response);

                let jsonFetch = {
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
