const FIREBASE_URL = "https://firestore.googleapis.com/v1/projects/mari-168/databases/(default)/documents/dadosEstudantes";
const FIREBASE_COLLECTION = "dadosEstudantes";

const form = document.getElementById("studentForm");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");
const searchButton = document.getElementById("searchButton");
const results = document.getElementById("results");
const resultCount = document.getElementById("resultCount");
const messageArea = document.getElementById("messageArea");
const totalHoursElement = document.getElementById("totalHours");
const hoursStatus = document.getElementById("hoursStatus");
const progressBar = document.getElementById("progressBar");
const cursos = [

    {
        "key": "Administração",
        "value": "Administração"
    },
    {
        "key": "Arquitetura e Urbanismo",
        "value": "Arquitetura e Urbanismo"
    },
    {
        "key": "Artes Visuais (Bacharelado)",
        "value": "Artes Visuais (Bacharelado)"
    },
    {
        "key": "Artes Visuais (Licenciatura)",
        "value": "Artes Visuais (Licenciatura)"
    },
    {
        "key": "Ciência da Computação",
        "value": "Ciência da Computação"
    },
    {
        "key": "Ciência da Religião",
        "value": "Ciência da Religião"
    },
    {
        "key": "Ciências Biológicas",
        "value": "Ciências Biológicas"
    },
    {
        "key": "Ciências Contábeis",
        "value": "Ciências Contábeis"
    },
    {
        "key": "Ciências Econômicas",
        "value": "Ciências Econômicas"
    },
    {
        "key": "Ciências Exatas",
        "value": "Ciências Exatas"
    },
    {
        "key": "Ciências Humanas",
        "value": "Ciências Humanas"
    },
    {
        "key": "Ciências Sociais",
        "value": "Ciências Sociais"
    },
    {
        "key": "Cinema e Audiovisual",
        "value": "Cinema e Audiovisual"
    },
    {
        "key": "Design",
        "value": "Design"
    },
    {
        "key": "Direito",
        "value": "Direito"
    },
    {
        "key": "Educação Física",
        "value": "Educação Física"
    },
    {
        "key": "Enfermagem",
        "value": "Enfermagem"
    },
    {
        "key": "Engenharia Ambiental e Sanitária",
        "value": "Engenharia Ambiental e Sanitária"
    },
    {
        "key": "Engenharia Civil",
        "value": "Engenharia Civil"
    },
    {
        "key": "Engenharia Computacional",
        "value": "Engenharia Computacional"
    },
    {
        "key": "Engenharia de Produção",
        "value": "Engenharia de Produção"
    },
    {
        "key": "Engenharia Elétrica – Energia",
        "value": "Engenharia Elétrica – Energia"
    },
    {
        "key": "Engenharia Elétrica – Robótica e Automação Industrial",
        "value": "Engenharia Elétrica – Robótica e Automação Industrial"
    },
    {
        "key": "Engenharia Elétrica – Sistemas de Potência",
        "value": "Engenharia Elétrica – Sistemas de Potência"
    },
    {
        "key": "Engenharia Elétrica – Sistemas Eletrônicos",
        "value": "Engenharia Elétrica – Sistemas Eletrônicos"
    },
    {
        "key": "Engenharia Elétrica – Telecomunicações",
        "value": "Engenharia Elétrica – Telecomunicações"
    },
    {
        "key": "Engenharia Mecânica",
        "value": "Engenharia Mecânica"
    },
    {
        "key": "Estatística",
        "value": "Estatística"
    },
    {
        "key": "Farmácia",
        "value": "Farmácia"
    },
    {
        "key": "Filosofia",
        "value": "Filosofia"
    },
    {
        "key": "Física",
        "value": "Física"
    },
    {
        "key": "Fisioterapia",
        "value": "Fisioterapia"
    },
    {
        "key": "Geografia",
        "value": "Geografia"
    },
    {
        "key": "História",
        "value": "História"
    },
    {
        "key": "Jornalismo",
        "value": "Jornalismo"
    },
    {
        "key": "Letras – Bacharelado em Tradução",
        "value": "Letras – Bacharelado em Tradução"
    },
    {
        "key": "Letras – Libras",
        "value": "Letras – Libras"
    },
    {
        "key": "Letras – Licenciaturas",
        "value": "Letras – Licenciaturas"
    },
    {
        "key": "Matemática",
        "value": "Matemática"
    },
    {
        "key": "Medicina",
        "value": "Medicina"
    },
    {
        "key": "Medicina Veterinária",
        "value": "Medicina Veterinária"
    },
    {
        "key": "Moda",
        "value": "Moda"
    },
    {
        "key": "Música – Canto | Flauta Transversal | Piano | Violão | Violino | Violoncelo | Composição | Licenciatura",
        "value": "Música – Canto | Flauta Transversal | Piano | Violão | Violino | Violoncelo | Composição | Licenciatura"
    },
    {
        "key": "Nutrição",
        "value": "Nutrição"
    },
    {
        "key": "Odontologia",
        "value": "Odontologia"
    },
    {
        "key": "Pedagogia",
        "value": "Pedagogia"
    },
    {
        "key": "Psicologia",
        "value": "Psicologia"
    },
    {
        "key": "Química",
        "value": "Química"
    },
    {
        "key": "Rádio, TV e Internet",
        "value": "Rádio, TV e Internet"
    },
    {
        "key": "Serviço Social",
        "value": "Serviço Social"
    },
    {
        "key": "Sistemas de Informação",
        "value": "Sistemas de Informação"
    },
    {
        "key": "Turismo",
        "value": "Turismo"
    }
]
const rangeFields = [
    "sono",
    "estudo",
    "trabalho",
    "lazer",
    "deslocamento",
    "outros"
];

