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

    makeRequest("GET",url,false,showBookList);
    
}

function makeRequest(httpMethod, url, asynchronous, callback) {

    var request = new XMLHttpRequest();
    request.open(httpMethod,url, asynchronous);
    request.onreadystatechange = function () {
    
    if (request.readyState == 4 && request.status >= 200 && request.status < 300 && request.responseText ) {
        var json = JSON.parse(request.responseText);
        var books = json.results;
        callback(books)
    	return true;
	}else{
	    return false;
    }
    
    };
    request.send(null);

}

function showBookList(books) {
    
    var titleList = document.querySelector(".title");
    titleList.innerText += " "+books[0].list_name;
    
    var books = document.querySelector('.books');
    
    books.foreach(function (element, index, arry) {
        li = "<li class=\"book\">" +
        
        "</li>";
        
        books.innerHTML = "<li class=\"book\"></li>";
    });
    
}

(function () {
    getBookList();
})();