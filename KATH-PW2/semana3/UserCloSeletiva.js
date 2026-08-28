const userCloSeletiva={
    name:'kath',
    password:'235353',
    cpf:'24938529',
    cartaoCredito:9324203
}
function cloneWithoutSensitive(obj,sensitiveKeys=['password','cpf','cartaoCredito']){
    let clone;
    if(typeof structuredClone==='function'){
        clone=structuredClone(obj);
    } else {
        clone=JSON.parse(JSON.stringify(obj))
    }

    function removeSensitive(target,keys){
if(typeof target !=='object' || target===null)
    return;
for(let key of Object.keys(target)){
    if(keys.includes(key)){
        delete target[key]
    }else if(typeof target[key]==='object' && target[key]!==null){
        removeSensitive(target[key],keys)
    }
        }
    }
   removeSensitive(clone,sensitiveKeys);
   return clone;
}

const userLimpo=cloneWithoutSensitive(userCloSeletiva);

console.log('Original',userCloSeletiva);
console.log('Limpo',userLimpo);

console.log('Verificando');
console.log('Original tem password?', userCloSeletiva.hasOwnProperty('password'));   // true
console.log('Clone tem password?', userLimpo.hasOwnProperty('password'));           // false
console.log('Original tem cpf?', userCloSeletiva.hasOwnProperty('cpf'));           // true
console.log('Clone tem cpf?', userLimpo.hasOwnProperty('cpf'));                     // false
console.log('Original tem cartaoCredito?', userCloSeletiva.hasOwnProperty('cartaoCredito')); // true
console.log('Clone tem cartaoCredito?', userLimpo.hasOwnProperty('cartaoCredito')); 