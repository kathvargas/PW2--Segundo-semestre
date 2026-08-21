function createUser(name,email,role){
    return{
        name,
        email,
        role,
        displayData(){
             return `Name-${this.name}-E-mail${this.email} role:${this.role}`;
        }
    }
}
 const user1=createUser('lucas','lucas@','profile');
    console.log("User 1"+user1.displayData())
    const user2=createUser('lucas','lucas@','profile');
    console.log("User 1"+user1.displayData())
    const user3=createUser('lucas','lucas@','profile');
    console.log("User 1"+user1.displayData())