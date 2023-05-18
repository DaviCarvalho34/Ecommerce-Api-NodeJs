const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwt.js");


const createUser = asyncHandler(async (req, res) => {

    const email = req.body.email;
    
    const findUser = await User.findOne({ email:email });

    if(!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User already exists");
    }

});

const loginUser = asyncHandler(async (req,res) => {

    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials!");
    }

});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;

    try {
        
        const updateUser = await User.findByIdAndUpdate(id, {
            firstName:req?.body?.firstName,
            lastName:req?.body?.lastName,
            email:req?.body?.email,
        },
        {
            new: true,
        }
        );
        res.json(updateUser);

    } catch (error) {
        throw new Error(error);
    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

const getUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        const getUser = await User.findById(id);    
        res.json({
            getUser,
        });
    } catch (error) {
        throw new Error(error);
    }

});

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete(id);    
        res.json({
            deleteUser,
        });
    } catch (error) {
        throw new Error(error);
    }

});

const blockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    try {
        const blockUser = await User.findByIdAndUpdate(id,{
            isBlocked:true
        }, { new: true }
        );
        res.json({ message: "user blocked" });

    } catch (error) {
        throw new Error(error);
    }

});

const unblockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    try {
        const unblockUser = await User.findByIdAndUpdate(id,{
            isBlocked:false
        }, { new: true }
        );
        res.json({ message: "user unblocked" });

    } catch (error) {
        throw new Error(error);
    }

});


module.exports = { createUser, loginUser, getAllUser, getUser, deleteUser, updateUser, blockUser, unblockUser };