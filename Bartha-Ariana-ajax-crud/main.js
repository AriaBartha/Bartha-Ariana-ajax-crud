const api_url = "https://retoolapi.dev/J0NGgL/productOrder";

document.addEventListener("DOMContentLoaded", () => {
  listOrders();
});

function listOrders() {
  const ordersTable = document.getElementById("ordersTable");
  fetch(api_url).then(httpResponse => httpResponse.json())
    .then(responseBody => {
      responseBody.forEach(orders => {
        const tableRow = document.createElement("tr");
        const idTableData = document.createElement("td");
        const nameTableData = document.createElement("td");
        const sentTableData = document.createElement("td");
        const emailTableData = document.createElement("td");
        const productTableData = document.createElement("td");
        const dateOfOrderTableData = document.createElement("td");
        idTableData.textContent = orders.id;
        nameTableData.textContent = orders.Name;
        sentTableData.textContent = orders.Sent;
        emailTableData.textContent = orders.Email;
        productTableData.textContent = orders.Product;
        dateOfOrderTableData.textContent = orders.Date_of_order;
        tableRow.appendChild(idTableData);
        tableRow.appendChild(nameTableData);
        tableRow.appendChild(sentTableData);
        tableRow.appendChild(emailTableData);
        tableRow.appendChild(productTableData);
        tableRow.appendChild(dateOfOrderTableData);
        ordersTable.appendChild(tableRow);
      });
    });
}