const renderCurso = () => {
    let str = ``
    str += (cursos.map((elm) => { return (`<option>${elm.value}</option>`) }))
    return `<div class="field"><label for="curso">Curso<span>*</span></label><select id="curso" name="curso" required><option value="">Selecione</option>${str}</select></div>`

}

function showMessage(message, type = "success") {
    messageArea.innerHTML = `<div class="message ${type}">${message}</div>`;

    if (type !== "loading") {
        setTimeout(() => {
            messageArea.innerHTML = "";
        }, 3500);
    }
}

function setButtonLoading(button, loading, loadingText, defaultText) {
    button.disabled = loading;
    button.textContent = loading ? loadingText : defaultText;
}

function getHours() {
    return rangeFields.reduce((total, field) => {
        return total + Number(document.getElementById(field).value);
    }, 0);
}

function updateRangeValue(field) {
    const input = document.getElementById(field);
    const output = document.getElementById(`${field}Value`);

    output.textContent = `${input.value} h`;
    updateHoursSummary();
}

function updateHoursSummary() {
    const total = getHours();
    const percentage = Math.min((total / 168) * 100, 100);

    totalHoursElement.textContent = total;
    hoursStatus.textContent = `${total} / 168 h`;
    progressBar.style.width = `${percentage}%`;

    hoursStatus.classList.remove("complete", "invalid");
    progressBar.classList.remove("complete", "over");

    if (total === 168) {
        hoursStatus.classList.add("complete");
        progressBar.classList.add("complete");
    }

    if (total > 168) {
        hoursStatus.classList.add("invalid");
        progressBar.classList.add("over");
    }
}

// function getFormData() {
//     return {
//         sono: Number(document.getElementById("sono").value),
//         estudo: Number(document.getElementById("estudo").value),
//         trabalho: Number(document.getElementById("trabalho").value),
//         lazer: Number(document.getElementById("lazer").value),
//         deslocamento: Number(document.getElementById("deslocamento").value),
//         outros: Number(document.getElementById("outros").value),
//         curso: document.getElementById("curso").value.trim(),
//         instUFJF: document.getElementById("instUFJF").value,
//         notaMedia: Number(document.getElementById("notaMedia").value)
//     };
// }
function getFormData() {

    return {
        fields: {

            sono: {
                doubleValue: Number(document.getElementById("sono").value)
            },

            estudo: {
                doubleValue: Number(document.getElementById("estudo").value)
            },

            trabalho: {
                doubleValue: Number(document.getElementById("trabalho").value)
            },

            lazer: {
                doubleValue: Number(document.getElementById("lazer").value)
            },

            deslocamento: {
                doubleValue: Number(document.getElementById("deslocamento").value)
            },

            outros: {
                doubleValue: Number(document.getElementById("outros").value)
            },

            curso: {
                stringValue: document.getElementById("curso").value.trim()
            },

            instUFJF: {
                stringValue: document.getElementById("instUFJF").value
            },

            notaMedia: {
                doubleValue: Number(document.getElementById("notaMedia").value)
            }

        }
    };
}
function validateForm(data) {

    if (!data.fields.curso.stringValue) {
        return "Informe o curso.";
    }

    // if (!data.fields.instUFJF.stringValue) {
    //     return "Selecione a instituição.";
    // }

    const notaMedia = data.fields.notaMedia.doubleValue;

    if (
        Number.isNaN(notaMedia) ||
        notaMedia < 0 ||
        notaMedia > 100
    ) {
        return "Informe uma nota média entre 0 e 100.";
    }

    if (getHours() !== 168) {
        return "A distribuição da rotina precisa totalizar exatamente 168 horas.";
    }

    return "";
}

