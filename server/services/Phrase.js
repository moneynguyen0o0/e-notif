import _ from 'lodash';
import Phrase from '../models/Phrase';

const getAll = (done) => {
  Phrase.find({}).sort({ created: 'desc' }).exec((err, phrases) => {
    done(err, phrases);
  });
};

const create = (phrase, done) => {
  phrase = _.pick(phrase, ['content', 'note', 'user']);

  Phrase.create(phrase, (err, phrase) => {
    done(err, phrase);
  });
};

const update = (phrase, done) => {
  phrase = _.pick(phrase, ['_id', 'content', 'note']);

  const { _id } = phrase;

  phrase.updated = new Date();

  Phrase.findOneAndUpdate({ _id }, _.omit(phrase, ['_id', '__v']), { new: true }, (err, phrase) => {
    done(err, phrase);
  });
};

const remove = (_id, done) => {
  Phrase.findOneAndRemove({ _id }, (err) => {
    done(err);
  });
};

const getAllByUser = (userId, done) => {
  Phrase.find({ user: userId }).sort({ created: 'desc' }).exec((err, phrases) => {
    done(err, phrases);
  });
};

export default {
  getAll,
  create,
  update,
  remove,
  getAllByUser
};
