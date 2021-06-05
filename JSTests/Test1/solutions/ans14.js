let users = [
    {
      name: "Rajneesh",
      age: 34,
      address: {
        local: "22 Alaknanda",
        city: "Dehradun",
        state: "UK",
      },
      orders: [{ id: 1, name: "GOT Book Series" }],
    },
    {
      name: "Bhavesh",
      age: 37,
      address: {
        local: "48 DT Row",
        city: "Hyderabad",
        state: "AP",
      },
    },
    {
      name: "Jasbir",
      age: 38,
      address: {
        local: "196 Lama Bhavan",
        city: "Gangtok",
        state: "Sikkim",
      },
      orders: [
        { id: 1, name: "Chair" },
        { id: 2, name: "PS5" },
      ],
    },
  ];
  
  function addItem(i,item){
    //see if order list is present or not
    let orderFound=false;
    for(let key in users[i]){
        if(key=="orders"){
            //check if this item is already present in user orders array
            for(let j=0;j<users[i].orders.length;j++){
                if(users[i].orders[j].name==item)
                    return;
            }
            orderFound=true;
            break;
        }
    }
    if(!orderFound){
        users[i].orders=[];
    }
    let objItem={
        id:users[i].orders.length +1,
        name:item+""
    }
    users[i].orders.push(objItem);
  }

  function updateUsers(users, userObject, item="") {
    // write your code here
    // change in users global arr
    // if user doesnt exist, add user details and item in its order
    // if user exists, add item to its orders
    let f=false;
    let i=0;
    for(;i<users.length;i++){
        if(users[i]["name"]==userObject["name"]){
            f=true;
            break;
        }
    }
    if(f){
        //user found
        if(item.length>0)
            addItem(i,item);
    }
    else{
        //user not found
        users.push(userObject);
        if(item.length>0)
            addItem(i,item);
    }
    return users;
  }


  //test cases
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "GOT Book Series"
      )
    )
  );
  console.log("\n");
  console.log(
    JSON.stringify(
      updateUsers(users, {
        name: "Ravi",
        age: 24,
        address: {
          local: "25 Iroda",
          city: "Dehradun",
          state: "UK",
        },
      })
    )
  );
  console.log("\n"); 
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Ravi",
          age: 24,
          address: {
            local: "25 Iroda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Chair"
      )
    )
  );
  console.log("\n");
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Fan"
      )
    )
  );
