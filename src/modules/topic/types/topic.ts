export interface ITopic {
  title: string;
  parent?: string;
  confidence?: number;
}

export interface ITopicTree extends ITopic {
  id: string;
  children: ITopicTree[];
}
