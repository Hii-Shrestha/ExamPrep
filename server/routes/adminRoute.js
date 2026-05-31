const Admin = require('../models/Admin');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const admin = await new Admin(req.body);
        await admin.save();
        return res.status(200).json("Admin registered successfully");
    } catch (error) {
        return res.status(500).json({ message: "Server error while registering admin" ,error: error.message});
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();
        res.status(201).json({ message: "Admin Registered Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Signup Failed" });
    }
});


// admin login route
router.post('/login', async (req, res) => { 
    try{
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" })
    }
    if (admin.password == password) {
        return res.json({
            message: "Login Successfully", admin: {
                role: 'admin',
                id: admin._id,
                email: admin.email
            }
        });
    }
    else {
        return res.status(401).json({ message: "Username or password Incorrect" })
    }
}
    catch (error) {
        return res.status(500).json({ message: "Server error while logging in admin" ,error: error.message});
    }
})

// change password logic
router.put('/change/:email',async(req,res)=>{
    const {op,np,cnp} = req.body;
    const admin = await Admin.findOne({email:req.params.email});    
    if(!admin){
        return res.status(404).json({message:"Admin not found"})
    }
    if(admin.password !== op){
        return res.json({message:"Old Password is Incorrect"})
    }  
    if(np !== cnp){
        return res.json({message:"New Password and Confirm Password do not match"})
    }
    try{
      const updatedAdmin = await Admin.findOneAndUpdate(
        { email: req.params.email },
        { password: np },
        { new: true }
      );
      if (updatedAdmin) {
        return res.json({ message: "Password Changed Successfully" });
      } else {
        return res.status(404).json({ message: "Admin not found" });
      }
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: "Server error while changing password" });
    }
})
module.exports = router