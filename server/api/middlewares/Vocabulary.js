import Vocabulary from '../../services/Vocabulary';

export const getAll = (res) => {
  Vocabulary.getAll((err, vocabularies) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(vocabularies);
  });
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

export const search = (req, res) => {
  const { query: { start = 0, end = 10 } } = req;

  return res.json([]);
};

export const create = (req, res) => {
  const {
    word,
    pronunciation,
    pos,
    definitions,
    examples
  } = req.body;

  const vocabulary = {
    word,
    pronunciation,
    pos,
    definitions,
    examples
  };

  Vocabulary.create(vocabulary, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

    return res.json(vocabulary);
  });
};

export const update = (req, res) => {
  const {
    _id,
    word,
    pronunciation,
    pos,
    definitions,
    examples
  } = req.body;

  const vocabulary = {
    _id,
    word,
    pronunciation,
    pos,
    definitions,
    examples
  };

  Vocabulary.update(vocabulary, (err, vocabulary) => {
    if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

    return res.json(vocabulary);
  });
};
