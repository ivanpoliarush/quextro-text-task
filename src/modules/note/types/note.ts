export interface INote {
  title: string;
  content: string;
  topicId: string;
  confidence: number;
  attachments: string[];
  createdAt: Date;
}
