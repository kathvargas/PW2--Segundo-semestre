const Vehicle = {
  type: 'Tipo Padrão',
  
  exibirTipo() {
    console.log(`O tipo do veiculo:${this.type}`);
  }
};

const Car=Object.create(Vehicle);
Car.type='carro';
Car.brand='modelo padrão';
Car.exibirBrand = function() {
  console.log(`O modelo: ${this.brand}`);
};
     


const myCar=Object.create(Car);
myCar.type='fiat';
myCar.brand='uno';
myCar.nomeDono='kath';
myCar.exibirTipo();
myCar.exibirBrand();
 
console.log(Object.getPrototypeOf(myCar)===Car);
console.log(Object.getPrototypeOf(Car)===Vehicle);
console.log(Object.getPrototypeOf(Vehicle)===Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype)===null);