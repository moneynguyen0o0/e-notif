import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import tdb from '../../../data/tdb.json';

const dbPath = process.cwd() + '/data/tdb.json';

export const getAll = (res) => {
  const vocabularies = _.orderBy(tdb.vocabularies, ['id'], ['desc']);

  res.json(vocabularies);
};

export const find = (req, res) => {
  const { params: { id } } = req;

  const vocabularies = tdb.vocabularies;

  const vocabulary = vocabularies.find(voca => voca.id == id);

  res.json(vocabulary);
};

export const search = (req, res) => {
  const vocabularies = tdb.vocabularies;
  const { query: { start = 0, end = vocabularies.length } } = req;

  const orderedVocas = _.orderBy(tdb.vocabularies, ['id'], ['desc']);
  const filteredVocas = orderedVocas.slice(start, end);

  res.json(filteredVocas);
};

export const save = (req, res) => {
  const { vocabulary } = req.body;

  const { id } = vocabulary;

  if (id) {
    const index = tdb.vocabularies.findIndex(item => item.id === id);

    tdb.vocabularies[index] = vocabulary;
  } else {
    vocabulary.id = tdb.vocabularies.length;
    tdb.vocabularies.push(vocabulary);
  }

  fs.unlinkSync(dbPath);
  fs.writeFile(dbPath, JSON.stringify(tdb, null, 2), (err) => {
    let rs = { status: 200, message: 'Save successfully' };

    if (err) rs = { status: 500, message: 'Save unsuccessfully' };

    res.json(rs);
  });
};
