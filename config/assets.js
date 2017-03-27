import { isClient } from './app';

const metaAssets = () => {
  return [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Your One-Stop solution for a full-stack universal Redux App' }
  ];
};

const linkAssets = () => {
  return [
  ];
};

export const title = 'ENotif';
export const meta = metaAssets();
export const link = linkAssets();
