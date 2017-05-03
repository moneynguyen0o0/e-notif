import _ from 'lodash';
import moment from 'moment';
import Vocabulary from '../models/Vocabulary';

const getAll = (done) => {
  Vocabulary.find({}).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const create = (vocabulary, done) => {
  vocabulary = _.pick(vocabulary, ['word', 'audio', 'pronunciation', 'pos', 'definitions', 'examples']);

  Vocabulary.create(vocabulary, (err, vocabulary) => {
    done(err, vocabulary);
  });
};

const update = (vocabulary, done) => {
  vocabulary = _.pick(vocabulary, ['_id', 'word', 'audio', 'pronunciation', 'pos', 'definitions', 'examples', 'users']);

  const { _id } = vocabulary;

  vocabulary.updated = new Date();

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
  const { keyword, start = 0, end = 10 } = params;

  const criteria = {};

  if (keyword) {
    criteria['$text'] = { $search : keyword };
  }

  Vocabulary.find(criteria).skip(start).limit(end).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const getDaily = (done) => {
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'days');

  Vocabulary.find({ created: { $gte: today.toDate(), $lt: tomorrow.toDate() } }).sort({ created: 'desc' }).exec((err, vocabularies) => {
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
  getMarked,
  getDaily
};
