import { User } from "../../DB/models/user.model.js";
import { catchAsync } from "../../utils/index.js";
import * as response from "../../utils/response/index.js";

//---------------------USER CONTROLLER


//GetProfile

export const getProfile = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(!user){
        return response.NotFoundException({message:"User Not Found"})
    }
    return response.successesResponse({res,message:"Success",user})
})

//Update User

// export const updateUser = catchAsync(async (req, res, next) => {
//     const { firstname, lastname } = req.body;
//     const updates = {};
//     if (firstname !== undefined) {
//         updates.firstname = firstname;
//     }
//     if (lastname !== undefined) {
//         updates.lastname = lastname;
//     }
//     const user = await User.findByIdAndUpdate(req.user._id,updates,{new: true,runValidators: true}
//     );
//     if (!user) {
//         return response.NotFoundException({message: "User Not Found"});
//     }
//     return response.successesResponse({res,message: "Success",data: user});
// });

//delete

export const deleteProfile = catchAsync(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.user._id)
    if(!user){
        return response.NotFoundException({message:"User Not Found.."})
    }

    return response.successesResponse({res,message:"User Deleted Successfully"})
})

//---------------------ADMIN CONTROLLERS

//get all users
export const getAllUsers = catchAsync(async(req,res,next)=>{
    const users = await User.find()
    if(users.length === 0){
        return response.NotFoundException({message:"Users Not Found"})
    }
    return response.successesResponse({res,message:"Success",users})
})
