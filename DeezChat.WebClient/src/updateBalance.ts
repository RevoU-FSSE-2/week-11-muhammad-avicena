// TypeScript code to update data using the fetch API

document.addEventListener("DOMContentLoaded", () => {
    const localStorageData: string | null = localStorage.getItem("userData");
    const dataUser = JSON.parse(localStorageData || "{}");
    const { id } = dataUser;
    const successSpan = document.getElementById(
      "updateBalanceSuccess"
    ) as HTMLSpanElement;
    const form = document.getElementById(
      "balanceForm"
    ) as HTMLFormElement;
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const balance = (
        document.getElementById("updateBalanceUser") as HTMLInputElement
      ).value;
  
      const formData = {
        balance: balance,
      };
  
      console.log(formData);
  
      try {
        const response = await fetch(`https://financial-api.avicena.dev/api/user/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Balance updated:", data);
          successSpan.textContent = "Balance updated successfully!";
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("Error updating balance:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    });
  });
  