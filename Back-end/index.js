const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const employeeRouter = require('./routes/employeeRouter.js');
const dishRouter = require('./routes/dishRouter.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/employees', employeeRouter);
app.use('/dishes', dishRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
