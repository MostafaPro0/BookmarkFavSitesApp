
var searchbutton = document.querySelector('#searchinput');
var submitbutton = document.querySelector('#submitbutton');
var bookmarks = [];
bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
if (bookmarks != null) {
    displayData(searchbutton.value);
}
else bookmarks = [];

function submit() {

    var bookName = document.querySelector("#bookName").value;
    var bookUrl = document.querySelector("#bookUrl").value;
    if (Checkvalidname(bookName) == false) {
        return;
    } if (Checkvalidurl(bookUrl) == false) {
        return;
    }
    var urledit = urlcheck(bookUrl);
    var bookmark = { bookname: bookName, bookurl: urledit };
    if (submitbutton.textContent == "Add") {
        bookmarks.push(bookmark);
    }
      if (submitbutton.textContent == "Edit") {
        
bookmarks.splice(editindexvalue, 1,bookmark);
        submitbutton.innerHTML = "Add";
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayData(searchbutton.value);
    clearform();
}
function clearform() {

    document.querySelector("#bookName").value = "";
    document.querySelector("#bookUrl").value = "";
}
function displayData(searchword) {
    var rows = "";
    responsearr = [];
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].bookname.indexOf(searchword) > -1) {
            responsearr.push(bookmarks[i])
        }
    }
    for (var i = 0; i < responsearr.length; i++) {
        rows +=
            `
        <div id="bookmarkList" class="column py-2 text-bg-light">
            <div class="col-6 d-flex align-items-center align-content-center m-auto">
           
         <div class="col-6">
         <h2 class="text-start">${responsearr[i].bookname}</h2>
       </div>
       <div class="col-2">
         <a href='${responsearr[i].bookurl}' target="_blank" class="btn btn-success">Visit</a>
       </div>
       <div class="col-2">
         <a onclick="EditBookmarks('${responsearr[i].bookname}')" class="btn btn-info">Edit</a>
       </div>
     <div class="col-2">
       <a onclick="Deletebookmarks('${responsearr[i].bookname}')" class="btn btn-danger">Delete</a>
     </div>
     </div>
     </div>
        `;
    }
    tablestyle = document.querySelector('.tablemo');
    tablestyle.style.display = "block";

    document.getElementById('rowsmo').innerHTML = rows;
}
var editvalue = "";
var editindexvalue = "";
function EditBookmarks(old) {
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].bookname == old) {
            editvalue = old;
            editindexvalue = i;
            document.querySelector("#bookName").value = editvalue;
            document.querySelector("#bookUrl").value = bookmarks[i].bookurl;
            submitbutton.innerHTML = "Edit";
        }
    }
}
function Deletebookmarks(name) {
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].bookname == name) {
            bookmarks.splice(i, 1);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayData(searchbutton.value);
        }
    }
}

function urlcheck(url) {
    return url = (url.indexOf('://') === -1) ? 'http://' + url : url;
}

function Checkvalidname(bookNamecheck) {

    if (bookNamecheck.length == 0) {
        nameerror(false, 'empty');
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if ((bookmarks[i].bookname != bookNamecheck) == true) {

            nameerror(true, '');
        }
        else {
            nameerror(false, '');
            return false;
        }
    }
    return true;
}
function Checkvalidurl(bookurlcheck) {

    if (bookurlcheck.length == 0) {
        urlerror(false, 'empty');
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if ((bookmarks[i].bookurl != bookurlcheck) == true) {

            urlerror(true, '');
        }
        else {
            urlerror(false, '');
            return false;
        }
    }
    return true;
}
function nameerror(value, error) {
    var icon = "";
    var texterror = "";
    if (value == true) {
        icon = ` <img class="bookmarknameimg" src="./images/correct.png" alt="" style="display:inline">`;
        texterror = "";
        document.querySelector(".namemo").innerHTML = icon;
        document.querySelector(".errornamemo").innerHTML = texterror;
    }
    if (value == false && error.length == 0) {
        icon = ` <img class="bookmarknameimg" src="./images/cancel.png" alt="" style="display:inline">`;
        texterror = "<h2 class='text-danger'>Bookmark Name is Already Exist</h2>"
        document.querySelector(".namemo").innerHTML = icon;
        document.querySelector(".errornamemo").innerHTML = texterror;
    }
    if (value == false && error.length != 0) {
        icon = ` <img class="bookmarknameimg" src="./images/cancel.png" alt="" style="display:inline">`;
        texterror = "<h2 class='text-danger'>Bookmark Name is Empty</h2>"
        document.querySelector(".namemo").innerHTML = icon;
        document.querySelector(".errornamemo").innerHTML = texterror;
    }
}
function urlerror(value, error) {
    var icon = "";
    var texterror = "";
    if (value == true) {
        icon = ` <img class="bookmarkurlimg" src="./images/correct.png" alt="" style="display:inline">`;
        texterror = "";
        document.querySelector(".urlmo").innerHTML = icon;
        document.querySelector(".errorurlmo").innerHTML = texterror;
    }
    if (value == false && error.length == 0) {
        icon = ` <img class="bookmarkurlimg" src="./images/cancel.png" alt="" style="display:inline">`;
        texterror = "<h2 class='text-danger'>Bookmark url is Already Exist</h2>"
        document.querySelector(".urlmo").innerHTML = icon;
        document.querySelector(".errorurlmo").innerHTML = texterror;
    }
    if (value == false && error.length != 0) {
        icon = ` <img class="bookmarkurlimg" src="./images/cancel.png" alt="" style="display:inline">`;
        texterror = "<h2 class='text-danger'>Bookmark url is Empty</h2>"
        document.querySelector(".urlmo").innerHTML = icon;
        document.querySelector(".errorurlmo").innerHTML = texterror;
    }
}
