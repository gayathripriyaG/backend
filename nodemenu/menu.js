const ps = require("prompt-sync")

const prompt = ps({sigint:true})

let option = prompt("Enter 1,2 or 3?")
  
if(option == 1){
    console.log("the list of books\n 1.The 5 am club \n 2.The power of your subconscious mind \n 3.Atomic Habits" )
}
else if(option == 2){
    let name = prompt("Enter the book name :")
    console.log("successfully added")
}
else if(option == 3){
    let ques = prompt("Are you sure you want to quit - press Y to quit")
    console.log("BYe BYe!")
}
else{
    console.log("You have selected an invalid entry so please press 1, 2 or 3")
    
}

