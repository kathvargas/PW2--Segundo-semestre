const studentPai={
    grade1:10,
    grade2:8, 
    grade3:6,

    calculateAverage(){
        const nota=(this.grade1+this.grade2+this.grade3)/3
        console.log(`Nota do aluno: ${nota}`)
    }
}

const student1=Object.create(studentPai);
student1.grade1=5;
student1.grade2=7;
student1.grade3=9;

student1.calculateAverage();

console.log(student1.hasOwnProperty('grade1'));
console.log(student1.hasOwnProperty('grade2'));
console.log(student1.hasOwnProperty('grade3'));
console.log(student1.hasOwnProperty('calculateAverage'));

console.log(studentPai.grade1);
console.log(studentPai.grade2);
console.log(studentPai.grade3);