import { reportActionEnum, reportStatusEnum } from "../../utils/enums";
import mongoose  from 'mongoose';
import { reportEnum }  from '../../utils/index.js';


const reportSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
      required: true,
    },

    reportedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    reason: {
      type: String,
      enum:Object.values(reportEnum),
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum:Object.values(reportStatusEnum),
      default: 'pending',
    },

    actionTaken: {
      type: String,
      enum:Object.values(reportActionEnum),
      default: 'none',
    },
  },
  {
    collection:"App_Reports",
    timestamps: true
  }
);



module.exports = mongoose.model('Report', reportSchema);