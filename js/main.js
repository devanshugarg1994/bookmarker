var myform = document.getElementById('myForm');
myform.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteUrl").value;

    if(!validateform(siteName, siteURL)){
        return false;
    }
    // check already exist
    if(!checkAlreadyExsit(siteName, siteURL)) {
        return false;
    }
    var bookmark = {
        siteName : siteName,
        siteURL : siteURL
    }
    // check if bookmarks object exist
        if(localStorage.getItem('bookmarks') === null) {
            var bookmarks =[];
            bookmarks.push(bookmark);

            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            console.log(JSON);
        } else {
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
        fetchBookmarks();
        document.getElementById('myForm').reset();
        e.preventDefault();

    
}

function fetchBookmarks() {
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for(var i=0; i<bookmarks.length; i++) {
        var siteName = bookmarks[i].siteName;
        var siteURL = bookmarks[i].siteURL;

        bookmarksResults.innerHTML += '<div class = "well">'+         // Bootstrap class
                                       '<h3>'+siteName+                                                     
                                        '<a class = "btn btn-default" target="_blink" href="'+addhttp(siteURL)+'">Visit</a>  ' +
                                        '<a onclick ="deleteBookmark(\''+siteName+'\')" class = "btn btn-danger" href="#">Delete</a>'+

                                        '</h3>'+
                                        '</div>';
    }

}
function deleteBookmark(siteName) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i<bookmarks.length; i++) {
         if(siteName === bookmarks[i].siteName){
            bookmarks.splice( i, 1);
         }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log(siteName);
    fetchBookmarks();

}

function addhttp(siteURL) {
    if (!/^(?:f|ht)tps?\:\/\//.test(siteURL)) {
        siteURL = "http://" + siteURL;
    }
    return siteURL;
  }

function validateform(siteName, siteURL){
        // Checking for both input
        if(!siteName || !siteURL){
            alert("Please provide both siteName and siteURL");
             return false;
        }
    
        // Validating URL
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if(!siteURL.match(regex)) {
            alert("Please add valid URL");
            return false;
        }
        return true;
}

function checkAlreadyExsit(siteName, siteURL) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(i = 0 ;i<bookmarks.length; i++){
        if(siteName === bookmarks[i].siteName){
            alert("Already Exist");
            return false;
        }
        if(siteURL === bookmarks[i].siteURL) {
            alert("Given URL Already exsist with another siteName");
            return false;
        }
    }
    return true;
}