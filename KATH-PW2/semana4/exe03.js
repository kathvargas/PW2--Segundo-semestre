const obj={
    name:'kath',
    nascimento:{
        idade:20,
        data:'09/06'
    },
    campus:{
        curso:{
            ano:'terceiro ano'
        }
    }
}
    function deepFreeze(obj){
        Object.keys(obj);
        for (const chaves of chaves){
            const valor=obj[chave];
            if (typeof valor=== 'object' && valor !==null){
                deepFreeze(valor)
            }
        }
        return Object.freeze(obj);
    }

    deepFreeze(obj);

    obj.name='lucas';
    obj.nascimento.idade=19;
    obj.campus.curso.ano='segundo ano';

    console.log(obj.name);
    console.log(obj.nascimento.idade);
    console.log(obj.campus.curso.ano);

    console.log(Object.isFrozen(obj));
console.log(Object.isFrozen(obj.nascimento));
console.log(Object.isFrozen(obj.campus));
console.log(Object.isFrozen(obj.campus.curso));