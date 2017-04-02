import path from 'path';
import fs from 'fs';
import tdb from '../../../data/tdb.json';

const dbPath = process.cwd() + '/data/tdb.json';

export const getVocas = (res) => {
  const vocas = tdb.vocas;

  res.json(vocas);
};

export const saveVoca = (req, res) => {
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
