class Motorcycle extends Car{
    exibeTipo(){
        console.log(`Type:${this.type} `)
    }
}
 const motorcycle1= new Motorcycle('moto');
 motorcycle1.exibeTipo();