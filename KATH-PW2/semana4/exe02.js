const config1={
    name:'smarthphone'
}
Object.freeze(config1);
config1.name='celular'
config1.valor=20;
delete config1.name;

console.log("Config Object freeze",config1);

console.log('Is frozen:',Object.isFrozen(config1));
console.log('Is sealed:',Object.isSealed(config1));
console.log('Is extensible:',Object.isExtensible(config1));

const config2={
    name:'notebook'
}
Object.seal(config2);
config2.name='pc'
config2.valor=50;
delete config2.name;

console.log("Config Object seal",config2);

console.log('Is frozen:',Object.isFrozen(config2));
console.log('Is sealed:',Object.isSealed(config2));
console.log('Is extensible:',Object.isExtensible(config2));

const config3={
    name:'tv led'
}
Object.preventExtensions(config3);
config3.name='televisao'
config3.valor=120;
delete config3.name;

console.log("Config Object preventExtensions",config3);

console.log('Is frozen:',Object.isFrozen(config3));
console.log('Is sealed:',Object.isSealed(config3));
console.log('Is extensible:',Object.isExtensible(config3));
