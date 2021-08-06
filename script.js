// const api_url = "http://localhost:8966/items"
const api_url = "https://esdgroup6api.herokuapp.com/items"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].title}</td>`;
		table_data += `<td>${records[i].brand}</td>`;
		table_data += `<td>${records[i].expDate}</td>`;
		table_data += `<td>${records[i].mfdDate}</td>`;
		table_data += `<td>${records[i].stock}</td>`;
		table_data += `<td>${records[i].price}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("title").value = data.title;
		document.getElementById("brand").value = data.brand;
		document.getElementById("expDat").value = data.expDate;
		document.getElementById("mfdDate").value = data.mfdDate;
		document.getElementById("stock").value = data.stock;
		document.getElementById("price").value = data.price;
	})
}


function postData() {
	var title = document.getElementById("title").value;
	var brand = document.getElementById("brand").value;
	var expDate = document.getElementById("expDate").value;
	var mfdDate = document.getElementById("mfdDate").value;
	var stock = document.getElementById("stock").value;
	var price = document.getElementById("price").value;
	
    data = {_id: id, title: title, brand: brand, expDate: expDate, mfdDate:mfdDate,stock:stock, price:price };
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var title = document.getElementById("title").value;
	var brand = document.getElementById("brand").value;
	var mfdDate = document.getElementById("mfdDate").value;
	var expDate = document.getElementById("expDate").value;
	var stock = document.getElementById("stock").value;
	var price = document.getElementById("price").value;
	
	data = {_id: id, title: title, brand: brand, expDate: expDate, mfdDate:mfdDate,stock:stock, price:price};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}