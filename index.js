window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('loginFailed')) {
        alert('Giriş başarısız! Lütfen email ve şifrenizi kontrol ediniz.');
    }

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent form submission

        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['psw'].value;

        fetch('/action_page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, psw: password }),
        })
        .then(response => response.json())
        .then(data => {
            let currentUser = sessionStorage.getItem('currentUser');
            if (data.loginSuccessful === false) {
                alert('Giriş başarısız! Lütfen email ve şifrenizi kontrol ediniz.');
            } else {
                alert('Giriş başarılı! Hoşgeldiniz ' + data.user.name + ' ' + data.user.surname);
                sessionStorage.setItem('currentUser', JSON.stringify(data.user));

                if (data.user.role === 'ADMIN')
                    window.location.href = '/adminpage.html';
                else
                    window.location.href = '/userpage.html';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}