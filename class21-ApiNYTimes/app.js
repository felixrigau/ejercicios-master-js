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

function showBookList(booksList) {
    
    var titleList = document.querySelector(".title");
    titleList.innerText += " "+booksList[0].list_name;
    
    var books = document.querySelector('.books'),
        li,
        element,
        title,
        rank,
        urlImage,
        week,
        description,
        urlBuy;
    for (var i = 0; i < booksList.length; i++) {
        
        element = booksList[i];
        title = element.book_details[0].title;
        rank = element.rank.toString();
        urlImage = element.isbns[element.isbns.length-1].isbn13;
        week = element.weeks_on_list;
        description = element.book_details[0].description;
        urlBuy = element.amazon_product_url;
        
        li = "<li class=\"book\">" +
                "<h3 class=\"title\">"+"#"+rank.toUpperCase()+" "+title.toUpperCase()+"</h3>" +
                "<img src=\"https://s1.nyt.com/du/books/images/"+urlImage+".jpg\" "+"class=\"image\">" +
                "<p class=\"weeks\">Weeks on list: "+week+"</p>" +
                "<p class=\"description\">"+description+"</p>" +
                "<a href=\""+urlBuy+"\">BUY AT AMAZON</a>" +
             "</li>";
        
        books.innerHTML += li;
        
    }
    
}

(function () {
    getBookList();
})();