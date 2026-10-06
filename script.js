"use strict";

// =============================================
// DADOS FORNECIDOS
// =============================================
const workshopData = [
    { id: 1, title: "Objetos e prototipos", description: "Crie objetos reutilizaveis e compreenda a cadeia de prototipos.", level: "Intermediario", duration: 90, instructorId: 1 },
    { id: 2, title: "Classes modernas", description: "Modele entidades com class, extends e super.", level: "Intermediario", duration: 75, instructorId: 2 },
    { id: 3, title: "JavaScript no navegador", description: "Organize eventos e atualizacoes de uma interface.", level: "Iniciante", duration: 60, instructorId: 1 },
    { id: 4, title: "Arquitetura frontend", description: "Separe dados, dominio e renderizacao em uma aplicacao.", level: "Avancado", duration: 105, instructorId: 3 }
];

const instructorData = [
    { id: 1, name: "Ana Souza", specialty: "JavaScript" },
    { id: 2, name: "Bruno Lima", specialty: "Arquitetura" },
    { id: 3, name: "Carla Mendes", specialty: "Frontend" }
];

const toastPrototype = {
    show(message, type = "success") {
        const element = document.querySelector("[data-toast]");
        if (!element) return;
        element.textContent = message;
        element.className = `toast is-visible is-${type}`;
        window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => element.classList.remove("is-visible"), 3500);
    }
};

// =============================================
// PARTE 1 — QUESTÃO 1: Protótipos
// =============================================

const workshopPrototype = {
    getLabel() {
        return `${this.title} — ${this.level}`;
    },
    isAvailable() {
        return this.available === true;
    }
};

const workshop1 = Object.create(workshopPrototype);
workshop1.title = "Introdução ao JavaScript";
workshop1.level = "Iniciante";
workshop1.duration = 60;
workshop1.available = true;

const workshop2 = Object.create(workshopPrototype);
workshop2.title = "Programação assíncrona";
workshop2.level = "Avançado";
workshop2.duration = 120;
workshop2.available = false;

// Evidências 1.2
console.assert(Object.getPrototypeOf(workshop1) === workshopPrototype, "workshop1 herda do protótipo");
console.assert(Object.getPrototypeOf(workshop2) === workshopPrototype, "workshop2 herda do protótipo");
console.assert(Object.hasOwn(workshop1, 'title') === true, "title é próprio");
console.assert(Object.hasOwn(workshop1, 'level') === true, "level é próprio");
console.assert(Object.hasOwn(workshop1, 'duration') === true, "duration é próprio");
console.assert(Object.hasOwn(workshop1, 'available') === true, "available é próprio");
console.assert(Object.hasOwn(workshop1, 'getLabel') === false, "getLabel é herdado");
console.assert(Object.hasOwn(workshop1, 'isAvailable') === false, "isAvailable é herdado");

// Adicionar método em runtime (depois de criar os objetos!)
workshopPrototype.enroll = function () {
    if (!this.available) {
        console.log(`Não foi possível inscrever em "${this.title}": indisponível.`);
        return;
    }
    this.available = false;
    console.log(`Inscrição realizada em "${this.title}".`);
};

workshop1.enroll(); // funciona → available vira false
workshop2.enroll(); // bloqueado
console.log("workshop1.available:", workshop1.available); // false
console.log("workshop2.available:", workshop2.available); // false

// =============================================
// PARTE 1 — QUESTÃO 2: Cópia e restrição
// =============================================

const schedule = {
    id: 1,
    title: "Agenda do dia",
    workshops: [
        { id: 1, title: "Objetos e prototipos", duration: 90 },
        { id: 2, title: "Classes modernas", duration: 75 }
    ]
};

// 2.1 — Cópia rasa (shallow copy)
const shallowCopy = { ...schedule };
shallowCopy.workshops[0].title = "Título alterado";
console.log("Original:", schedule.workshops[0].title);        // "Título alterado" (afetado!)
console.log("Cópia rasa:", shallowCopy.workshops[0].title);   // "Título alterado"
console.log("Mesmo array?", schedule.workshops === shallowCopy.workshops); // true

