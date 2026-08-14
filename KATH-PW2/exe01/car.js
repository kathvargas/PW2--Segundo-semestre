class Car{
    constructor(brand, model, year){
        this.brand=brand;
        this.model=model;
        this.year=year;
    }

    info(){
        console.log(`Marca:${this.brand} Modelo:${this.model} year:${this.year}`)
    }
}

    const car1= new Car('fiat','argo',2015);
    car1.info();