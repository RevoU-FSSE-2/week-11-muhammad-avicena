// const localStorageData: any = localStorage.getItem('userData');
// const dataUser: any = JSON.parse(localStorageData || '{}');

const transactionsEndpoint = `https://financial-api.avicena.dev/api/transaction`;

interface Transaction {
  transactionId: string;
  userId: any;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

async function fetchTransactionData() {
  try {
    const response = await fetch(transactionsEndpoint);
    const dataAPI = await response.json();
    console.log("data table :", dataAPI.transactions);
    // console.log("Type of transactions:", Array.isArray(dataAPI));

    const tbody = document.querySelector("#dataTable");

    if (tbody) {
      dataAPI.transactions.forEach((transaction: Transaction) => {
        const row = document.createElement("tr");
        row.className = "border-b dark:border-gray-700";

        const nameCell = document.createElement("td");
        nameCell.className =
          "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white";
        nameCell.textContent = `${transaction.productName}`;

        const typeCell = document.createElement("td");
        typeCell.className = "px-4 py-3";
        typeCell.textContent = `${transaction.productQuantity}`;

        const brandCell = document.createElement("td");
        brandCell.className = "px-4 py-3";
        brandCell.textContent = `${transaction.userId.username}`;

        const priceCell = document.createElement("td");
        priceCell.className = "px-4 py-3";
        priceCell.textContent = `Rp. ${transaction.productPrice}`;

        const actionsCell = document.createElement("td");
        actionsCell.className = "px-4 py-3 flex items-center justify-end";

        const dropdownButton = document.createElement("button");
        dropdownButton.className = `inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100`;
        dropdownButton.type = `button`;

        const dropdownContent = document.createElement("div");
        dropdownContent.className = ` z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`;

        const ul = document.createElement("ul");
        ul.className = `py-1 text-sm`;

        const editLi = document.createElement("li");
        const editButton = document.createElement("button");
        editButton.type = "button";

        editButton.addEventListener("click", () => {
          // Add your edit button logic here, such as opening a modal or performing an action
          const updateProductModal: any =
            document.getElementById("updateProductModal");
          updateProductModal.setAttribute("data-modal-toggle", "updateProductModal");
          if (updateProductModal) {
            updateProductModal.classList.add(
              "overflow-y-auto",
              "overflow-x-hidden",
              "fixed",
              "top-0",
              "right-0",
              "left-0",
              "z-50",
              "justify-center",
              "items-center",
              "w-full",
              "md:inset-0",
              "h-[calc(100%-1rem)]",
              "max-h-full",
              "inset-0",
              "flex"
            );
            updateProductModal.setAttribute("aria-modal", "true");
            updateProductModal.setAttribute("role", "dialog");

            // Show the modal and apply the correct classes

            updateProductModal.classList.remove("hidden");
            updateProductModal.classList.add("fixed", "inset-0", "md:inset-0"); // Add md:inset-0 class
            updateProductModal.removeAttribute("aria-hidden");
            document.body.classList.add("overflow-hidden"); // Prevent scrolling when the modal is open
          }
        });

       
        editButton.className =
          "flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200";
        editButton.innerHTML =
          '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>Edit';

        editLi.appendChild(editButton);
        ul.appendChild(editLi);

        // Create the "Delete" button
        const deleteLi = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.setAttribute("data-modal-target", "deleteModal");
        deleteButton.setAttribute("data-modal-toggle", "deleteModal");

        deleteButton.addEventListener("click", () => {
          // Add your edit button logic here, such as opening a modal or performing an action
          const deleteModal: any =
            document.getElementById("deleteModal");
            deleteModal.setAttribute("data-modal-toggle", "updateProductModal");
          if (deleteModal) {
            deleteModal.classList.add(
              "overflow-y-auto",
              "overflow-x-hidden",
              "fixed",
              "top-0",
              "right-0",
              "left-0",
              "z-50",
              "justify-center",
              "items-center",
              "w-full",
              "md:inset-0",
              "h-[calc(100%-1rem)]",
              "max-h-full",
              "inset-0",
              "flex"
            );
            deleteModal.setAttribute("aria-modal", "true");
            deleteModal.setAttribute("role", "dialog");
            deleteModal.classList.remove("hidden");
            deleteModal.classList.add("fixed", "inset-0", "md:inset-0"); 
            deleteModal.removeAttribute("aria-hidden");
            document.body.classList.add("overflow-hidden"); 
          }
        });

        deleteButton.className =
          "flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400";
        deleteButton.innerHTML =
          '<svg class="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" /></svg>Delete';
        deleteLi.appendChild(deleteButton);
        ul.appendChild(deleteLi);

        dropdownContent.appendChild(ul);
        actionsCell.appendChild(dropdownButton);
        actionsCell.appendChild(dropdownContent);

        dropdownContent.appendChild(ul);
        actionsCell.appendChild(dropdownButton);
        actionsCell.appendChild(dropdownContent);

        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(brandCell);
        row.appendChild(priceCell);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
}

fetchTransactionData();
