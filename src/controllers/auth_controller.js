import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs"



export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all field must be filled" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" })
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      // generate JWT token here
      generateToken(newUser._id, res)
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      })

    } else {
      return res.status(400).json({ message: "invalid user data" })

    }


  } catch (error) {
    console.log("error in signup controller", error.message)
    res.status(500).json({ message: "server error" })

  }

}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message: "invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({message: "Invalid credentials"})
    }


    generateToken(user.id, res)

    const {password: hashPassword, ...rest} = user._doc

    res.status(200).json({...rest,})
    
  } catch (error) {
    console.log('error in login controller')
    res.status(500).json({message: "Internal server error"})
    
  }

}

export const logout =async (req, res) => {

  try {
    res.cookie("chat-app", "",{

      maxAge: 0
    })
     res.status(200).json({message: "logged out successfully"})
    
  } catch (error) {
    console.log("error in logout controller", error)
    res.status(500).json({message: "internal server error"})
    
  }
  
}


export const updateProfile  = async (req, res) => {

  try {
    const{profilePic} = req.body
    const userId = req.user._id
    if(!profilePic){
      return res.status(400).json({message: "profilePic is required"})
    }
    
    const uploadResponse = await cloundinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new: true})

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log('error in updateprofile', error)
    res.status(500).json({message: "internal server error"})
    
  }
  
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('error in checkAuth', error)
    res.status(500).json({message: "internal server error"})
  }
}