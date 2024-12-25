import { Topic } from '../../topic/models/topic.model.js';
import Note from '../models/note.model.js';
import { INote } from '../types/note.js';

export class NoteService {
  async getTopicNotes(topicId: string, userId: string) {
    await this.checkTopic(topicId, userId);
    const notes = await Note.find({ topicId });
    return notes;
  }

  async createNote(userId: string, note: INote) {
    await this.checkTopic(note.topicId, userId);

    const newNote = await Note.create({
      title: note.title,
      topicId: note.topicId,
      content: note.content,
      confidence: note.confidence,
      attachments: note.attachments,
    });

    return {
      id: newNote._id,
    };
  }

  async updateNote(noteId: string, userId: string, updateNoteDto: INote) {
    const note = await Note.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    await this.checkTopic(String(note.topicId), userId);

    await Note.updateOne(
      {
        _id: note._id,
      },
      {
        title: updateNoteDto.title || note.title,
        content: updateNoteDto.content || note.content,
        topicId: updateNoteDto.topicId || note.topicId,
        confidence: updateNoteDto.confidence || note.confidence,
        attachments: updateNoteDto.attachments || note.attachments,
      },
    );
  }

  async deleteNote(noteId: string, userId: string) {
    const note = await Note.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    await this.checkTopic(String(note.topicId), userId);

    await Note.deleteOne({
      _id: note._id,
    });
  }

  private async checkTopic(topicId: string, userId: string) {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    if (String(topic.userId) !== userId) {
      throw new Error('No access');
    }

    return topic;
  }
}
