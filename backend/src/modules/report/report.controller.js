import {
  create,
  deleteOne,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  MessageModel,
  reportModel,
  updateOne,
  UserModel,
} from "../../DB/index.js";
import {
  BadRequestException,
  catchAsync,
  NotFoundException,
  reportActionEnum,
  reportStatusEnum,
  StatusEnum,
  successesResponse,
  UnauthorizedException,
} from "../../utils/index.js";

export const reportMessage = catchAsync(async (req, res, next) => {
  const messageId = req.params.messageId;
  const { description, reason } = req.body;

  const message = await findById({
    model: MessageModel,
    id: messageId,
  });

  if (!message) {
    return NotFoundException({ message: "message not found" });
  }

  const isReceiver = req.user._id.toString() === message.receiverId.toString();

  if (!isReceiver) {
    return UnauthorizedException({
      message: "you can not report this message",
    });
  }

  const checklist = await findOne({
    model: reportModel,
    filter: { messageId: messageId },
  });

  if (checklist) {
    return BadRequestException({ message: "you have already done report" });
  }

  const report = await create({
    model: reportModel,
    data: {
      messageId: messageId,
      reportedBy: req.user._id,
      description,
      reason,
    },
  });

  return successesResponse({
    res,
    status: 201,
    message: "your report was added successfully",
    data: report,
  });
});

//Update Report
export const patchReport = catchAsync(async (req, res, next) => {
  const reportId = req.params.reportId;
  const { actionTaken } = req.body || {};

  const report = await findById({
    model: reportModel,
    id: reportId,
  });

  if (!report) {
    return NotFoundException({ message: "report not found" });
  }

  const messageId = report.messageId;

  const message = await findById({
    model: MessageModel,
    id: messageId,
  });

  if (!message) {
    return NotFoundException({ message: "message not found" });
  }
  const userId = message.senderId;

  const user = await findById({
    model: UserModel,
    id: userId,
  });
  if (!user) {
    return NotFoundException({ message: "user not found" });
  }

  switch (actionTaken) {
    case reportActionEnum.Message_Deleted:
      await findOneAndDelete({
        model: MessageModel,
        filter: { _id: messageId },
      });
      report.actionTaken = reportActionEnum.Message_Deleted;
      report.status = reportStatusEnum.Resolved;
      await report.save();
      return successesResponse({
        res,
        message: "Report Solved , Message Deleted",
        data: report,
      });

    case reportActionEnum.Sender_Banned:
      await findOneAndDelete({
        model: MessageModel,
        filter: { _id: messageId },
      });
      report.actionTaken = reportActionEnum.Sender_Banned;
      report.status = reportStatusEnum.Resolved;
      await report.save();
      user.status = StatusEnum.Blocked;
      await user.save();
      return successesResponse({
        res,
        message: "Report Solved , User Banned - Message Deleted",
        data: report,
      });

    default:
      report.status = reportStatusEnum.Dismissed;
      await report.save();
      return successesResponse({
        res,
        message: "Report Dismissed , No Action Taken ",
        data: report,
      });
  }
});

//get all report ------------- ADMIN

export const getReports = catchAsync(async (req, res, next) => {
  const reports = await reportModel
    .find()
    .populate("reportedBy", "FirstName LastName ")
    .populate("messageId", "content")
    .select("_id reason status reportedBy messageId");
  if (reports.length === 0) {
    return NotFoundException({ message: "No Reports Founded" });
  }

  //if m or u deleted
  const data = reports.map((report) => ({
    ...report.toObject(),
    messageId: report.messageId ? report.messageId : "Message Deleted",
    reportedBy: report.reportedBy ? report.reportedBy : "User Deleted",
  }));
  return successesResponse({ res, message: "All Reports", data: data });
});

//get report by ID ---------------ADMIN   :id/getReport

export const getReport = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const report = await reportModel
    .findById(reportId)
    .populate("reportedBy", "FirstName LastName email")
    .populate("messageId", "content senderId receiverId createdAt")
    .select(
  "_id messageId reportedBy reason status actionTaken description createdAt"
);
  if (!report) {
    return NotFoundException({ message: "Report Not Found" });
  }

  //if m or u deleted
  const data = {
    ...report.toObject(),

    messageId: report.messageId
      ? report.messageId
      : "Message Deleted",

    reportedBy: report.reportedBy
      ? report.reportedBy
      : "User Deleted",
  };
  return successesResponse({
    res,
    message: "Details Of The Report",
    data: data,
  });
});

export const getMyReports = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const report = await find({
    model:reportModel,
    filter: { reportedBy: userId },
    select:"status actionTaken messageId"
  });
  if (!report) {
    return NotFoundException({ message: "you have no reports" });
  }
  return successesResponse({
    res,
    message: "Details Of your Reports",
    data: report,
  });
});
