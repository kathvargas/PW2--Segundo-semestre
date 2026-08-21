function createAccount(initialBalance=0){
    let balance=initialBalance;

    if(balance<0){
        console.warn('Saldo inicial não pode ser negativo');
        balance=0;
    }
    return{
        getBalance(){
            return balance;
        },
        deposit(amount){
            if(amount<=0){
                console.warn('valor de deposito deve ser positivo');
                return this;
            }
            balance+=amount;
            console.log(`Deposito de R$${amount.toFixed(2)}. Saldo atual${balance.toFixed(2)}`);
            return this;
        },
        withdraw(amount){
            if(amount<=0){
                console.warn("Valor de saque deve ser Positivo");
                return this;
            }
            if(amount>balance){
                console.warn(`Saldo insuficiente. Saldo atual${balance.toFixed(2)} `);
                return this;
            }
            balance-=amount;
            console.log(`Saque de R$ ${amount.toFixed(2)}. Saldo atual${balance.toFixed(2)}`)
            return this;
        }
    };
}
const account1=createAccount(100);
account1.deposit(50);
account1.withdraw(30);
account1.withdraw(200);
console.log('Saldo funcional:'+account1.getBalance());