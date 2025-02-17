// Capturando o envio do formulário
document.getElementById("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coleta os dados do formulário
    const name = document.getElementById("nome").value;
    const email = document.getElementById("e-mail").value;
    const password = document.getElementById("password").value;

    // Envia os dados via POST para o backend
    const response = await fetch("http://localhost:5001/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Usuário registrado com sucesso!");
    } else {
      alert(`Erro: ${data.message}`);
    }
  });