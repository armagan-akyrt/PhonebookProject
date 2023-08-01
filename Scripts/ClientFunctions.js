
export function checkLogin() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser == null || currentUser == undefined) {
        alert("Lütfen giriş yapınız.");
        window.location.href = "/index.html";
    }
}

export function checkAdmin() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser.role == "USER") { 
        alert("Bu sayfaya erişim yetkiniz bulunmamaktadır.");
        window.location.href = "/index.html";
    }
}