let s="not picking";

s=s.split(" ");
// let t=s[0][0];
// s[0][0]=s[1][0];
// s[1][0]=t;
let t1=s[0][0],t2=s[1][0];
let s0=s[0].slice(1),s1=s[1].slice(1);
let ans=t1+s0 +" "+ t2+s1;
console.log(ans);