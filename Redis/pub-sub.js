// publisher -> send -> channel => subscriber -> receive -> channel

const redis = require('redis');
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

        // const subscriber = client.duplicate(); // duplicate the client ->shares the same connection

        // await subscriber.connect(); // connect the subscriber to the redis server

        // await subscriber.subscribe('dummy',(message,channel)=>{
        //     console.log(`received message ${message} on channel ${channel}`);
        // })

        // //publish message to channel
        // await client.publish("dummy", "this is my first message");

        // await client.publish("dummy", "this is my second message");

        // await new Promise((resolve)=> setTimeout(resolve,5000));

        // await subscriber.unsubscribe('channel');

        // await subscriber.quit(); // disconnect the subscriber


        //pipelinining & transactions
        // const multi = client.multi();
        // multi.set('tran-1',"value1");
        // multi.set("tran-2","value2");

        // multi.get("tran-1");
        // multi.get("tran-2");

        // const results = await multi.exec();
        // console.log(results);

        // pipelining 
        // const pipeline = client.multi();
        // pipeline.set("pipe-1","value1");
        // pipeline.set("pipe-2","value2");
        // pipeline.get("pipe-1");
        // pipeline.get("pipe-2");
        // const results = await pipeline.exec();
        // console.log(results);

        //transactions
        console.time("transaction without pipelining");

        for(let i = 0; i < 10000; i++){
            await client.set(`key-${i}`,`value-${i}`);
        }
        console.timeEnd("transaction without pipelining");

        console.time("transaction with pipelining");

        const pipeline = client.multi();
        for(let i = 0; i < 10000; i++){
            pipeline.set(`key-${i}`,`value-${i}`);
        }
        const results = await pipeline.exec();
        console.timeEnd("transaction with pipelining");
        

    }catch(error){
        console.log("error: ", error);
    }finally{
        await client.quit();
    }    
}

test();