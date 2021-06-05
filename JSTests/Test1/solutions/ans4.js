let input={
    newObj: {
      obj2: {
        obj5: {
          one: 1,
        },
      },
    },
    obj3: {
      obj4: { two: 2 },
    },
  };
//   Sample Output:
// { 'newObj.obj2.obj5.one': 1, 'obj3.obj4.two': 2 }
function fun(input, flattenObj, keySoFar){
    //traverse object
    for(let key in input){
        if(typeof input[key] == "object"){
            fun(input[key],flattenObj,keySoFar+key+".");
        }
        else{
            flattenObj[keySoFar+key]=input[key];
        }
    }
}
let flattenObj={};
fun(input,flattenObj,"");
console.log(flattenObj);