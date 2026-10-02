"use strict";

// Parte 1: use estes dados para criar workshopPrototype e suas instancias.
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

// Parte 1 - crie workshopPrototype, os workshops e as evidencias solicitadas.

const workshopPrototype={
    getLabel(){
        return `${this.title}-${this.level}`

    },
    isAvailable(){
        return this.available===true;
    }
};
const workshop1=Object.create(workshopPrototype);
workshop1.title='Intro ao java';
workshop1.level='Iniciante';
workshop1.duration=60;
workshop1.available=true;

const workshop2=Object.create(workshopPrototype);
workshop2.title='Intro ao java Avançado';
workshop2.level='Intermediario';
workshop2.duration=120;
workshop2.available=false;

console.log(Object.getPrototypeOf(workshop1)===workshopPrototype);
console.log(Object.getPrototypeOf(workshop2)===workshopPrototype);

console.log(Object.hasOwn(workshop1,'title')===true);
console.log(Object.hasOwn(workshop1,'level')===true);
console.log(Object.hasOwn(workshop1,'duration')===true);
console.log(Object.hasOwn(workshop1,'available')===true);

console.log(Object.hasOwn(workshop2,'title')===true);
console.log(Object.hasOwn(workshop2,'level')===true);
console.log(Object.hasOwn(workshop2,'duration')===true);
console.log(Object.hasOwn(workshop2,'available')===true);


console.log(Object.hasOwn(workshop1,'getLabel')===false)
console.log(Object.hasOwn(workshop1,'isAvailable')===false)

console.log(Object.hasOwn(workshop2,'getLabel')===false)
console.log(Object.hasOwn(workshop2,'isAvailable')===false)

workshopPrototype.enroll=function(){
    if(!this.available){
        console.log("Nao foi possivel inscrever o"+(this.title))
    }
    else{
        console.log("Inscriçao feita!")
    }
}

workshop1.enroll();
console.log(workshop1.available);
workshop2.enroll();
console.log(workshop2.available);

const schedule={
    id:1,
    title:"agenda do dia",
    workshops:[
        {id:1,title:"Objetos e prototipos", duration:90},
        {id:2,title:"Classes modernas", duration:75}
    ]
};
const shallowCopy={...schedule};
shallowCopy.workshops[0].title="Titulo alterado";

console.log("Original",schedule.workshops[0].title);
console.log("Alterado",shallowCopy.workshops[0].title);

const deepCopy=structuredClone(schedule);

deepCopy.workshops[0].title="Outro titulo qualquer";
console.log("Original",schedule.workshops[0].title);
console.log("Alterado",deepCopy.workshops[0].title);

schedule.getTotal=function(){
    return this.workshops.reduce((sum,w)=>sum+w.duration,0)
};
const deepCopy1=structuredClone(schedule);
console.log(typeof deepCopy1.getTotal);

const frozen=Object.freeze({name:'congelado',value:10});
frozen.value=99;
frozen.nova='teste';
delete frozen.name;
console.log("frozen",frozen);

const sealed=Object.seal({name:'selado',value:20});


// Parte 2 - implemente Instructor, Workshop e WorkshopCatalog.
// Os metodos devem ser definidos no prototipo das instancias.

const state = { instructors: [], workshops: [], selectedInstructorId: "", term: "" };
const instructorFilter = document.querySelector("#instructor-filter");
const workshopFilter = document.querySelector("#workshop-filter");
const catalogStatus = document.querySelector("#catalog-status");
const workshopList = document.querySelector("#workshop-list");
const workshopDetail = document.querySelector("#workshop-detail");
const toast = Object.create(toastPrototype);

function renderWorkshops() {
    // TODO: use o catalogo, os filtros de state e renderize cards com botoes.
    workshopList.innerHTML = '<p class="empty">Implemente a renderizacao das oficinas.</p>';
    catalogStatus.textContent = "Aguardando implementacao";
}

function renderInstructors() {
    // TODO: transforme instructorData em Instructor e preencha o select.
    instructorFilter.innerHTML = '<option value="">Todos os instrutores</option>';
}

function showWorkshopDetail(workshopId) {
    // TODO: encontre a oficina e mostre sua ementa no painel.
    void workshopId;
    workshopDetail.innerHTML = '<p class="empty">Implemente os detalhes da oficina.</p>';
}

function initialize() {
    // TODO: crie as entidades, o catalogo e a primeira renderizacao.
    catalogStatus.textContent = "Implemente a inicializacao do catalogo.";
}

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

initialize();
