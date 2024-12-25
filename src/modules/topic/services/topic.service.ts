import { ITopicDocument, Topic } from '../models/topic.model.js';
import { ITopic, ITopicTree } from '../types/topic.js';

export class TopicService {
  async getUserTopics(userId: string) {
    const topics = await Topic.find({ userId });
    const nodeMap: Record<string, ITopicTree> = {};

    const result: ITopicTree[] = [];

    topics.forEach(topic => {
      const id = String(topic._id);
      nodeMap[id] = this.formatTopicToTree(topic);
    });

    topics.forEach(topic => {
      const node = nodeMap[topic.id];
      const parent = topic.parent ? String(topic.parent) : undefined;

      if (parent && nodeMap[parent]) {
        nodeMap[parent].children.push(node);
      }

      if (!parent) {
        result.push(node);
      }
    });

    return result;
  }

  async createTopic(userId: string, topic: ITopic) {
    const newTopic = await Topic.create({
      userId,
      title: topic.title,
      confidence: topic.confidence,
      parent: topic.parent,
    });

    return {
      id: newTopic._id,
    };
  }

  async updateTopic(userId: string, topicId: string, updateTopicDto: ITopic) {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    if (String(topic.userId) !== userId) {
      throw new Error('No access');
    }

    await Topic.updateOne(
      { _id: topic._id },
      {
        title: updateTopicDto.title || topic.title,
        confidence: updateTopicDto.confidence || topic.confidence,
        parent: updateTopicDto.parent || topic.parent,
      },
    );
  }

  async deleteTopic(userId: string, topicId: string) {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    if (String(topic.userId) !== userId) {
      throw new Error('No access');
    }

    await Topic.deleteOne({ _id: topic._id });
  }

  private formatTopicToTree(topic: ITopicDocument) {
    const id = String(topic._id);
    const parent = topic.parent ? String(topic.parent) : undefined;

    return {
      id,
      parent,
      title: topic.title,
      confidence: topic.confidence,
      children: [],
    };
  }
}
