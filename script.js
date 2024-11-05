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
            const responsavel = document.getElementById("nomeResp").value;
            const pais = document.getElementById("pais").value;
            const escola = document.getElementById("escola").value;
            const anoEscolar = document.getElementById("anoEscolar").value;
            const turno = document.getElementById("turno").value;

            // Obter os dados armazenados ou criar um array vazio
            let children = JSON.parse(localStorage.getItem("children")) || [];
            
            // Adicionar a nova criança ao array
            children.push({ name, cpf, rg, birthdate,responsavel,pais,escola,anoEscolar,turno });
            
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

            const responsavelCell = document.createElement("td");
            responsavelCell.textContent = child.responsavel;

            const paisCell = document.createElement("td");
            paisCell.textContent = child.pais;

            const escolaCell = document.createElement("td");
            escolaCell.textContent = child.escola;

            const anoEscolarCell = document.createElement("td");
            anoEscolarCell.textContent = child.anoEscolar;

            const turnoCell = document.createElement("td");
            turnoCell.textContent = child.turno;

            newRow.appendChild(nameCell);
            newRow.appendChild(birthdateCell);
            newRow.appendChild(cpfCell);
            newRow.appendChild(rgCell);
            newRow.appendChild(responsavelCell);
            newRow.appendChild(paisCell);
            newRow.appendChild(escolaCell);
            newRow.appendChild(anoEscolarCell);
            newRow.appendChild(turnoCell);

            tableBody.appendChild(newRow);
        });
    }
});
