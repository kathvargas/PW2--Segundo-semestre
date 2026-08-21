//literal
const product= {
    name:"iphone 15",
    price:3.00,
    category:1,

    getInfo(){
        return `${this.name}-R$${this.price.toFixed(2)} categoria:${this.category}`
    }
}
console.log("Literal:"+product.getInfo());
//product New
const productNew= new Object();
productNew.name='Samsung 20';
productNew.category='Smartphones';
productNew.price=1500.00;
productNew.getInfo=function(){
        return `${this.name}-R$${this.price.toFixed(2)} categoria:${this.category}`;
}
console.log("NewProduct():"+productNew.getInfo())
//Factory Function
function createProduct(name,category,price){
    return{
        name,
        category,
        price,
        getInfo(){
             return `${this.name}-R$${this.price.toFixed(2)} categoria:${this.category}`;
        }
    }
   
}
 const productFactory=createProduct('pc gamer','Eletrônicos',5.000);
    console.log("Product Factory:"+productFactory.getInfo())
//Object Create
const productCreate={
    getInfo(){
             return `${this.name}-R$${this.price.toFixed(2)} categoria:${this.category}`;
        }
}
productCreate.name="fone redmi";
productCreate.category='Acessórios';;
productCreate.price=50;

console.log('Object create():'+productCreate.getInfo());

