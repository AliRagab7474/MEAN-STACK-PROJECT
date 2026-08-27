export type ReportStatus = 'pending' | 'resolved' | 'dismissed';
export type ReportAction = 'none' | 'message deleted' | 'sender banned';
export type ReportReason = 'harassment' | 'hate speech' | 'spam' | 'threat' | 'other';

export interface ReportMessageReference {
  _id: string;
  content?: string;
  senderId?: string;
  receiverId?: string;
  createdAt?: string;
}

export interface ReportUserReference {
  _id: string;
  FirstName?: string;
  LastName?: string;
  email?: string;
  status?: string;
}

export interface Report {
  _id: string;
  messageId: string | ReportMessageReference;
  reportedBy?: string | ReportUserReference;
  senderId?: string | ReportUserReference;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  actionTaken?: ReportAction;
  createdAt?: string;
}