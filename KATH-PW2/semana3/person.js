const person={
    name:'kath',
    age:'18',
    adress://aninhamento
        {street:'Padre pinto',
            city:'Sao Jeo'},
}
const shallowPerson={...person};//compartilha dados

const deepPerson=structuredClone(person);//independente

shallowPerson.adress.city='RJ';
deepPerson.adress.city='BH';

console.log("Person Original:",person.adress.city);
console.log("Person Shallow:",shallowPerson.adress.city);
console.log("Person Deep:",deepPerson.adress.city);