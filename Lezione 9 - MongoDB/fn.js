async function run(client) {
    try {
  
      //await client.connect();
  
      const user = await client.db("Users").collection('user').find().toArray();
  
      console.log(user);
      
    } finally {
  
      await client.close();
    }
}

module.exports = {
    run
};