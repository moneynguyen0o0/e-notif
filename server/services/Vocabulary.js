import _ from 'lodash';
import Vocabulary from '../models/Vocabulary';

const getAll = (done) => {
  Vocabulary.find({}).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const create = (vocabulary, done) => {
  Vocabulary.create(vocabulary, (err, vocabulary) => {
    done(err, vocabulary);
  });
};

const update = (vocabulary, done) => {
  const { _id } = vocabulary;

  Vocabulary.findOneAndUpdate({ _id }, _.omit(vocabulary, ['_id', '__v']), { new: true }, (err, vocabulary) => {
    done(err, vocabulary);
  });
};

const remove = (_id, done) => {
  Vocabulary.findOneAndRemove({ _id }, (err) => {
    done(err);
  });
};

const findById = (_id, done) => {
  Vocabulary.findById(_id, (err, vocabulary) => {
    done(err, vocabulary);
  });
};

const getMarked = (userId, done) => {
  Vocabulary.find({ users: userId }).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const search = (params, done) => {
  const { start = 0, end = 1 } = params;

  Vocabulary.find({}).skip(start).limit(end).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

export default {
  getAll,
  findById,
  create,
  update,
  remove,
  search,
  getMarked
};
