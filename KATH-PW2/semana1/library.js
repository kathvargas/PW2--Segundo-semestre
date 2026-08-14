const library={
    nameLibrary:'biblioteca do IFsul',
    Geolocation(){
        console.log('localizado em x')
    }
};

const book1=Object.create(library)
book1.title='harry potter';
book1.author='JK rowling';

const book2=Object.create(library)
book2.title='harry potter 2';
book2.author='JK rowling';

console.log(book1.renewCatalog);
console.log(book2.renewCatalog);

library.renewCatalog= function(){
    console.log(`Catalogo da ${this.nameLibrary} foi renovado`)
}

book1.renewCatalog();
book2.renewCatalog();