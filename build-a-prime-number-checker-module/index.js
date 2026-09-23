function isPrime(number){
    count=0
    for(i=1;i<=number;i++){
        if(number%i==0)
            count++
    }
    if(count==2)
        return true
    else
        return false
}

module.exports={
    isPrime
}

console.log(isPrime(4))