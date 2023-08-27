"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const localStorageData = localStorage.getItem('userData');
            const dataUser = JSON.parse(localStorageData || '{}');
            const getUserById = `https://financial-api.avicena.dev/api/user/${dataUser.id}`;
            const response = yield fetch(getUserById);
            const apiData = yield response.json();
            console.log(apiData);
            const userSpan = document.getElementById('user');
            if (userSpan) {
                userSpan.textContent = apiData.user.username || 'Anon';
            }
            const balanceSpan = document.getElementById('balance');
            if (balanceSpan) {
                balanceSpan.textContent = apiData.user.balance || '0';
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
fetchUserData();
