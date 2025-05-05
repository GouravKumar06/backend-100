import express, { Express, NextFunction, Request, Response } from 'express';
const app : Express  = express();

const port = 3000;


app.use(express.json());

interface customRequest extends Request {
    startTime ?: number;
}

//middleware -> add start time to requset 
app.use((req : customRequest, res : Response, next : NextFunction) => {
    req.startTime = Date.now();
    next();
})


app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
});

interface User {
    name : string;
    email : string;
}

//post route -> new user -> name,email
app.post('/users', (req : Request<{},{},User>, res : Response) => {
    const { name, email } = req.body;
    res.json({
        message: `User ${name} with email ${email} created successfully`,
    });
})


app.get('/user/:id', (req : Request<{id : string}>, res : Response) => {
    const { id } = req.params;
    res.json({
        message: `User with id ${id} retrieved successfully`,
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);    
});

