document.addEventListener("DOMContentLoaded", function () {
    // Adicionando informações ao formulário
    if (document.getElementById("dataForm")) {
        const form = document.getElementById("dataForm");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("nome").value;
            const cpf = document.getElementById("cpf").value;
            const rg = document.getElementById("rg").value;
            const birthdate = document.getElementById("nasc").value;
            const responsavel = document.getElementById("nomeResp").value;
            const pais = document.getElementById("pais").value;
            const escola = document.getElementById("escola").value;
            const anoEscolar = document.getElementById("anoEscolar").value;
            const turno = document.getElementById("turno").value;

            let children = JSON.parse(localStorage.getItem("children")) || [];
            children.push({ name, cpf, rg, birthdate, responsavel, pais, escola, anoEscolar, turno });
            localStorage.setItem("children", JSON.stringify(children));
            form.reset();
            renderTable();  // Re-renderiza a tabela imediatamente após o cadastro
        });
    }

    // Manipulando a tabela
    if (document.getElementById("dataTable")) {
        const tableBody = document.getElementById("dataTable").querySelector("tbody");
        let children = JSON.parse(localStorage.getItem("children")) || [];

        // Criar as crianças cadastradas
        function addRow(child, index) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${child.name}</td>
                <td>${child.birthdate}</td>
                <td>${child.cpf}</td>
                <td>${child.rg}</td>
                <td>${child.responsavel}</td>
                <td>${child.pais}</td>
                <td>${child.escola}</td>
                <td>${child.anoEscolar}</td>
                <td>${child.turno}</td>
                <td><button class="delete-btn" data-index="${index}">Excluir</button></td>
            `;
            tableBody.appendChild(newRow);
        }

        // Função para excluir uma criança da tabela
        function deleteRow(index) {
            let children = JSON.parse(localStorage.getItem("children")) || [];
            children.splice(index, 1);  // Remove a criança do array
            localStorage.setItem("children", JSON.stringify(children));
            renderTable();  // Atualiza a tabela após a exclusão
        }

        // Função para renderizar a tabela
        function renderTable() {
            tableBody.innerHTML = "";  // Limpa a tabela
            children = JSON.parse(localStorage.getItem("children")) || [];  // Recarrega os dados
            children.forEach((child, index) => addRow(child, index));  // Adiciona as linhas de novo
        }

        // Função de calcular a idade
        function calculateAge(birthdate) {
            const birth = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        }

        // Função de filtragem
        function filterTable() {
            const nameFilter = document.getElementById("filterName").value.toLowerCase();
            const birthdateFilter = document.getElementById("filterBirthdate").value;
            const ageFilter = document.getElementById("filterAge").value;

            tableBody.innerHTML = "";
            children.forEach((child, index) => {
                const childAge = calculateAge(child.birthdate);
                if (
                    (nameFilter === "" || child.name.toLowerCase().includes(nameFilter)) &&
                    (birthdateFilter === "" || child.birthdate === birthdateFilter) &&
                    (ageFilter === "" || childAge === parseInt(ageFilter))
                ) {
                    addRow(child, index);
                }
            });
        }

        // Evento de clique no botão de filtrar
        document.getElementById("filterBtn").addEventListener("click", filterTable);

        // Evento de delegação para excluir
        tableBody.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("delete-btn")) {
                const index = e.target.getAttribute("data-index");
                deleteRow(index);  // Chama a função de excluir
            }
        });

        // Renderiza a tabela ao carregar a página
        renderTable();
    }
});
