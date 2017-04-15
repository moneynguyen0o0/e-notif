import _ from 'lodash';
import Vocabulary from '../models/Vocabulary';

const getAll = (done) => {
  Vocabulary.find({}).exec((err, vocabularies) => {
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

  Vocabulary.findOneAndUpdate({ _id }, _.omit(vocabulary, ['_id', '_v']), { new: true }, (err, vocabulary) => {
    console.log(vocabulary);
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

export default {
  getAll,
  findById,
  create,
  update,
  remove
};
