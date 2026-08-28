const user={
    name:'kath',
    birthdate:new Date(2008,5,9),

    calculateAge(){
        const atual=new Date()
        let age=atual.getFullYear()-this.birthdate.getFullYear();
        const mes=atual.getMonth()-this.birthdate.getMonth();
        if(mes<0||(mes===0 && atual.getDate()<this.birthdate.getDate()))
        {
            age--;
        }
        return age;

    },
    valor:undefined,

}
console.log("objeto original",user);
console.log("Tipos das coisas",typeof user.birthdate, typeof user.calculateAge, user.valor);

const userClone=JSON.parse(JSON.stringify(user));
console.log("Perdas:",userClone,typeof userClone.birthdate,typeof userClone.calculateAge,typeof userClone.valor);

console.log('Oque restou',Object.keys(userClone),userClone.name,userClone.birthdate);

console.log("idade original pela function",user.calculateAge())//undefinided

console.log("ano de nascimento",user.birthdate.getFullYear());