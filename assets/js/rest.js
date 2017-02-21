var RestModule = function () {

    function rest(method, url, params, callback) {

        // Opening request
        let request = new XMLHttpRequest();
        request.open(method, url, true);

        if (method == 'POST') {
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        // handling request onload
        request.onload = function onload() {
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
        let newPayload = objToParams(params);
        console.log('params in request: ' + newPayload);
        request.send(newPayload);
    };

    function getByKey(json, key) {
        let found;
        for (let i = 0; i < json.length; i++) {
            let obj = json[i];
            if (obj[key] !== null) {
                found = obj[key];
                break;
            }
        }

        if (Array.isArray(found)) {
          let tempFound = '';
          for (let i = 0; i < found.length; i++) {
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

function objToParams(obj) {
    var paramString = '';
    for (var key in obj) {
        var value = obj[key];
        if(obj[key] instanceof Array || obj[key] instanceof Object){
            value = encodeURIComponent(JSON.stringify(value));
        }
        if (paramString != "") paramString += "&";
        paramString += key + "=" + encodeURIComponent(value);
    }
    return paramString;
}

export {RestModule};
