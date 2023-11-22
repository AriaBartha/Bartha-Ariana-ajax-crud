const api_url = "https://retoolapi.dev/J0NGgL/productOrder";

document.addEventListener("DOMContentLoaded", () => {
  const ordersTable = document.getElementById("ordersTable");
  fetch(api_url).then(httpResponse => httpResponse.json()).then(responseBody => {
    let htmlTable = "";
    responseBody.forEach(orders => {
      const tableRow = `<tr>
      <td>${orders.id}</td>
      <td>${orders.Name}</td>
      <td>${orders.Sent}</td>
      <td>${orders.Email}</td>
      <td>${orders.Product}</td>
      <td>${orders.Date_of_order}</td>
      </tr>`;
      htmlTable += tableRow;
    });
    ordersTable.innerHTML = htmlTable;
  });
});