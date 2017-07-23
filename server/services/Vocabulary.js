import _ from 'lodash';
import moment from 'moment';
import Vocabulary from '../models/Vocabulary';

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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

  Vocabulary.find(criteria).skip(parseInt(start)).limit(parseInt(end)).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const searchFuzzy = (params, done) => {
  const { keyword = '', limit = 5 } = params;

  if (keyword.length > 1) {
    const regex = new RegExp(escapeRegex(keyword), 'gi');

    Vocabulary.find({ word: regex }).limit(parseInt(limit)).exec((err, vocabularies) => {
      done(err, vocabularies);
    });
  } else {
    done(null, null);
  }
};

const getDaily = (done) => {
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'days');

  Vocabulary.find({ created: { $gte: today.toDate(), $lt: tomorrow.toDate() } }).sort({ created: 'desc' }).exec((err, vocabularies) => {
    done(err, vocabularies);
  });
};

const getRandom = (params, done) => {
  const { size = 5 } = params;

  Vocabulary.aggregate({ $sample: { size: parseInt(size) } }).exec((err, vocabularies) => {
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
  searchFuzzy,
  getMarked,
  getDaily,
  getRandom
};
