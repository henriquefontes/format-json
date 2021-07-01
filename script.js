const form = document.querySelector("form");
const table = document.querySelector("table");
const searchContainer = document.querySelector(".search-container")

async function formatJson(jsonFile) {
    try {
        const fetchJson = await fetch(jsonFile);
        const json = await fetchJson.json();

        if (json.length > 15) {
            throw new Error("Too much data in JSON")
        }

        if (json.length) {
            const keysArray = Object.keys(json[0])
            const keys = document.createElement("tr");

            for (let i = 0; i < keysArray.length; i++) {
                const newElement = document.createElement("th");
                newElement.innerHTML = keysArray[i];
                keys.appendChild(newElement)
            }

            table.appendChild(keys)

            for (id in json) {
                const values = document.createElement("tr")

                const valuesArray = Object.values(json[id])

                for (let i = 0; i < valuesArray.length; i++) {
                    const newElement = document.createElement("td");
                    newElement.innerHTML = valuesArray[i];
                    values.appendChild(newElement);
                }

                table.appendChild(values)
            }

        } else {
            throw new Error();
        }


    } catch (e) {
        const erro = document.createElement("strong");
        erro.innerHTML = e.message;
        table.appendChild(erro);
    }
}

form.addEventListener("submit", (event) => {
    const input = document.querySelector("input").value;

    event.preventDefault();

    if (input) {
        formatJson(input)
        table.style.display = "table";
        searchContainer.style.display = "none";
    } else {
        alert("White field")
    }
})