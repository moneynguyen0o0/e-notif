import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import tdb from '../../../data/tdb.json';

const dbPath = process.cwd() + '/data/tdb.json';

export const getAll = (res) => {
  const vocas = _.orderBy(tdb.vocas, ['id'], ['desc']);

  res.json(vocas);
};

export const find = (req, res) => {
  const { params: { id } } = req;

  const vocas = tdb.vocas;

  const voca = vocas.find(voca => voca.id === id);

  res.json(voca);
};

export const search = (req, res) => {
  const vocas = tdb.vocas;
  const { query: { start = 0, end = vocas.length } } = req;

  const orderedVocas = _.orderBy(tdb.vocas, ['id'], ['desc']);
  const filteredVocas = orderedVocas.slice(start, end);

  res.json(filteredVocas);
};

export const save = (req, res) => {
  const { voca } = req.body;
  voca.id = tdb.vocas.length;

  tdb.vocas.push(voca);

  fs.unlinkSync(dbPath);
  fs.writeFile(dbPath, JSON.stringify(tdb, null, 2), (err) => {
    const rs = { status: 200 };

    if (err) rs.status = 500;

    res.json(rs);
  });
};
