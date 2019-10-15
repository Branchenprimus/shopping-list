var selectedListUrl = [];

/* POST Item von Textbox */

function POST() {
    var data = JSON.stringify({
        "name": document.getElementById("textarea").value
    });
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);
                GetItems(); //Funktionsaufruf für die Itemliste

            }
        }
    };

    xhr.send(null);
}
GetListHeader();
GetItems();

/*  GET Einkaufslisten Items */
function GetItems() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            var text = ""
            for (i = 0; i < Object.keys(einkaufsliste.items).length; i++) {
                text += '<li class="list-group-item">' + einkaufsliste.items[i].name + ( + '</li>') ;
            }
        }
        text += ""
        document.getElementById('items').innerHTML = text;
        document.getElementById('quantity').innerHTML= Object.keys(einkaufsliste.items).length + 1;
    });
    xhr.open("GET",
        "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6");
    xhr.send(data);


}

// /* GET List Header */

function GetListHeader() {

    var data = JSON.stringify(false);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var listHeader = JSON.parse(this.responseText)
          
            
            document.getElementById("listname").innerHTML = listHeader.name
        }
    });
    
    xhr.open("GET", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6?ddd=d");
    xhr.setRequestHeader("content-type", "application/json");
    
    xhr.send(data);
    
}

function deleteItem(){

}
