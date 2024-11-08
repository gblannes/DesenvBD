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

        // Função para renderizar a tabela
        function renderTable(data = children) {
            tableBody.innerHTML = "";  // Limpa a tabela
            data.forEach((child) => addRow(child));  // Adiciona as linhas de novo
        }

        // Função para adicionar uma linha
        function addRow(child) {
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
                <td><button class="delete-btn" data-cpf="${child.cpf}">Excluir</button></td>
            `;
            tableBody.appendChild(newRow);
        }

        // Função para excluir uma criança da tabela
        function deleteRow(cpf) {
            let children = JSON.parse(localStorage.getItem("children")) || [];
            children = children.filter(child => child.cpf !== cpf);  // Remove a criança com o CPF correspondente
            localStorage.setItem("children", JSON.stringify(children));
            renderTable();  // Atualiza a tabela após a exclusão
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
            const ageFilterElement = document.getElementById("filterAge"); // Verificar se existe
            const ageFilter = ageFilterElement ? ageFilterElement.value : "";

            const filteredData = children.filter((child) => {
                const childAge = calculateAge(child.birthdate);
                const isNameMatch = nameFilter === "" || child.name.toLowerCase().includes(nameFilter);
                const isBirthdateMatch = birthdateFilter === "" || child.birthdate === birthdateFilter;
                const isAgeMatch = ageFilter === "" || childAge === parseInt(ageFilter, 10);

                return isNameMatch && isBirthdateMatch && isAgeMatch;
            });

            renderTable(filteredData);  // Renderiza a tabela com os dados filtrados
        }

        // Evento de clique no botão de filtrar
        document.getElementById("filterBtn").addEventListener("click", filterTable);

        // Evento de delegação para excluir
        tableBody.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("delete-btn")) {
                const cpf = e.target.getAttribute("data-cpf");
                deleteRow(cpf);  // Chama a função de excluir passando o CPF como identificador
            }
        });

        // Renderiza a tabela ao carregar a página
        renderTable();
    }
});

// Login
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();  // Evita o envio padrão do formulário

            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            // Verifica se os dados correspondem ao login esperado
            if (username === "admin" && password === "123456") {
                alert("Login realizado com sucesso!");
                // Redirecionamento após o login bem-sucedido (altere para o caminho desejado)
                window.location.href = "index.html";
            } else {
                alert("Nome de usuário ou senha incorretos. Tente novamente.");
            }
        });
    }
});