// 2.2 — Cópia profunda (deep copy) + limitação
schedule.getTotal = function () {
    return this.workshops.reduce((sum, w) => sum + w.duration, 0);
};

const deepCopy = structuredClone(schedule);
deepCopy.workshops[0].title = "Outro título qualquer";
console.log("Original:", schedule.workshops[0].title);      // "Título alterado" (preservado)
console.log("Cópia profunda:", deepCopy.workshops[0].title); // "Outro título qualquer"
console.log("Mesmo array?", schedule.workshops === deepCopy.workshops); // false
console.log("Função no original:", typeof schedule.getTotal);  // "function"
console.log("Função na cópia:", typeof deepCopy.getTotal);     // "undefined" ← limitação

// 2.3 — freeze / seal / preventExtensions
const congelado = Object.freeze({ title: "Congelado", value: 10 });
congelado.value = 99;         // bloqueado
congelado.nova = "teste";     // bloqueado
delete congelado.title;       // bloqueado
console.log("congelado:", congelado); // { title: "Congelado", value: 10 }

const selado = Object.seal({ title: "Selado", value: 20 });
selado.value = 99;            // ✅ permitido
selado.nova = "teste";        // bloqueado
delete selado.title;          // bloqueado
console.log("selado:", selado); // { title: "Selado", value: 99 }

const semExtensao = Object.preventExtensions({ title: "Sem extensão", value: 30 });
semExtensao.value = 99;       // ✅ permitido
semExtensao.nova = "teste";   // bloqueado
delete semExtensao.title;     // ✅ permitido
console.log("semExtensao:", semExtensao); // { value: 99 }

// =============================================
// PARTE 2 — QUESTÃO 3: Classes
// =============================================

class Instructor {
    constructor(id, name, specialty) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
    }
    getLabel() {
        return `${this.name} — ${this.specialty}`;
    }
}

class Workshop {
    constructor(id, title, description, level, duration, instructorId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.level = level;
        this.duration = duration;
        this.instructorId = instructorId;
    }
    getSummary(instructor) {
        const nome = instructor ? instructor.getLabel() : "Instrutor não encontrado";
        return `${this.duration} min · ${this.level} · ${nome}`;
    }
}

class WorkshopCatalog {
    constructor(instructors = [], workshops = []) {
        this.instructors = instructors;
        this.workshops = workshops;
    }
    list() {
        return this.workshops;
    }
    findById(id) {
        return this.workshops.find(w => w.id === Number(id));
    }
    filterByTitle(term) {
        const busca = (term || "").toLowerCase().trim();
        if (!busca) return this.workshops;
        return this.workshops.filter(w => w.title.toLowerCase().includes(busca));
    }
    findInstructorById(id) {
        return this.instructors.find(i => i.id === Number(id));
    }
}

// 3.4 — Criar entidades e demonstrar reuso
const instructors = instructorData.map(d =>
    new Instructor(d.id, d.name, d.specialty)
);

const workshops = workshopData.map(d =>
    new Workshop(d.id, d.title, d.description, d.level, d.duration, d.instructorId)
);

const catalog = new WorkshopCatalog(instructors, workshops);

// Evidências de reuso de métodos
console.assert(instructors[0].getLabel === instructors[1].getLabel, "getLabel compartilhado entre instrutores");
console.assert(workshops[0].getSummary === workshops[1].getSummary, "getSummary compartilhado entre workshops");
console.assert(Object.hasOwn(instructors[0], 'getLabel') === false, "getLabel não é próprio");
console.assert(Object.hasOwn(Workshop.prototype, 'getSummary') === true, "getSummary no protótipo");
console.assert(Object.getPrototypeOf(instructors[0]) === Instructor.prototype, "instrutor herda do protótipo correto");
console.assert(Object.getPrototypeOf(workshops[0]) === Workshop.prototype, "workshop herda do protótipo correto");

// =============================================
// ESTADO E SELETORES DO DOM
// =============================================
const state = {
    instructors: [],
    workshops: [],
    selectedInstructorId: "",
    term: "",
    catalog: null
};

