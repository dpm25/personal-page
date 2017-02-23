var RestModule = function () {

    function get (url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                // Success!
                callback(null, xhr.responseText);
            } else {
                callback('Error reaching server', null);
            }
        };

        // handling request on error
        xhr.onerror = function() {
            callback('Fatal error occured!', null);
        };

        xhr.send(null);

    };

    function post (url, params, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                callback(null, xhr.responseText);
            }
        };

        xhr.onerror = function () {
            callback('Fatal error', null);
        };

        // sending request
        xhr.send(objToParams(params));
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
        get: get,
        post: post,
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
