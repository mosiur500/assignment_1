let list = new Array();
let data;
let SL=1;

function deleteTableRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    console.log(i);
    document.getElementById(List).deleteRow(i);
}

function getFormData() {
    let valid = "";
    let firstName = document.getElementById("FirstName").value;
    if (firstName === "") {
        valid += "First Name ";
    }
    let lastName = document.getElementById("LastName").value;
    if (lastName === "") {
        valid += "Last Name ";
    }
    let fullName = firstName + " " + lastName;
    let id = document.getElementById("Id").value;
    if (id === "") {
        valid += "Id ";
    }
    let email = document.getElementById("Email").value;
    if (email === "") {
        valid += "Email ";
    }
    let leaveType = document.getElementById("LeaveType").value;
    if (leaveType === -1) {
        valid += "Leave Type ";
    }
    let leaveReason = document.getElementById("LeaveReason").value;
    if (leaveReason === "") {
        valid += "Leave Reason ";
    }
    let leaveStart = document.getElementById("LeaveStart").value;
    if (leaveStart === "") {
        valid += "Start Date ";
    }
    let leaveEnd = document.getElementById("LeaveEnd").value;
    if (leaveEnd === "") {
        valid += "End Date ";
    }
    let src = document.getElementById("ImagePreview").src;
    if(src===null) {
        valid += "Document ";
    }

    let start = new Date(leaveStart);
    let end = new Date(leaveEnd);
    let counter = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if(counter <= 0) valid += "Start Date cannot be greater than End Date ."
    let doc = "<img src=" + src + " id = \"DocumentImage\" alt=\"document\" />";
    let edit = "<img class=\"icon\" id = \"edit\" src=\"image/edit.png\" alt=\"edit\"></img>";
    let del = "<img class=\"icon\"  id = \"delete\" onclick=\"deleteTableRow(this)\" src=\"image/delete.png\" alt=\"delete\"></img>";

    if (valid === "") {
        data = new Object();
        data.id = id;
        data.email = email;
        data.name = fullName;
        data.type = leaveType;
        data.reason = leaveReason;
        data.from = leaveStart;
        data.to = leaveEnd;
        data.count = counter;
        data.doc = doc;
        data.edit = edit;
        data.del = del;
        data.sl = SL;
        SL=SL+1;

        list.push(data);
        print();
        document.getElementById("form").reset();
        mainPage();
    }else {
        alert(' required!!!   :' + valid);
        console.log(valid);
    }
}



function print() {

    // reset
    let table = document.getElementById("List");
    for(let i=1;i<table.rows.length;i++) {
        table.deleteRow(i);
    }

    // update
    for(var i=0; i<list.length;i++) {
        let newRow = table.insertRow(table.rows.length);
        for (var j = 0; j < Object.keys(data).length-1; j++) {
            var cell = newRow.insertCell();
            cell.innerHTML = list[i][Object.keys(data)[j]];
        }
    }
}


function requestPage() {
    document.getElementById("LeaveFormPage").style.visibility = "visible";
    document.getElementById("MainPage").style.visibility = "hidden";
    document.getElementById("List").style.visibility = "hidden";
    return;
}

function mainPage() {
    document.getElementById("LeaveFormPage").style.visibility = "hidden";
    document.getElementById("MainPage").style.visibility = "visible";
    document.getElementById("ImagePreview").style.visibility = "hidden";
    if (document.getElementById("List").rows.length == 1)
        document.getElementById("List").style.visibility = "hidden";
    else
        document.getElementById("List").style.visibility = "visible";
    scroll(0, 0);
    return;
}

function loadFile(event) {
    let image = document.getElementById("ImagePreview");
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById("ImagePreview").style.visibility = "visible";
    return;
};

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortData(){
    let key = document.getElementById("SortBy").value;
    list.sort(dynamicSort(key));
    print();
}

function Search() {
    let input = document.getElementById("SearchQuery");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("List");
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}