
const redis = require("redis");
const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on("error", (err) => {
    console.log("Error " + err);
});

async function data(){
    try{
      await client.connect();

      console.log("redis connected successfully");

        //mSet (strings)
        // await client.mSet({ name: "Rohan", age: "20", city: "Delhi" });
        // const [ name, age, city] = await client.mGet(["name", "age", "city"]);
        // console.log("name: ", name, "age: ", age, "city: ", city);

        //lists [lpush, lpop, rpush, rpop]
        //   await client.del("books"); // Delete previous list

        //   await client.lPush("books", ["book1", "book2", "book3"]);
        //   console.log(books);
        //   const book = await client.lPop("books");
        //   console.log(book);
        //   await client.rPush("books", "book4");
        //   const books = await client.lRange("books", 0, -1);

        //   console.log(books);

        // const books = await client.lRange("books", 0, -1);
        // console.log(books);
        // const book = await client.rPop("books");
        // console.log(book);

        //sets [sadd, smembers, sismember, srem]

        // await client.sAdd("user:nickName", ["john", "varun", "ronit"]);
        // const names = await client.sMembers("user:nickName");
        // console.log(names);
        // const isExist = await client.sIsMember("user:nickName", "ronit");
        // console.log(isExist);
        // await client.sRem("user:nickName", "ronit");


        //sorted sets [zadd, zcard, zscore, zrange]
        // await client.zAdd("user:age", { score: 90, value: "polly" });
        // await client.zAdd("user:age", { score: 20, value: "john" });
        // await client.zAdd("user:age", { score: 30, value: "varun" });
        // await client.zAdd("user:age", { score: 40, value: "ronit" });
        // const count = await client.zCard("user:age");
        // console.log(count);
        // const score = await client.zRangeWithScores("user:age", 0,-1);
        // console.log("score: ", score);
        // const users = await client.zRange("user:age", 0, -1);
        // console.log(users);

        //hashes 
        await client.hSet("user:1", { name: "Rohan", age: "20", city: "Delhi" });
        const user = await client.hGet("user:1", "name");
        console.log(user);

       
    }catch(error){
        console.log(error);
    }finally{
        await client.quit();
    }
}

data();