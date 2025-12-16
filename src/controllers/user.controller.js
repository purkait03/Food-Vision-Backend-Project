import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const options = {
    httpOnly : true,
    secure: true
}


const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave : false });

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Somthing went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res)=>{

    const {username, email, fullname, password} = req.body

    if([username, email, fullname, password].some((field)=> field.trim() === ""))
    {
        throw new ApiError(400, "all fields are requierd")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(401, "The user with username and email is already exist")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
        throw new ApiError(500, "Somthing went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "The user is registered successfully")
    )
})


export {
    registerUser
}