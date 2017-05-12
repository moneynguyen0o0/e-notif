import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhraseSchema = new Schema({
  content: { type: String, required: true, maxlength: 100 },
  note: { type: String, maxlength: 250 },
  created: { type: Date, default: Date.now },
  updated: Date,
  user: String
});

export default mongoose.model('Phrase', PhraseSchema);
