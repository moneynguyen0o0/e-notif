import mongoose from 'mongoose';
import POS from '../constants/POS';

const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
  word: { type: String, required: true, maxlength: 25 },
  audio: { type: String, required: true },
  pronunciation: { type: String, required: true, maxlength: 25 },
  pos: { type: [{ type: String, enum: POS }], required: true },
  definitions: { type: [{ type: String, maxlength: 250, required: true }], required: true },
  examples: { type: [{ type: String, maxlength: 250, required: true }], required: true },
  created: { type: Date, default: Date.now },
  updated: Date,
  users: [String]
});

VocabularySchema.index({ word: 'text', definitions: 'text' });

export default mongoose.model('Vocabulary', VocabularySchema);
