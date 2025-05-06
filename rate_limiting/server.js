const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const configureCors = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const {urlVersion, urlVersioning} = require("./middleware/apiVersioning");
const createBasicRateLimiter = require("./middleware/rateLimiting");
const itemRoutes = require("./routes/item-routes");

const app = express();
const PORT = process.env.PORT;

//global middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(100, 15 * 60 * 1000));
app.use(express.json());
app.use('/api/v1',urlVersioning("v1"));
app.use('/api/v1', itemRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
