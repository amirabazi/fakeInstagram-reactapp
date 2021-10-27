const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { response } = require('express');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlpw',
    database: 'fakeinstagram',
});
db.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    key: 'user',
    secret:"secret-key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: 9999999,
        secure:true
    },
}))

app.post('/register', (req,res)=>{    
    username = req.body.username;
    password = req.body.password;
    const regQuery = "INSERT INTO users (username,password) VALUES (?,?)"
    db.query(regQuery,[username,password], (error,result)=>{
        if(error){
            console.log(error);
        }else {
            console.log(result);
        }
        res.send(result);      
    });   
});

app.post('/login', (req,res)=>{
    username=req.body.username;
    password=req.body.password;
    
    const logQuery = "SELECT * FROM users WHERE username = ?"
    db.query(logQuery,[username,password], (error,result)=>{
        if(result === undefined || result[0] === undefined){
            res.send({msg:'noUser'})
        }else if( result[0].password !== password){
            res.send({msg:'pwErr'});
        }
        else{
            req.session.user=result;   
            console.log('req session: ', req.session.user);         
            res.send({msg:'logged', result: result})
        }      
          
    })
})

app.get('/login', (req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true,
                 user: req.session.user,
                })
    }else{
        res.send({loggedIn:false})
    }
})

app.post('/addstory', (req,res)=>{
    storyUrl = req.body.storyUrl;
    userid = req.body.userid;
    const addStoryQuery = "INSERT INTO stories (storyimg,userstoryid) VALUES (?,?)";
    db.query(addStoryQuery,[storyUrl,userid], (error,result)=>{
        console.log(result);
        if(result===undefined){
            res.send({msg:'empty'})
        }else{
        res.send(result);
        }
    })
})

app.post("/addpost", (req,res)=>{
    imgUrl = req.body.imgUrl;
    caption = req.body.caption;
    userid = req.body.userid;

    const addPostQuery = "INSERT INTO posts (postimg,postcaption,userpostid) VALUES (?,?,?)";
    db.query(addPostQuery,[imgUrl,caption,userid],(error, result)=>{
        console.log(result);
    })
})

app.post("/editprofile", (req,res)=>{
    userName = req.body.name;
    place = req.body.place;
    about = req.body.about;
    avatar = req.body.avatar;
    userid = req.body.userid;

    const editProfileQuery = "UPDATE users SET avatar = ?, name = ?, placeFrom = ?, about = ? WHERE (iduser = ?);";
    db.query(editProfileQuery,[avatar,userName,place,about,userid],(error, result)=>{
        console.log(result);
        console.log(error);
    })
})

app.get("/showposts",(req,res)=>{
    const showPostsQuery = "SELECT * FROM posts INNER JOIN users WHERE userpostid = iduser";
    db.query(showPostsQuery, (error,result)=>{
        res.send(result);
    })
})

app.get('/showstory', (req,res)=>{
    const showStoryQuery = "SELECT * FROM stories INNER JOIN users WHERE userstoryid = iduser";
    db.query(showStoryQuery, (error,result)=>{
        if(error){
            console.log(error);
        }else{
        res.send(result);
        }
    })
})

app.post('/profiledata', (req,res)=>{
    userid = req.body.userid;
    const profileDataQuery = "SELECT * FROM users WHERE iduser = ?"
    db.query(profileDataQuery,[userid],(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result);
        }
    })
})

app.post('/profileposts', (req,res)=>{
    userid = req.body.userid;
    const porfilePostsQuery = "SELECT * FROM posts WHERE userpostid = ?"
    db.query(porfilePostsQuery,[userid],(error,result)=>{
        if(error){
            console.log(error)
        }else{
            console.log(result)
            res.send(result);
        }
    })
})





app.listen(3005)