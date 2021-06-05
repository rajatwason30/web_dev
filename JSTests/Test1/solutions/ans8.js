let a=parseInt(45);

let s=decToBin(a);
console.log(s);

function decToBin(a){
    let s="";
    let n=parseInt(a);
    while(n){
        let rem=parseInt(n)%parseInt(2);
        s+=rem;
        let nn=parseInt(n)/parseInt(2);
        n=nn;
    }
    return s.split("").reverse().join("").slice(1);
}