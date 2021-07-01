const form = document.querySelector("form");
const table = document.querySelector("table")

async function formatJson(jsonFile) {
    try {
        const fetchJson = await fetch(jsonFile);
        const persons = await fetchJson.json();

        if (persons.length) {
            for (id in persons) {
                const array = Object.values(persons[id])

                const tr = document.createElement("tr")

                for (let i = 0; i < array.length; i++) {
                    const newElement = document.createElement("td");
                    newElement.innerHTML = array[i];
                    tr.appendChild(newElement);
                }

                table.appendChild(tr)
            }

        } else {
            throw new Error();
        }


    } catch {
        const erro = document.createElement("strong");
        erro.innerHTML = "Nenhum dado encontrado no JSON";
        table.appendChild(erro);
    }
}

form.addEventListener("submit", (event) => {
    const input = document.querySelector("input").value;

    event.preventDefault();

    if (input) {
        formatJson(input)
        table.style.display = "table";
    } else {
        alert("White field")
    }
})