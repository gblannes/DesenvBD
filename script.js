document.addEventListener("DOMContentLoaded", function () {
    // Verifica se estamos na página de cadastro
    if (document.getElementById("dataForm")) {
        const form = document.getElementById("dataForm");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Capturar os valores dos inputs
            const name = document.getElementById("nome").value;
            const cpf = document.getElementById("cpf").value;
            const rg = document.getElementById("rg").value;
            const birthdate = document.getElementById("nasc").value;

            // Obter os dados armazenados ou criar um array vazio
            let children = JSON.parse(localStorage.getItem("children")) || [];
            
            // Adicionar a nova criança ao array
            children.push({ name, cpf, rg, birthdate });
            
            // Salvar o array atualizado no Local Storage
            localStorage.setItem("children", JSON.stringify(children));

            // Limpar os campos do formulário após inserir o dado
            form.reset();
        });
    }

    // Verifica se estamos na página da tabela
    if (document.getElementById("dataTable")) {
        const tableBody = document.getElementById("dataTable").querySelector("tbody");

        // Obter os dados armazenados no Local Storage
        const children = JSON.parse(localStorage.getItem("children")) || [];

        // Adicionar cada criança como uma linha na tabela
        children.forEach((child) => {
            const newRow = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = child.name;

            const birthdateCell = document.createElement("td");
            birthdateCell.textContent = child.birthdate;

            const cpfCell = document.createElement("td");
            cpfCell.textContent = child.cpf;

            const rgCell = document.createElement("td");
            rgCell.textContent = child.rg;

            newRow.appendChild(nameCell);
            newRow.appendChild(birthdateCell);
            newRow.appendChild(cpfCell);
            newRow.appendChild(rgCell);

            tableBody.appendChild(newRow);
        });
    }
});
