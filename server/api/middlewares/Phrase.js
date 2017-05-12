import _ from 'lodash';
import Phrase from '../../services/Phrase';

export const getAll = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  Phrase.getAll((err, phrases) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(phrases);
  });
};

export const getAllByUser = (req, res) => {
  const {
    user
  } = req;

  if (!user) {
    return res.sendStatus(401);
  }

  Phrase.getAllByUser(user._id, (err, phrases) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(phrases);
  });
};

export const remove = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const { params: { id: _id } } = req;

  Phrase.remove(_id, (err) => {
    if (err) return res.status(500).send({ message: 'Something went wrong removing the data', error: err });
    return res.sendStatus(200);
  });
};

export const create = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const {
    phrase = {}
  } = req.body;

  Phrase.create(phrase, (err, phrase) => {
    if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

    return res.json(phrase);
  });
};

export const update = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const {
    phrase = {}
  } = req.body;

  Phrase.update(phrase, (err, phrase) => {
    if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

    return res.json(phrase);
  });
};
