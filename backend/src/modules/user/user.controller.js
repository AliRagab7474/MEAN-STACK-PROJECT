import { UserModel } from "../../DB/models/user.model.js";
import { catchAsync, RoleEnum , StatusEnum } from "../../utils/index.js";
import * as response from "../../utils/response/index.js";

//---------------------USER CONTROLLER


//GetProfile

export const getProfile = catchAsync(async(req,res,next)=>{
    const user = await UserModel.findById(req.user._id)
    if(!user){
        return response.NotFoundException({message:"User Not Found"})
    }
    return response.successesResponse({res,message:"Success",data:user})
})

//delete

export const deleteProfile = catchAsync(async(req,res,next)=>{
    const user = await UserModel.findByIdAndDelete(req.user._id)
    return response.successesResponse({res,message:"User Deleted Successfully"})
})

//---------------------ADMIN CONTROLLERS

//get all users
export const getAllUsers = catchAsync(async(req,res,next)=>{
    const users = await UserModel.find().select("FirstName LastName email Gender role status _id")
    if(users.length === 0){
        return response.NotFoundException({message:"Users Not Found"})
    }
    return response.successesResponse({res,message:"Success",data:users})
})

//BLock user
export const blockUser = catchAsync(async(req,res,next)=>{
   const user = await UserModel.findById(req.params.id)
   if(!user){
    return response.NotFoundException({message:"User Not Found"})
   }
   if(user.status === StatusEnum.Blocked){
    return response.BadRequestException({message:"User Is Blocked Already"})
   }   
   user.status = StatusEnum.Blocked ;
   await user.save();
   return response.successesResponse({res,message:"User Blocked Successfully",data:user})
})


//Unblock user
export const unBlockUser = catchAsync(async(req,res,next)=>{
   const user = await UserModel.findById(req.params.id)
   if(!user){
    return response.NotFoundException({message:"User Not Found"})
   }
   if(user.status === StatusEnum.Active){
    return response.BadRequestException({message:"User Is unBlocked Already"})
   }   
   user.status = StatusEnum.Active ;
   await user.save();
   return response.successesResponse({res,message:"User unBlocked Successfully",data:user})
})

//share Profile

export const shareProfile = catchAsync(async(req,res,next)=>{
    const user = await UserModel.findById(req.user._id).select("-password -createdAt -updatedAt -__v")
    
    if(!user){
        return response.NotFoundException({message:"User Not Found"})
    }
    
    if(user.status === StatusEnum.Blocked){
        return response.ErrorResponse({message:"You Can't Share Your Profile"})
    }
    
    const sharedLink =  `http://localhost:4200/user/${user._id}/shareProfile`
    
    return response.successesResponse({res,message:"Link Profile Is Ready",data:sharedLink})
})
 //get shared profile

export const getSharedProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("FirstName LastName Gender _id status")
    if (!user) {
        return response.NotFoundException({message:"User Not Found"})
    }
    // if (user.status === StatusEnum.Blocked) {
    //     return response.BadRequestException({message:"This profile is not available"})
    // }
    return response.successesResponse({res,message: "Get Profile Successfully",data: { user },});
});
