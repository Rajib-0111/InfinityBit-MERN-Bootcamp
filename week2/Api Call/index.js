function fakeApiCall(){
  return new Promise((resolve, reject) => {
    console.log("Fetching Data.....");
    setTimeout(() => {
      if(Math.random() > 0.5){
        resolve("Api Called Successfully....");
      }
      else{
        reject("Api Call Unsuccessful....");
      }
    }, 3000);
  });
}

fakeApiCall()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

async function apicall(){
  try{
    const result = await fakeApiCall();
    console.log(result);
  }
  catch(err){
    console.error(err);
  }
}

apicall();