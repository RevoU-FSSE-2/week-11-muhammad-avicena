// TypeScript code to update data using the fetch API

document.addEventListener("DOMContentLoaded", () => {
  const localStorageData: string | null = localStorage.getItem("userData");
  const dataUser = JSON.parse(localStorageData || "{}");
  const { id } = dataUser;
  const successSpan = document.getElementById(
    "transactionSuccessUpdate"
  ) as HTMLSpanElement;
  const form = document.getElementById(
    "updateTransactionForm"
  ) as HTMLFormElement;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //   const button = event.target as HTMLElement;
    //   const transactionID = button.getAttribute("data-transaction-id");
    //   console.log("get data", transactionID);

    // Get form values

    // const userId = dataUser.id;
    // console.log(dataUser);

    const productName = (
      document.getElementById("productNameUpdate") as HTMLInputElement
    ).value;
    const productQuantity = parseInt(
      (document.getElementById("productQuantityUpdate") as HTMLInputElement)
        .value
    );
    const productPrice = parseInt(
      (document.getElementById("productPriceUpdate") as HTMLInputElement).value
      );
    
    const formData = {
      userId: id,
      productName: productName,
      productQuantity: productQuantity,
      productPrice: productPrice,
    };

    console.log(formData);

      try {
          const response = await fetch(`https://financial-api.avicena.dev/api/transaction/1`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              const data = await response.json();
              console.log("Product updated:", data);
              successSpan.textContent = "Transaction updated successfully!";
              setTimeout(() => {
                  window.location.reload();
              }, 2000);
          } else {
              console.error("Error updating product:", response.statusText);
          }
      } catch (error) {
          console.error("Error updating product:", error);
      }
  });
});
