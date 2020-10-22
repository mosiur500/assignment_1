function requestPage() {
	document.getElementById("LeaveFormPage").style.visibility = "visible";
	document.getElementById("MainPage").style.visibility = "hidden";
	document.getElementById("List").style.visibility = "hidden";
	return;
}

function mainPage() {
	document.getElementById("LeaveFormPage").style.visibility = "hidden";
	document.getElementById("MainPage").style.visibility = "visible";
	if (document.getElementById("List").rows.length == 1)
		document.getElementById("List").style.visibility = "hidden";
	else
		document.getElementById("List").style.visibility = "visible";
	scroll(0, 0);
	return;
}

function getFormData() {
	let fname = document.getElementById("FirstName").value;
	let lname = document.getElementById("LastName").value;
	let formName = fname + " " + lname;
	let formId = document.getElementById("Id").value;
	let formEmail = document.getElementById("Email").value;
	let formLeaveType = document.getElementById("LeaveType").value;
	let formLeaveReason = document.getElementById("LeaveReason").value;
	let formLeaveStart = document.getElementById("LeaveStart").value;
	let formLeaveEnd = document.getElementById("LeaveEnd").value;
	let formImage = document.getElementById("ImagePreview").src;
	addRequest(formId, formEmail, formName, formLeaveType, formLeaveReason, formLeaveStart, formLeaveEnd, formImage);
}

function addRequest(formId, formEmail, formName, formLeaveType, formLeaveReason, formLeaveStart, formLeaveEnd, formImage) {

	let table = document.getElementById("List");
	let rowNum = table.rows.length;
	let row = table.insertRow(rowNum);

	let id = row.insertCell(0);
	let email = row.insertCell(1);
	let name = row.insertCell(2);
	let leaveType = row.insertCell(3);
	let leaveReason = row.insertCell(4);
	let leaveStart = row.insertCell(5);
	let leaveEnd = row.insertCell(6);
	let count = row.insertCell(7);
	let doc = row.insertCell(8);
	let edit = row.insertCell(9);
	let del = row.insertCell(10);

	id.innerHTML = formId;
	email.innerHTML = formEmail;
	name.innerHTML = formName;
	leaveType.innerHTML = formLeaveType;
	leaveReason.innerHTML = formLeaveReason;
	leaveStart.innerHTML = formLeaveStart;
	leaveEnd.innerHTML = formLeaveEnd;
	count.innerHTML = "N/A"
	doc.innerHTML = "<img src=" + formImage + " id = \"DocumentImage\" alt=\"document\" />";
	edit.innerHTML = "<img class=\"icon\" src=\"image/edit.png\" alt=\"edit\"></img>";
	let delTag = document.getElementById("List").deleteRow(this.parentNode.parentNode.rowIndex);
	del.innerHTML =  "<img class=\"icon\" src=\"image/delete.png\" alt=\"delete\"  onclick:"+delTag+"></img>";
	mainPage();
}

function deleteRow(row) {
	 document.getElementById("List").deleteRow(row.parentNode.parentNode.rowIndex);

}

function daysCounter(start, end) {
	/*
	start = start.split('-'); // 2020-10-22
	end = end.split('-');

	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	let startDate = new Date(start[0], start[1], start[2]);
	let endDate = new Date(end[0],end[1],end[2]);

	let count = Math.round(Math.abs((endDate-startDate) / oneDay));
	return count;
	*/
}

function loadFile(event) {
	let image = document.getElementById("ImagePreview");
	image.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById("ImagePreview").style.visibility = "visible";
	return;
};

function Search() {
	let input, filter, table, tr, td, i, j, txtValue;
	input = document.getElementById("SearchQuery");
	filter = input.value.toUpperCase();
	table = document.getElementById("List");
	tr = table.getElementsByTagName("tr");
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