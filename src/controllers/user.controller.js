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

const registerUser = asyncHandler(async (req, res)=>{

    res.status(200)
})


export {
    registerUser
}