const instructorFilter = document.querySelector("#instructor-filter");
const workshopFilter = document.querySelector("#workshop-filter");
const catalogStatus = document.querySelector("#catalog-status");
const workshopList = document.querySelector("#workshop-list");
const workshopDetail = document.querySelector("#workshop-detail");
const toast = Object.create(toastPrototype);

// =============================================
// QUESTÃO 4 — Renderização
// =============================================

function renderInstructors() {
    instructorFilter.innerHTML = '<option value="">Todos os instrutores</option>';
    state.instructors.forEach(instrutor => {
        const option = document.createElement("option");
        option.value = instrutor.id;
        option.textContent = instrutor.getLabel();
        instructorFilter.appendChild(option);
    });
}

function renderWorkshops() {
    const catalog = state.catalog;
    if (!catalog) return;

    let resultado = catalog.filterByTitle(state.term);

    if (state.selectedInstructorId) {
        resultado = resultado.filter(w =>
            w.instructorId === Number(state.selectedInstructorId)
        );
    }

    if (resultado.length === 0) {
        workshopList.innerHTML = '<p class="empty">Nenhuma oficina encontrada.</p>';
        catalogStatus.textContent = "Nenhum resultado";
        toast.show("Nenhuma oficina corresponde ao filtro.", "warning");
        return;
    }

    workshopList.innerHTML = "";
    resultado.forEach(w => {
        const instrutor = catalog.findInstructorById(w.instructorId);
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <h3>${w.title}</h3>
            <p>${w.getSummary(instrutor)}</p>
            <button data-workshop-id="${w.id}" type="button">Ver ementa</button>
        `;
        workshopList.appendChild(card);
    });

    catalogStatus.textContent = `${resultado.length} oficina(s) encontrada(s)`;
}

function showWorkshopDetail(workshopId) {
    const catalog = state.catalog;
    const workshop = catalog.findById(workshopId);

    if (!workshop) {
        workshopDetail.innerHTML = '<p class="empty">Oficina não encontrada.</p>';
        toast.show("Oficina não encontrada.", "error");
        return;
    }

    const instrutor = catalog.findInstructorById(workshop.instructorId);
    workshopDetail.innerHTML = `
        <h3>${workshop.title}</h3>
        <p><strong>Descrição:</strong> ${workshop.description}</p>
        <p><strong>Nível:</strong> ${workshop.level}</p>
        <p><strong>Duração:</strong> ${workshop.duration} min</p>
        <p><strong>Instrutor:</strong> ${instrutor ? instrutor.getLabel() : "—"}</p>
    `;

    toast.show(`Ementa de "${workshop.title}" carregada.`, "success");
}

// =============================================
// QUESTÃO 5 — Estados e qualidade
// =============================================

function validateWorkshop(workshop) {
    if (!workshop.title || workshop.title.trim() === "") return "Título é obrigatório.";
    if (workshop.duration <= 0) return "Duração deve ser positiva.";
    if (!workshop.level) return "Nível é obrigatório.";
    return null;
}

function testValidation() {
    const invalido = new Workshop(99, "", "desc", "Iniciante", 0, 1);
    const erro = validateWorkshop(invalido);
    if (erro) {
        catalogStatus.textContent = `Erro: ${erro}`;
        toast.show(erro, "error");
        return;
    }
    toast.show("Workshop válido.", "success");
}

// =============================================
// INICIALIZAÇÃO
// =============================================

function initialize() {
    catalogStatus.textContent = "Carregando oficinas...";
    workshopList.innerHTML = '<p class="empty">Carregando...</p>';

    state.catalog = catalog;
    state.instructors = instructors;
    state.workshops = workshops;

    renderInstructors();
    renderWorkshops();

    catalogStatus.textContent = `${workshops.length} oficinas disponíveis`;
}

// =============================================
// EVENTOS
// =============================================

instructorFilter.addEventListener("change", () => {
    state.selectedInstructorId = instructorFilter.value;
    renderWorkshops();
});

workshopFilter.addEventListener("input", () => {
    state.term = workshopFilter.value;
    renderWorkshops();
});

workshopList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-workshop-id]");
    if (button) showWorkshopDetail(button.dataset.workshopId);
});

// =============================================
// INICIAR
// =============================================
initialize();
