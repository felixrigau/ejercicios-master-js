function getBookList() {
    
    var url = "https://api.nytimes.com/svc/books/v3/lists.json";
    
    var params = {
      'api-key': "5b4c3f4bf57b49729ed543e0755a05b8",
      'list': "Hardcover-Fiction"
    };
    
    url += '?';
    
    for (var prop in params) {
        url += prop+"="+params[prop]+"&";
    }

    url = url.substring(0, url.length-1);

    var json = makeRequest("GET",url,false);
    console.table(json.results);
    
}

function makeRequest(httpMethod, url, asynchronous) {

    var request = new XMLHttpRequest();
    request.open(httpMethod,url, asynchronous);
    request.send(null);

    if (request.readyState == 4 && request.status >= 200 && request.status < 300 && request.responseText ) {
    	return JSON.parse(request.responseText);
	}else{
	    return false;
    }

}