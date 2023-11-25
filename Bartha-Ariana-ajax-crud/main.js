import "./style.css";

const api_url = "https://retoolapi.dev/T4Mjdu/productOrder";
//const api_url = "https://retoolapi.dev/ygiOOo/data";

document.addEventListener("DOMContentLoaded", () => {
  const ordersForm = document.getElementById("ordersForm");
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetForm);
  ordersForm.addEventListener("submit", handleSubmit);
  listOrders();
});

function handleSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const product = document.getElementById('product').value;
  const date = document.getElementById('dateOfOrder').value;
  const status = document.getElementById('status').value;
  const order = {
    name: name,
    email: email,
    product: product,
    date: date,
    status: status
  };
  if (id == "") {
    addOrder(order);
  } else {
    updateOrder(id, order);
  }
}

async function updateOrder(id, order) {
  const response = await fetch(`${api_url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    resetForm();
    listOrders();
  }
}

async function addOrder(order) {
  console.log(JSON.stringify(order));
  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    listOrders();
    resetForm();
  }
}

/*async function addOrder(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const product = document.getElementById('product').value;
  const date = document.getElementById('dateOfOrder').value;
  const status = document.getElementById('status').value;
  const order = {
    name: name,
    email: email,
    product: product,
    date: date,
    status: status
  };
  console.log(order);
  console.log(JSON.stringify(order));

  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    listOrders();
    resetForm();

  }
}*/

function resetForm() {
  document.getElementById('id').value = "";
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('product').value = "";
  document.getElementById('dateOfOrder').value = "";
  document.getElementById('status').value = "";
  document.getElementById('updateButton').classList.add('hide');
  document.getElementById('submitButton').classList.remove('hide');
}

async function deleteOrder(id) {
  const response = await fetch(`${api_url}/${id}`, { method: "DELETE" });
  if (response.ok) {
    listOrders();
  }
}

async function fillUpdateOrder(id) {
  const response = await fetch(`${api_url}/${id}`);
  if (!response.ok) {
    alert("An error occured while loading content.");
    return;
  }
  const order = await response.json();
  document.getElementById("id").value = order.id;
  document.getElementById("name").value = order.name;
  document.getElementById("email").value = order.email;
  document.getElementById("product").value = order.product;
  document.getElementById("dateOfOrder").value = order.date_of_order;
  document.getElementById("status").value = order.delivery_status;
  document.getElementById("submitButton").classList.add('hide');
  document.getElementById("updateButton").classList.remove('hide');
}

function listOrders() {
  const ordersTable = document.getElementById("ordersTable");
  fetch(api_url).then(httpResponse => httpResponse.json())
    .then(responseBody => {
      ordersTable.innerHTML = "";
      responseBody.forEach(order => {
        const tableRow = document.createElement("tr");
        const idTableData = document.createElement("td");
        const nameTableData = document.createElement("td");
        const emailTableData = document.createElement("td");
        const productTableData = document.createElement("td");
        const dateOfOrderTableData = document.createElement("td");
        const statusTableData = document.createElement("td");

        const actionsTableData = document.createElement("td");
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update order";
        updateButton.addEventListener("click", () => fillUpdateOrder(order.id));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete order";
        deleteButton.addEventListener("click", () => deleteOrder(order.id));
        actionsTableData.appendChild(updateButton)
        actionsTableData.appendChild(deleteButton)

        idTableData.textContent = order.id;
        nameTableData.textContent = order.name;
        emailTableData.textContent = order.email;
        productTableData.textContent = order.product;
        dateOfOrderTableData.textContent = order.date_of_order;
        statusTableData.textContent = order.delivery_status;
        tableRow.appendChild(idTableData);
        tableRow.appendChild(nameTableData);
        tableRow.appendChild(emailTableData);
        tableRow.appendChild(productTableData);
        tableRow.appendChild(dateOfOrderTableData);
        tableRow.appendChild(statusTableData);
        tableRow.appendChild(actionsTableData);
        ordersTable.appendChild(tableRow);
      });
    });
}