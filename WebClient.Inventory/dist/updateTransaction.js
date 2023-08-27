"use strict";
// TypeScript code to update data using the fetch API
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const localStorageData = localStorage.getItem("userData");
    const dataUser = JSON.parse(localStorageData || "{}");
    const { id } = dataUser;
    const successSpan = document.getElementById("transactionSuccessUpdate");
    const form = document.getElementById("updateTransactionForm");
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        //   const button = event.target as HTMLElement;
        //   const transactionID = button.getAttribute("data-transaction-id");
        //   console.log("get data", transactionID);
        // Get form values
        // const userId = dataUser.id;
        // console.log(dataUser);
        const productName = document.getElementById("productNameUpdate").value;
        const productQuantity = parseInt(document.getElementById("productQuantityUpdate")
            .value);
        const productPrice = parseInt(document.getElementById("productPriceUpdate").value);
        const formData = {
            userId: id,
            productName: productName,
            productQuantity: productQuantity,
            productPrice: productPrice,
        };
        console.log(formData);
        try {
            const response = yield fetch(`https://financial-api.avicena.dev/api/transaction/1`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = yield response.json();
                console.log("Product updated:", data);
                successSpan.textContent = "Transaction updated successfully!";
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            else {
                console.error("Error updating product:", response.statusText);
            }
        }
        catch (error) {
            console.error("Error updating product:", error);
        }
    }));
});
