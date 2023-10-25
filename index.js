const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const path = require('path')
const bcrypt = require('bcrypt');
const Animal = require(path.join(__dirname, 'models', 'animals.js'));
const Specific = require(path.join(__dirname, 'models', 'specific.js'));
const dataModel = require(path.join(__dirname, 'models', 'register.js'));
const userModel = require(path.join(__dirname, 'models', 'user.js'));
const newBlog = require(path.join(__dirname, 'models', 'addblog.js'))
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://yash1:yash1@cluster0.txq9fum.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set('view engine', 'ejs'); 
// Create a Mongoose model for the visitor count
const VisitorCount = mongoose.model('VisitorCount', { count: Number });

app.use(express.static('public'));

// Middleware to update visitor count
app.use(async (req, res, next) => {
  try {
    // Find the current visitor count
    const visitorCount = await VisitorCount.findOne();

    // Increment the count
    visitorCount.count += 1;
    await visitorCount.save();

    // Pass the visitor count to the request
    req.visitorCount = visitorCount.count;
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'public','index'));
});


app.get('/login',(req,res)=>{
    res.render(path.join(__dirname,'public','login'));
});


app.get('/registration',(req,res)=>{
    res.render(path.join(__dirname,'public','registration'));
});

app.post('/submit', async (req, res) => {
    try {
      // Get the data from the form
      const {
        name,
        password,
        dob,
        email,
        mobile,
        gender,
        state,
        language,
        age,
        hobby,
        favourite,
      } = req.body;
  
      // Create a new document using the model
      const newData = new dataModel({
        name,
        password,
        dob,
        email,
        mobile,
        gender,
        state,
        language,
        age,
        hobby,
        favourite,
      });
  
      // Save the document to the database
      await newData.save();
  
      res.send('Data saved to MongoDB!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data to MongoDB');
    }
  });

  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      // Authenticate the user by checking the username and password
      const user = await userModel.findOne({ name });
      console.log(user.password)
      if (!user) {
        // User not found
        return res.status(401).send('Invalid username or password- err1');
      }
  
      // Check the password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (await password!=user.password) {
        // Password is incorrect
        return res.status(401).send('Invalid username or password -err2');
      }
  
      // Password is correct, redirect to the protected page
      res.redirect('/blog');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

app.get('/blog',async(req,res)=>{
    try {
        const animals = await Animal.find();
        const vcount=req.visitorCount;
        
        res.render(path.join(__dirname, 'public', 'easy.ejs'),{animals,vcount});
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
    
})


app.get('/animal/:id',async (req, res) => {
    try {
        // const title=req.query.title; 
        // console.log('recived Title',title)
        // const specific = await Specific.findOne({ title: title });
        // console.log('Query result:', specific);

        // if (!specific) {
        //     // Handle the case where no data is found for the given title
        //     return res.status(404).send('Specific data not found');
        // }

        let slug = req.params.id;
        const specific = await Specific.findById({_id : slug});
        

        res.render(path.join(__dirname, 'views', 'animal.ejs'), { specific });
        res.status(200);
        
    } catch (error) {
        
    }
    
});
// req.query.key;
app.get('/search',async (req,res)=>{
    try { 
        const passed= await Animal.find(
            {
                "$or":[
                    {title:{$regex:req.query.key}}
                ]
            }
        )
        const animals=passed
        const vcount="You are searching";
        res.render(path.join(__dirname, 'public', 'easy.ejs'),{animals,vcount});
        
    } catch (error) {
        res.send(error);
    }
    


});


app.get('/addBlog',(req,res)=>{

    res.render(path.join(__dirname,'public','add'));
});

app.post('/added', async (req, res) => {
    try {
      // Get the data from the form
      const {
        imageSrc,
        title,
        description,
        detailed,
        author,
        conclusion,
        introduction,
        date
      } = req.body;
  
      // Create a new document using the model
      const  newData = new newBlog({
        imageSrc,
        title,
        description,
        detailed,
        author,
        conclusion,
        introduction,
        date
      });
  
      // Save the document to the database
      await newData.save();
  
      res.send('Data saved to MongoDB!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data to MongoDB');
    }
  });

app.listen(port,()=>{
    console.log(`Example app listerning at http://localhost:${port}`)
})