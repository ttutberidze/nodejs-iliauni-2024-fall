const login = async (email, password) => {
    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        const result = await res.json()
        if(result.token) {
            localStorage.setItem('accessToken', result.token)
        }
        window.location.href = "/"
    } catch(error) {
        alert(error.message)
    }
}
document.getElementById("login-btn").addEventListener('click', () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    login(email, password)
})