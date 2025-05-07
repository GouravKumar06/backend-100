
const redis = require("redis");
const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on("error", (err) => {
    console.log("Error " + err);
});

async function test(){
    try{
        await client.connect();
      
        console.log("redis connected successfully");

        // await client.set("name", "ronit singh");
        // const naam = await client.get("name");
        // console.log(naam);
        // const deleted = await client.del("naam");
        // console.log(deleted);

        await client.set('count',100);
        const count = await client.incr('count');
        console.log(count);
    }catch(error){
        console.log("error: ", error);
    }finally{
        await client.quit();
    }
}

test();