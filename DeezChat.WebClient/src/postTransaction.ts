interface MyFormData {
  userId: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(transactionsEndpoint);
  const dataAPI = await response.json();
  console.log("transaksi data", dataAPI);
  
  const form = document.getElementById("transactionForm") as HTMLFormElement;
  const successSpan = document.getElementById(
    "transactionSuccess"
  ) as HTMLSpanElement;
  const failedSpan = document.getElementById(
    "transactionFailed"
  ) as HTMLSpanElement;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // const localStorageData: string | null = localStorage.getItem("userData");
    // const dataUser = JSON.parse(localStorageData || "{}");

    const formData = {
      userId: dataAPI.id, // Change this line to use dataAPI's id
      productName: (document.getElementById("productName") as HTMLInputElement).value,
      productQuantity: parseInt((document.getElementById("productQuantity") as HTMLInputElement).value),
      productPrice: parseInt((document.getElementById("productPrice") as HTMLInputElement).value),
    };

    console.log(formData)

    try {
      const response = await fetch(
        "https://financial-api.avicena.dev/api/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Transaction created:", responseData);
        successSpan.textContent = "Transaction created successfully!";
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error creating transaction:", response.statusText);
        failedSpan.textContent = `Error creating transaction: ${response.statusText}`;
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      failedSpan.textContent = `Error creating transaction: ${error}`;
    }
  });
});
