// handle binary data



//allocates a buffer of 10 bytes ---> initialize all bytes with 0
const buffOne = Buffer.alloc(10)

//buffer from string
const buffTwo = Buffer.from('hello world')
console.log("buffTwo: ", buffTwo);

//buffer from array
const buffThree = Buffer.from([24,"Shyam","Mohan",48,59,"Ram"])
console.log("buffThree: ", buffThree);


//write to a buffer
buffOne.write("Rohan")
console.log("buffOne: ", buffOne);
console.log("string: ", buffOne.toString());


//read a single byte
console.log(buffTwo[0])

//slice a buffer
console.log("slice: ", buffTwo.slice(1, 4));

//concatination a buffer
console.log("concatination: ", Buffer.concat([buffTwo, buffThree])); 





