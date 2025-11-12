const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');

// Buscar o endereço pela API ViaCEP
// Buscar o endereço pela API ViaCEP
document.getElementById('cep').addEventListener("blur", async () => {
    const cep = document.getElementById('cep').value.trim();
    const addressField = document.getElementById("address");

    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.logradouro) {
                // Preenche automaticamente, mas permite edição
                addressField.value = `${data.logradouro}, ${data.bairro}, ${data.localidade}`;
            } else {
                alert("CEP not found!");
                addressField.value = ""; // limpa o campo se o CEP for inválido
            }
        } catch (error) {
            alert("Error fetching CEP data");
            addressField.value = "";
        }
    } else {
        // limpa o campo caso o usuário apague o CEP
        addressField.value = "";
    }
});

// Validar e salvar no pseudo banco de dados
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const adress = document.getElementById("adress").value.trim();

    if (!name || !email || !adress) {
        alert("Please fill in all fields.");
        return;
    }

    const user = { name, email, adress };

    // Simulação de conexão com BD (localStorage)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    document.getElementById("adress").value = "";
    showUsers();
});

function showUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = "<h3>Registered Users:</h3>" +
        users.map(u => `<p><strong>${u.name}</strong> - ${u.email}<br>${u.adress}</p>`).join("");
}

// Inicializar lista
showUsers();
