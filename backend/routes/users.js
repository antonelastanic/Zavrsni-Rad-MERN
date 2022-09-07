const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//registracija

router.post("/register", async (req, res) => {
    try{
        //auth
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if(err) throw new Error("Interal Server Error");

            	//novi korisnik
                const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

        });

        //spremanje
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//login

router.post("/login", async (req, res) => {
    try{
        //trazenje korisnika
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
          }

        //validacija lozinke
        const validPassword = await bcrypt.compare(
            req.body.password, 
            user.password,
            (err, result) => {
                if(result) {
                    return res.status(200).json({message: "Login Successful"});
                }

                console.log(err);
                return res.status(401).json({ message: "Invalid Credentials" });
            
        });
        
    } catch(err){
        console.log(err);
        res.status(401).send(err.message);
    }
});

module.exports = router;