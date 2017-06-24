import _ from 'lodash';
import Phrase from '../../services/Phrase';

// Not expose from now
export const getAll = (req, res) => {
  Phrase.getAll((err, phrases) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(phrases);
  });
};

export const getAllByUser = (req, res) => {
  const { user } = req;

  Phrase.getAllByUser(user._id, (err, phrases) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(phrases);
  });
};

export const create = (req, res) => {
  const {
    user: { _id: userId },
    body: { phrase = {} }
  } = req;

  phrase.user = userId;

  Phrase.create(phrase, (err, phrase) => {
    if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

    return res.json(phrase);
  });
};

export const updateByUser = (req, res) => {
  const {
    body: { phrase = {} },
    user: { _id: userId }
  } = req;

  Phrase.updateByUser(phrase, userId, (err, phrase) => {
    if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

    return res.json(phrase);
  });
};

export const removeByUser = (req, res) => {
  const {
    params: { id: _id },
    user: { _id: userId }
  } = req;

  Phrase.removeByUser(_id, userId, (err) => {
    if (err) return res.status(500).send({ message: 'Something went wrong removing the data', error: err });
    return res.sendStatus(200);
  });
};
