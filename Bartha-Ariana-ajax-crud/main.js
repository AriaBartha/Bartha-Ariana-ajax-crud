import "./style.css";



const api_url = "https://retoolapi.dev/BYNwa5/productOrder";

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
  const address = document.getElementById('address').value;
  const product = document.getElementById('product').value;
  const quantity = document.getElementById('quantity').value;
  const order = {
    name: name,
    email: email,
    address: address,
    product: product,
    quantity: quantity
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


function resetForm() {
  document.getElementById('id').value = "";
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('address').value = "";
  document.getElementById('product').value = "";
  document.getElementById('quantity').value = "";
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
  document.getElementById("address").value = order.address;
  document.getElementById("product").value = order.product;
  document.getElementById("quantity").value = order.quantity;
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
        const addressTableData = document.createElement("td");
        const productTableData = document.createElement("td");
        const quantityTableData = document.createElement("td");

        const actionsTableData = document.createElement("td");
        const updateButton = document.createElement("button");
        updateButton.type = 'submit';
        updateButton.classList.add('btn', 'btn-warning');
        updateButton.textContent = "Update order";
        updateButton.addEventListener("click", () => fillUpdateOrder(order.id));
        const deleteButton = document.createElement("button");
        deleteButton.type = 'button';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = "Delete order";
        deleteButton.addEventListener("click", () => deleteOrder(order.id));
        actionsTableData.appendChild(updateButton)
        actionsTableData.appendChild(deleteButton)

        idTableData.textContent = order.id;
        nameTableData.textContent = order.name;
        emailTableData.textContent = order.email;
        addressTableData.textContent = order.address;
        productTableData.textContent = order.product;
        quantityTableData.textContent = order.quantity;
        tableRow.appendChild(idTableData);
        tableRow.appendChild(nameTableData);
        tableRow.appendChild(emailTableData);
        tableRow.appendChild(addressTableData);
        tableRow.appendChild(productTableData);
        tableRow.appendChild(quantityTableData);
        tableRow.appendChild(actionsTableData);
        ordersTable.appendChild(tableRow);
      });
    });
}