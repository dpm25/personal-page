var RestModule = function() {
    //console.log('Inside the RestModule!');

    function rest(method, url, params, callback) {

        // Opening request
        var request = new XMLHttpRequest();
        request.open(method, url);

        if (method == 'POST') {
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        // handling request onload
        request.onload = function onload() {
            var json = {};
            if (request.status >= 200 && request.status < 400) {
                // Success!
                callback(null, request.responseText);
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
        rest: rest,
        getByKey: getByKey
    }
};

export { RestModule };
