import { User } from "../../DB/models/user.model.js";
import { catchAsync } from "../../utils/index.js";
import * as response from "../../utils/response/index.js";

//user controller


//GetProfile

export const getProfile = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(!user){
        return response.NotFoundException({message:"User Not Found"})
    }
    return response.successResponse({res,message:"Success",user})
})

//Update User

export const updateUser = catchAsync(async (req, res, next) => {
    const { firstname, lastname } = req.body;
    const updates = {};
    if (firstname !== undefined) {
        updates.firstname = firstname;
    }
    if (lastname !== undefined) {
        updates.lastname = lastname;
    }
    const user = await User.findByIdAndUpdate(req.user._id,updates,{new: true,runValidators: true}
    );
    if (!user) {
        return response.NotFoundException({message: "User Not Found"});
    }
    return response.successResponse({res,message: "Success",data: user});
});
