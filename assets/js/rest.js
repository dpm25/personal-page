var RestModule = function() {
    //console.log('Inside the RestModule!');

    function rest(method, url, params, callback) {

        // Opening request
        var request = new XMLHttpRequest();
        request.open(method, url);

        // handling request onload
        request.onload = function onload() {
            var json = {};
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var parsedJSON = JSON.parse(request.responseText);
                var jsonFetch = {
                  'name': getByKey(parsedJSON, 'name'),
                  'topLevelDomains': getByKey(parsedJSON, 'topLevelDomain'),
                  'callingCodes': getByKey(parsedJSON, 'callingCodes')
                }
                callback(null, jsonFetch);
            } else {
              callback('Error occured reaching server', null);
            }
        };

        // handling request on error
        request.onerror = function() {
          callback('Fatal error occured!', null);
        };

        // sending request
        request.send(params);
    };

    function getByKey(json, key) {
        var found;
        for (var i = 0; i < json.length; i++) {
            var obj = json[i];
            if (obj[key] !== null) {
                found = obj[key];
                break;
            }
        }

        if (Array.isArray(found)) {
          var tempFound = '';
          for (var i = 0; i < found.length; i++) {
              tempFound += found[i] + ', ';
          }
          found = tempFound.slice(0, -2);
        }
        return found;
    }

    return {
        rest: rest
    }
};

export { RestModule };
