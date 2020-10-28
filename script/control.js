let list = new Array();
let data;
let sl = 0;

function deleteTableRow(row, sl) {
    //* delete from table
    let table = document.getElementById('List').getElementsByTagName('tbody')[0];
    let currentRow = row.parentElement.parentElement;
    table.deleteRow(currentRow);
    //* delete from data structure
    let removeIndex = list.map(function (item) { return item.sl; }).indexOf(sl);
    list.splice(removeIndex, 1);
    showListPage();
}

function editTableRow(row, sl) {
    let editIndex = list.map(function (item) { return item.sl; }).indexOf(sl);
    document.getElementById('FirstName').value = list[editIndex].firstName;
    document.getElementById('LastName').value = list[editIndex].lastName;
    document.getElementById('Id').value = list[editIndex].id;
    document.getElementById('Email').value = list[editIndex].email;
    document.getElementById('LeaveType').value = list[editIndex].type;
    document.getElementById('LeaveReason').value = list[editIndex].reason;
    document.getElementById('LeaveStart').value = list[editIndex].from;
    document.getElementById('LeaveEnd').value = list[editIndex].to;
    document.getElementById('ImagePreview').value = list[editIndex].src;
    document.getElementById('ImagePreview').style.visibility="visible";
    list.splice(editIndex, 1);
    showFormPage();
}

function getFormData() {
    let emptyInput = "";
    let firstName = document.getElementById("FirstName").value;
    if (firstName === "") {
        emptyInput += "First Name ";
    }
    let lastName = document.getElementById("LastName").value;
    if (lastName === "") {
        emptyInput += "Last Name ";
    }
    let fullName = firstName + " " + lastName;
    let id = document.getElementById("Id").value;
    if (id === "") {
        emptyInput += "Id ";
    }
    let email = document.getElementById("Email").value;
    if (email === "") {
        emptyInput += "Email ";
    }
    let leaveType = document.getElementById("LeaveType").value;
    if (leaveType === "-1") {
        emptyInput += "Leave Type ";
    }
    let leaveReason = document.getElementById("LeaveReason").value;
    if (leaveReason === "") {
        emptyInput += "Leave Reason ";
    }
    let leaveStart = document.getElementById("LeaveStart").value;
    if (leaveStart === "") {
        emptyInput += "Start Date ";
    }
    let leaveEnd = document.getElementById("LeaveEnd").value;
    if (leaveEnd === "") {
        emptyInput += "End Date ";
    }
    let src = document.getElementById("ImagePreview").src;
    if (src == null) {
        emptyInput += "Document ";
    }

    let start = new Date(leaveStart);
    let end = new Date(leaveEnd);
    let counter = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (counter <= 0) emptyInput += "Start Date cannot be greater than End Date ."
    let doc = "<img src=" + src + " class = \"doc-image\" alt=\"document\" />";
    let edit = "<img class=\"icon\" class = \"icon\" onclick=\"editTableRow(this," + sl + ")\" src=\"image/edit.png\"  alt=\"edit\"></img>";
    let del = "<img class=\"icon\"  class = \"icon\" onclick=\"deleteTableRow(this," + sl + ")\" src=\"image/delete.png\" alt=\"delete\"></img>";
    if (emptyInput === "") {
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
        data.sl = sl;
        data.firstName = firstName;
        data.lastName = lastName;
        sl = sl + 1;
        list.push(data);
        document.getElementById("form").reset();
        showListPage();
    } else {
        alert(' required!!!   : ' + emptyInput);
        console.log(emptyInput);
    }
}

function showTableData() {
    //reset
    let table = document.getElementById("List");
    let body = table.getElementsByTagName('tbody')[0];
    body.innerHTML = "";
    //update
    for (var i = 0; i < list.length; i++) {
        let newRow = body.insertRow(table.length);
        for (var j = 0; j < Object.keys(data).length - 3; j++) {
            var cell = newRow.insertCell();
            cell.innerHTML = list[i][Object.keys(data)[j]];
        }
    }
}

function showFormPage() {
    document.getElementById("FormPage").style.visibility = "visible";
    document.getElementById("ListPage").style.visibility = "hidden";
    document.getElementById("List").style.visibility = "hidden";
    scroll(0, 0);
    return;
}

function showListPage() {
    showTableData();
    document.getElementById("FormPage").style.visibility = "hidden";
    document.getElementById("ListPage").style.visibility = "visible";
    document.getElementById("ImagePreview").style.visibility = "hidden";
    if (document.getElementById("List").rows.length == 1)
        document.getElementById("List").style.visibility = "hidden";
    else {
        document.getElementById("List").style.visibility = "visible";
    }
    scroll(0, 0);
    return;
}

function loadFile(event) {
    let image = document.getElementById("ImagePreview");
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById("ImagePreview").style.visibility = "visible";
    return;
};

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    tBody.append(...sortedRows);
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

function sortTableData(column) {
    const tableElement = column.parentElement.parentElement.parentElement;
    const headerIndex = column.cellIndex;
    const currentIsAscending = column.classList.contains("th-sort-asc");
    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
}

function searchTableData() {
    let input = document.getElementById("SearchQuery");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("List");
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td_id = tr[i].getElementsByTagName("td")[0];
        td_name = tr[i].getElementsByTagName("td")[1];
        td_email = tr[i].getElementsByTagName("td")[2];
        if (td_id || td_name || td_email) {
            val_id = td_id.textContent || td_id.innerText;
            val_name = td_name.textContent || td_name.innerText;
            val_email = td_email.textContent || td_email.innerText;
            if ((val_id.toUpperCase().indexOf(filter) > -1) || (val_email.toUpperCase().indexOf(filter) > -1) || (val_name.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}