import cors from "cors"
import express from "express"
import mysql from "mysql"

// initialize an instance of the express framework.
const app = express()

// setup connection to mysql db
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Omonoialaos9",
    database: "test"
})

// middleware to parse incoming request bodies as JSON
app.use(express.json())

app.use(cors())

app.get("/", (req,res) => { 
     res.json("hello this is the backend")
})

// retrieve data from the `books` table
app.get("/books", (req,res)=>  { 
    const q = "select * from books"
    db.query(q, (err,data)=> { 
         if(err) return res.json(err)
         return res.json(data)
    })
})

app.post("/books", (req,res)=> { 
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";

     // Extracts values for the book record from the request body
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    // Executes the SQL query to insert the new book record
    db.query(q,[values], (err,data) => { 
        if(err) return res.json(err)
        return res.json("book created succesfully")
    })
})

app.delete("/books/:id", (req,res)=> { 
    const bookId = req.params.id

    const q = "delete from books where id=?"

    db.query(q,[bookId], (err,data)=> { 
        if(err) return res.json(err)
        return res.json("book deleted succesfully")
    })
})


app.put("/books/:id", (req,res)=> { 
    const bookId = req.params.id

    const q = "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
     ]
    db.query(q,[...values, bookId], (err,data)=> { 
        if(err) return res.json(err)
        return res.json("book has been updated succesfully")
    })
})


app.listen(8800, () =>  { 
    console.log("connected to backend")
})