const userMetodos = {
    name: 'kath',
    age: 18,
    birthdate: new Date(2008, 5, 9),
    adress: {
        street: 'Padre pinto',
        city: 'Sao Jeo'
    },
    saudacao: function() {
        console.log(`Olá, meu nome é ${this.name}`);
    },
    valorNulo: null,
    valorUndefined: undefined,
    lista: [1, 2, 3]
};

console.log("OBJETO ORIGINAL");
console.log(userMetodos);


const userSemFuncao = { ...userMetodos };
delete userSemFuncao.saudacao;

console.log("OBJETO SEM FUNÇÃO");
console.log(userSemFuncao);

const cloneSpread = { ...userSemFuncao };
const cloneStructured = structuredClone(userSemFuncao);
const cloneJSON = JSON.parse(JSON.stringify(userSemFuncao));


console.log("Date:");
console.log("Original:", userSemFuncao.birthdate, typeof userSemFuncao.birthdate);
console.log("Spread:", cloneSpread.birthdate, typeof cloneSpread.birthdate);
console.log("Structured:", cloneStructured.birthdate, typeof cloneStructured.birthdate);
console.log("JSON:", cloneJSON.birthdate, typeof cloneJSON.birthdate);

console.log("Função");
console.log("Original (sem função):", typeof userSemFuncao.saudacao); // undefined
console.log("Spread:", typeof cloneSpread.saudacao);                  // undefined
console.log("Structured:", typeof cloneStructured.saudacao);          // undefined
console.log("JSON:", typeof cloneJSON.saudacao);                      // undefined

console.log("aninhado");
console.log("Original:", userSemFuncao.adress);
console.log("Spread:", cloneSpread.adress);
console.log("Structured:", cloneStructured.adress);
console.log("JSON:", cloneJSON.adress);

// Teste de modificação
cloneSpread.adress.city = "Rio de Janeiro";
cloneStructured.adress.city = "Belo Horizonte";
cloneJSON.adress.city = "Curitiba";

console.log("APÓS MODIFICAR");
console.log("Original:", userSemFuncao.adress.city);   // "Rio de Janeiro" (spread afetou o original!)
console.log("Spread:", cloneSpread.adress.city);       // "Rio de Janeiro"
console.log("Structured:", cloneStructured.adress.city); // "Belo Horizonte"
console.log("JSON:", cloneJSON.adress.city);           // "Curitiba"

console.log("undefined");
console.log("Original:", userSemFuncao.valorUndefined);
console.log("Spread:", cloneSpread.valorUndefined);
console.log("Structured:", cloneStructured.valorUndefined);
console.log("JSON:", cloneJSON.valorUndefined); // undefined (propriedade removida)

console.log("PROPRIEDADE 'valorUndefined'");
console.log("Original:", userSemFuncao.hasOwnProperty('valorUndefined'));      // true
console.log("Spread:", cloneSpread.hasOwnProperty('valorUndefined'));          // true
console.log("Structured:", cloneStructured.hasOwnProperty('valorUndefined'));  // true
console.log("JSON:", cloneJSON.hasOwnProperty('valorUndefined'));              // false

console.log("null");
console.log("Original:", userSemFuncao.valorNulo);
console.log("Spread:", cloneSpread.valorNulo);
console.log("Structured:", cloneStructured.valorNulo);
console.log("JSON:", cloneJSON.valorNulo);

console.log("Lista");
console.log("Original:", userSemFuncao.lista);
console.log("Spread:", cloneSpread.lista);
console.log("Structured:", cloneStructured.lista);
console.log("JSON:", cloneJSON.lista);

cloneSpread.lista.push(4);
console.log("APÓS push(4)");
console.log("Original:", userSemFuncao.lista);   // [1,2,3,4] – afetado!
console.log("Spread:", cloneSpread.lista);       // [1,2,3,4]