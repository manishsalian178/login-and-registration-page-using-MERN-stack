const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb url/employees")

app.post('/Register',(req,res)=>
        EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.lson(err))
)

app.post('/', (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record found");
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            res.status(500).json("Internal server error");
        });
});


app.listen(3001,()=>{
    console.log("server is running")
})