async function saveData(data) {
    const response = await fetch(FIREBASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Não foi possível salvar os dados.");
    }

    return response.json();
}

// async function updateData(id, data) {
//     const response = await fetch(`${FIREBASE_URL}/${FIREBASE_COLLECTION}/${id}.json`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//         throw new Error("Não foi possível atualizar os dados.");
//     }

//     return response.json();
// }

async function fetchData() {
    const response = await fetch(`${FIREBASE_URL}/${FIREBASE_COLLECTION}.json`);

    if (!response.ok) {
        throw new Error("Não foi possível consultar os dados.");
    }

    return response.json();
}

function normalizeRecords(data) {
    if (!data) {
        return [];
    }

    return Object.entries(data).map(([firebaseId, item]) => ({
        firebaseId,
        ...item
    }));
}

function filterRecords(records, course, institution) {
    const normalizedCourse = course.trim().toLowerCase();

    return records.filter(record => {
        const matchesCourse = !normalizedCourse ||
            String(record.curso || "").toLowerCase().includes(normalizedCourse);

        const matchesInstitution = !institution ||
            String(record.instUFJF || "") === institution;

        return matchesCourse && matchesInstitution;
    });
}

function renderResults(records) {
    resultCount.textContent = `${records.length} ${records.length === 1 ? "registro" : "registros"}`;

    if (!records.length) {
        results.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⌕</div>
                <h3>Nenhum registro encontrado</h3>
                <p>Tente alterar os filtros da consulta.</p>
            </div>
        `;
        return;
    }

    results.innerHTML = records.map((record, index) => `
        <article class="result-card">
            <div class="result-top">
                <div>
                    <span class="result-id">PARTICIPANTE ${record.id || index + 1}</span>
                    <div class="result-course">${escapeHtml(record.curso || "Curso não informado")}</div>
                </div>
                <div class="grade">${formatNumber(record.notaMedia)}</div>
            </div>

            <div class="result-details">
                <div class="result-detail">
                    <span>Instituição</span>
                    <strong>${escapeHtml(record.instUFJF || "—")}</strong>
                </div>
                <div class="result-detail">
                    <span>Estudo</span>
                    <strong>${record.estudo ?? "—"} h</strong>
                </div>
                <div class="result-detail">
                    <span>Trabalho</span>
                    <strong>${record.trabalho ?? "—"} h</strong>
                </div>
                <div class="result-detail">
                    <span>Sono</span>
                    <strong>${record.sono ?? "—"} h</strong>
                </div>
                <div class="result-detail">
                    <span>Lazer</span>
                    <strong>${record.lazer ?? "—"} h</strong>
                </div>
                <div class="result-detail">
                    <span>Deslocamento</span>
                    <strong>${record.deslocamento ?? "—"} h</strong>
                </div>
            </div>
        </article>
    `).join("");
}

function formatNumber(value) {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return "—";
    }

    return number.toFixed(2).replace(".", ",");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function resetForm() {
    form.reset();

    document.getElementById("sono").value = 0;
    document.getElementById("estudo").value = 0;
    document.getElementById("trabalho").value = 0;
    document.getElementById("lazer").value = 0;
    document.getElementById("deslocamento").value = 0;
    document.getElementById("outros").value = 0;

    rangeFields.forEach(updateRangeValue);
    updateHoursSummary();
}

async function handleSubmit(event) {
    event.preventDefault();

    const data = getFormData();
    const error = validateForm(data);

    if (error) {
        showMessage(error, "error");
        return;
    }

    setButtonLoading(saveButton, true, "Salvando...", "Salvar pesquisa");

    try {
        await saveData(data);
        showMessage("Pesquisa salva com sucesso.", "success");
        resetForm();
    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        setButtonLoading(saveButton, false, "Salvando...", "Salvar pesquisa");
    }
}


document.querySelector(".field-grid").insertAdjacentHTML("afterbegin", renderCurso());
rangeFields.forEach(field => {
    const input = document.getElementById(field);
    input.addEventListener("input", () => updateRangeValue(field));
    updateRangeValue(field);
});

form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", resetForm);

updateHoursSummary();
