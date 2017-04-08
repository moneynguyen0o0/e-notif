import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import tdb from '../../../data/tdb.json';

const dbPath = process.cwd() + '/data/tdb.json';

export const getAll = (res) => {
  const vocabularies = _.orderBy(tdb.vocabularies, ['id'], ['desc']);

  res.json({ status: 200, data: vocabularies });
};

export const find = (req, res) => {
  const { params: { id } } = req;

  const vocabularies = tdb.vocabularies;

  const vocabulary = vocabularies.find(voca => voca.id == id);

  res.json(vocabulary);
};

export const remove = (req, res) => {
  const { params: { id } } = req;

  const index = tdb.vocabularies.findIndex(item => item.id === id);

  tdb.vocabularies.splice(index, 1);

  fs.unlinkSync(dbPath);
  fs.writeFile(dbPath, JSON.stringify(tdb, null, 2), (err) => {
    let rs = { status: 200, message: 'Deleted successfully' };

    if (err) rs = { status: 500, message: 'Deleted unsuccessfully' };

    res.json(rs);
  });
};

export const search = (req, res) => {
  const vocabularies = tdb.vocabularies;
  const { query: { start = 0, end = vocabularies.length } } = req;

  const orderedVocas = _.orderBy(tdb.vocabularies, ['id'], ['desc']);
  const filteredVocas = orderedVocas.slice(start, end);

  res.json(filteredVocas);
};

export const save = (req, res) => {
  const {
    word,
    pronunciation,
    pos,
    definitions,
    examples
  } = req.body;

  const vocabulary = {
    id: tdb.vocabularies.length,
    word,
    pronunciation,
    pos,
    definitions,
    examples
  };

  tdb.vocabularies.push(vocabulary);

  fs.unlinkSync(dbPath);
  fs.writeFile(dbPath, JSON.stringify(tdb, null, 2), (err) => {
    let rs = { status: 200, message: 'Saved successfully', data: vocabulary };

    if (err) rs = { status: 500, message: 'Saved unsuccessfully' };

    res.json(rs);
  });
};

export const update = (req, res) => {
  const {
    id,
    word,
    pronunciation,
    pos,
    definitions,
    examples
  } = req.body;

  const vocabulary = {
    id,
    word,
    pronunciation,
    pos,
    definitions,
    examples
  };

  const index = tdb.vocabularies.findIndex(item => item.id === id);

  tdb.vocabularies[index] = vocabulary;

  fs.unlinkSync(dbPath);
  fs.writeFile(dbPath, JSON.stringify(tdb, null, 2), (err) => {
    let rs = { status: 200, message: 'Updated successfully', data: vocabulary };

    if (err) rs = { status: 500, message: 'Updated unsuccessfully' };

    res.json(rs);
  });
};
