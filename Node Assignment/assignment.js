//array of products
//write a get api for products by ID
//get api for products by category
//post api
//put api by id

const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());
Data = [

    {

        id: 1,

        name: "lenovo",

        total_quantity: 12,

        type_of_product: "electronics",

        price: 300

    },



    {
        id: 2,
        name: "dell",
        total_quantity: 40,
        type_of_product: "gaming_pc",
        price: 151000
    },
    {
        id: 3,
        name: "Asus",
        total_quantity: 90,
        type_of_product: "consumer_electronics",
        price: 137000
    },
    {
        id: 4,
        name: "goxstrix",
        total_quantity: 70,
        type_of_product: "core_gaming",
        price: 125000
    },
    {
        id: 5,
        name: "msi",
        total_quantity: 13,
        type_of_product: "affordable_gaming",
    },

];

app.get("/", function (req, res) {
    res.send("Hello World");
});
app.get("/Data", function (req, res) {
    res.send(Data);
});

// Get request by ID
app.get("/Data/:id", function (req, res) {
    let dataID = req.params.id;
    var data = Data.find((c) => c.id === parseInt(DataID));
    if (!Data) {
        res.status(404).send("Data not found");
    } else {
        res.send(Data);
        // res.json({
        //   courses: course,
        //   status: "succesfully done",
        // });
    }
});

// Get request by category
app.get("/Data/:category", function (req, res) {
    let categoryname = req.params.category;
    var product = Data.filter((c) => c.category === categoryname);

    if (!product) {
        res.status(404).send("Category not found");
    } else {
        res.send(product);
        // res.json({
        //   courses: course,
        //   status: "succesfully done",
        // });
    }
});

app.post("/Data", function (req, res) {
    const validateResult = validateData(req.body);
    console.log(validateResult);

    if (validateResult.error) res.send(validateResult.error);
    else {
        var product = {
            id: Data.length + 1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        Data.push(product);
        res.send(Data);
    }
});

//PUT method

app.put("/Data/:id", function (req, res) {
    const validateResult = validateData(req.body);
    console.log(validateResult);

    if (validateResult.error) res.send(validateResult.error);
    else {
        let productsID = req.params.id;
        var productIndex = Data.findIndex((c) => c.id === parseInt(productsID));
        Data[productIndex].name = req.body.name;
        Data[productIndex].price = req.body.price;
        DataTransfer[productIndex].category = req.body.category;

        res.send(products);
    }
});

function validateData(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(1).required(),
        category: Joi.string().min(1).required(),
    });

    try {
        const result = schema.validate(product);
        return result;
    } catch (err) {
        return err;
    }
}

//Delete function

app.listen(3000);
console.log("Running the server on port 3000");
