const person = {
  name: 'Nome Padrão',
  age: 0,
  introduce() {
    return `Olá, me chamo ${this.name} e tenho ${this.age} anos`;
  }
};

const person1=Object.create(person);
person1.name='kath';
person1.age=18;

const person2=Object.create(person)
person2.name='lucas';
person2.age=17;

const person3=Object.create(person)
person3.name='pedro';
person3.age=19;

person1.introduce();
person2.introduce();
person3.introduce();