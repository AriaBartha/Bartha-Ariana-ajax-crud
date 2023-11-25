import "./style.css";

const api_url = "https://retoolapi.dev/T4Mjdu/productOrder";

document.addEventListener("DOMContentLoaded", () => {
  const ordersForm = document.getElementById("ordersForm");
  ordersForm.addEventListener("submit", addOrder);
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetForm);
  listOrders();
});


async function addOrder(event) {
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
}

function resetForm() {
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('product').value = "";
  document.getElementById('dateOfOrder').value = "";
  document.getElementById('status').value = "";
}

async function deleteOrder(id) {
  const response = await fetch(`${api_url}/${id}`, { method: "DELETE" });
  if (response.ok) {
    listOrders();
  }
}

async function updateOrder(id) {
  const response = await fetch(`${api_url}/${id}`);
  if (!response.ok) {
    alert("An error occured while loading content.");
    return;
  }
  const orders = await response.json();
  document.getElementById("id").value = orders.id;
  document.getElementById("name").value = orders.name;
  document.getElementById("email").value = orders.email;
  document.getElementById("product").value = orders.product;
  document.getElementById("dateOfOrder").value = orders.date_of_order;
  document.getElementById("status").value = orders.delivery_status;
  document.getElementById("submitButton").classList.add('hide');
  document.getElementById("updateButton").classList.remove('hide');
}



function listOrders() {
  const ordersTable = document.getElementById("ordersTable");
  fetch(api_url).then(httpResponse => httpResponse.json())
    .then(responseBody => {
      responseBody.forEach(orders => {
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
        updateButton.addEventListener("click", () => updateOrder(orders.id));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete order";
        deleteButton.addEventListener("click", () => deleteOrder(orders.id));
        actionsTableData.appendChild(updateButton)
        actionsTableData.appendChild(deleteButton)

        idTableData.textContent = orders.id;
        nameTableData.textContent = orders.name;
        emailTableData.textContent = orders.email;
        productTableData.textContent = orders.product;
        dateOfOrderTableData.textContent = orders.date_of_order;
        statusTableData.textContent = orders.delivery_status;
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