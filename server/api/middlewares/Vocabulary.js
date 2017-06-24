import _ from 'lodash';
import Vocabulary from '../../services/Vocabulary';
import POS from '../../constants/POS';

export const getAll = (req, res) => {
  Vocabulary.getAll((err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const getPOS = (req, res) => {
  return res.json(POS);;
};

export const findById = (req, res) => {
  const { params: { id: _id } } = req;

  Vocabulary.findById(_id, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });
    if (!vocabulary) return res.status(404).send({ message: 'Data not found', error: err });

    return res.json(vocabulary);
  });
};

export const remove = (req, res) => {
  const { params: { id: _id } } = req;

  Vocabulary.remove(_id, (err) => {
    if (err) return res.status(500).send({ message: 'Something went wrong removing the data', error: err });
    return res.sendStatus(200);
  });
};

export const create = (req, res) => {
  const { vocabulary = {} } = req.body;

  Vocabulary.create(vocabulary, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

    return res.json(vocabulary);
  });
};

export const update = (req, res) => {
  const { vocabulary = {} } = req.body;

  Vocabulary.update(vocabulary, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

    return res.json(vocabulary);
  });
};

export const search = (req, res) => {
  const { query } = req;

  Vocabulary.search(query, (err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const searchFuzzy = (req, res) => {
  const { query } = req;

  Vocabulary.searchFuzzy(query, (err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const getMarked = (req, res) => {
  const { user } = req;

  Vocabulary.getMarked(user._id, (err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const mark = (req, res) => {
  const { params: { id: _id }, user } = req;

  Vocabulary.findById(_id, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });
    if (!vocabulary) return res.status(404).send({ message: 'Data not found', error: err });

    const userId = _.toString(user._id);
    const { users = [] } = vocabulary;
    const index = users.findIndex(item => item === userId);

    if (index !== -1) {
      users.splice(index, 1);
    } else {
      users.push(userId);
    }

    Vocabulary.update({ _id, users }, (err) => {
      if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

      return res.sendStatus(200);
    });
  });
};

export const getDaily = (req, res) => {
  Vocabulary.getDaily((err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const getRandom = (req, res) => {
  Vocabulary.getRandom((err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
};

export const download = (req, res) => {
  const { user } = req;

  Vocabulary.getAll((err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    const data = JSON.stringify(vocabularies);

    res.setHeader('Content-disposition', 'attachment; filename=data.json');
    res.setHeader('Content-type', 'application/json');

    res.write(data, (err) => {
      if (err) return res.status(500).send({ message: 'Something went wrong downloading the data', error: err });

      res.end();
    });
  });
};
