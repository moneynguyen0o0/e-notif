import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
  word: String,
  pronunciation: String,
  pos: [String],
  definitions: [String],
  examples: [String],
  created: { type: Date, default: Date.now },
  updated: Date,
  users: [String]
});

VocabularySchema.index({ word: 'text', definitions: 'text' });

export default mongoose.model('Vocabulary', VocabularySchema);
