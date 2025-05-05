console.log("hello world");

//types 
let myName: string;
let myAge: number;
let myBool: boolean;

//array
let numbers : number[] = [1,2,3,4,5,6,7,8,9];
let names : Array<string> = ["john","jane","joe","jill"];

//any
let myVar : any = "hello";
myVar = 1;
myVar = false;

//undefined
let myVar1: undefined = undefined;

//null
let myVar2: null = null;

//enum
enum Direction {
    Up,
    Down,
    Left,
    Right
}

let myDirection:Direction = Direction.Up;

//tuple
let myTuple: [string, number, boolean] = ["hello", 1, true];


//interfaces
interface Person {
    id: number;
    name: string;
    age: number;
    email ?: string;   //optional
    readonly createdAt: Date;
    speak(a: string): void;
    spend(a: number): number;
}

const user: Person = {
    id: 1,
    name: "John",
    age: 30,
    email: "john@example",
    createdAt: new Date(),
    speak(text: string): void {
        console.log(text);
    },
    spend(amount: number): number {
        console.log("I spent", amount);
        return amount;
    }
}

//type
type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

const product: Product = {
    id: 1,
    name: "Laptop",
    price: 1000,
    inStock: true
}

//function with type annotation
function add(num1: number, num2: number): number {
    return num1 + num2;
}

const result = add(1,2);