async function fetchUserData() {
    try {
        const localStorageData: string | null = localStorage.getItem('userData');
        const dataUser = JSON.parse(localStorageData || '{}');

        const getUserById = `https://financial-api.avicena.dev/api/user/${dataUser.id}`;

        const response = await fetch(getUserById);
        const apiData = await response.json();
        console.log(apiData);

        const userSpan = document.getElementById('user');
        if (userSpan) {
            userSpan.textContent = apiData.user.username || 'Anon';
        }

        const balanceSpan = document.getElementById('balance');
        if (balanceSpan) {
            balanceSpan.textContent = apiData.user.balance || '0';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchUserData();
