let list = new Array();
let sl = 0;
let data = {
    id: undefined,
    email: undefined,
    name: undefined,
    type: undefined,
    reason: undefined,
    startDate: undefined,
    endDate: undefined,
    count: undefined,
    doc: undefined,
    edit: undefined,
    del: undefined,
    sl: undefined,
    firstName: undefined,
    lastName: undefined
}

$(document).ready(function () {
    // todo: Navigate to Form Page on "Add New Request" Button click
    $("#BtnAddReq").click(function () {
        showFormPage();
    });

    // todo: Navigate to List Page on "Cancel" Button click
    $("#Cancel").click(function () {
        showListPage();
    });

    // todo: Get data from HTML Form and Push into list Array
    $("#Submit").click(function () {
        getFormData();
    });

    // todo: Search Table rows
    $("#SearchQuery").on("keyup", function () {
        let value = $(this).val().toUpperCase();
        searchTableRows(value);
    });
});

// todo: Get Form Data
function getFormData(){
    let firstName = $("#FirstName").val();
        let lastName = $("#LastName").val();
        let fullName = firstName + " " + lastName;
        let id = $("#Id").val();
        let email = $("#Email").val();
        let type = $("#LeaveType").val();
        let reason = $("#LeaveReason").val();
        let startDate = $("#LeaveStart").val();
        let endDate = $("#LeaveEnd").val();
        let docSrc = $("#ImagePreview").attr("src");
        let doc = "<img src=" + docSrc + " class = \"doc-image\" alt=\"document\" />";
        let edit = "<img class=\"icon\" class = \"icon\" onclick=\"editTableRow(this," + sl + ")\" src=\"image/edit.png\"  alt=\"edit\"></img>";
        let del = "<img class=\"icon\"  class = \"icon\" onclick=\"deleteTableRow(this," + sl + ")\" src=\"image/delete.png\" alt=\"delete\"></img>";
        let start = new Date(startDate);
        let end = new Date(endDate);
        let counter = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // todo: check for empty fields
        let validationCheck = validateInputFields(firstName, lastName, id, email, type, reason, startDate, endDate, counter, docSrc);
        if (validationCheck == "") {
            data = new Object();
            data.id = id;
            data.email = email;
            data.name = fullName;
            data.type = type;
            data.reason = reason;
            data.startDate = startDate;
            data.endDate = endDate;
            data.count = counter;
            data.doc = doc;
            data.edit = edit;
            data.del = del;
            data.sl = sl;
            data.firstName = firstName;
            data.lastName = lastName;
            sl = sl + 1;
            list.push(data);
            $("#Form")[0].reset();
            showListPage();
        } else {
            alert("Required:\n" + validationCheck);
        }
}

// todo: Delete specific table row
function deleteTableRow(row, sl) {
    //* delete from table
    let currentRow = row.parentElement.parentElement;
    $("#List tobody tr:eq(" + currentRow + ")").remove();
    //* delete from data structure
    let removeIndex = list.map(function (item) { return item.sl; }).indexOf(sl);
    list.splice(removeIndex, 1);
    showListPage();
}

// todo: Edit specific table row
function editTableRow(row, sl) {
    let editIndex = list.map(function (item) { return item.sl; }).indexOf(sl);
    $("#FirstName").val(list[editIndex].firstName);
    $("#LastName").val(list[editIndex].lastName);
    $("#Id").val(list[editIndex].id);
    $("#Email").val(list[editIndex].email);
    $("#LeaveType").val(list[editIndex].type);
    $("#LeaveReason").val(list[editIndex].reason);
    $("#LeaveStart").val(list[editIndex].startDate);
    $("#LeaveEnd").val(list[editIndex].endDate);
    $("#ImagePreview").val(list[editIndex].docSrc);
    $("#ImagePreview").css("visibility", "visible");
    list.splice(editIndex, 1);
    showFormPage();
}

// todo: Show List Page
function showListPage() {
    showTableData();
    $("#FormPage").css("visibility", "hidden");
    $("#ListPage").css("visibility", "visible");
    $("#ImagePreview").css("visibility", "hidden");
    if ($("#List tr").length == 1) {
        $("#List").css("visibility", "hidden");
    } else {
        $("#List").css("visibility", "visible");
    }
    scroll(0, 0);
}

// todo: Show Form Page
function showFormPage() {
    $("#FormPage").css("visibility", "visible");
    $("#ListPage").css("visibility", "hidden");
    $("#List").css("visibility", "hidden");
    scroll(0, 0);
}

// todo: Refresh Table Data
function showTableData() {
    // todo: clear table
    let table = $("#List");
    $("#List tbody > tr").remove();

    // todo: populate table
    let markup = "";
    for (let i = 0; i < list.length; i++) {
        markup += "<tr>"
        for (var j = 0; j < Object.keys(data).length - 3; j++) {
            markup += "<td>" + list[i][Object.keys(data)[j]] + "</td>";
        }
        markup += "</tr>";
    }
    $("#List tbody").append(markup);
}

// todo: email validation
function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

// todo: check for empty fields
function validateInputFields(firstName, lastName, id, email, type, reason, startDate, endDate, counter, docSrc) {
    let emptyFields = "";
    if (firstName === "") {
        emptyFields += "First Name\n";
    }
    if (lastName === "") {
        emptyFields += "Last Name\n";
    }
    if (id === "") {
        emptyFields += "Id\n";
    }
    if (email === "") {
        emptyFields += "Email\n";
    }
    if (type == "-1") {
        emptyFields += "Leave Type\n";
    }
    if (reason === "") {
        emptyFields += "Leave Reason\n";
    }
    if (startDate === "") {
        emptyFields += "Start Date\n";
    }
    if (endDate === "") {
        emptyFields += "End Date\n";
    }
    if (counter <= 0) {
        emptyFields += "Start Date cannot be greater than End Date\n."
    }
    if (docSrc === null) {
        emptyFields += "Document\n";
    }

    if(validateEmail(email)==false) {
        emptyFields += "Email is not valid!\n";
    }
    return emptyFields;
}

// todo: Preview Document File
function showDocumentPreview(event) {
    let image = $("#ImagePreview").attr("src", URL.createObjectURL(event.target.files[0]));
    $("#ImagePreview").css("visibility", "visible");
    return;
};

// todo: Search Table rows
function searchTableRows(value){
    $("#List tbody tr").filter(function () {
        $(this).toggle($(this).text().toUpperCase().indexOf(value) > -1)
    });
}

// todo: sort table data by column
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