import { reportActionEnum, reportStatusEnum } from "../../utils/index.js";
import mongoose  from 'mongoose';
import { reportEnum }  from '../../utils/index.js';


const reportSchema = new mongoose.Schema(
  {
    messageId: {
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



export  const reportModel = mongoose.model('Report', reportSchema);