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
        ordersTable.appendChild(tableRow);
      });
    });
}