import * as URL from '../server/constants/URL';
import { ADMIN, USER } from '../server/constants/Role';

export const interceptUrls = [
  // {
	// 	pattern: URL.API + URL.VOCABULARIES,
	// 	accesses: [ADMIN],
  //   method: 'GET'
	// },
  {
		pattern: URL.API + URL.VOCABULARIES,
		accesses: [ADMIN],
    method: 'POST'
	},
  {
    pattern: URL.API + URL.VOCABULARIES_ID,
    accesses: [ADMIN],
    method: 'PUT'
  },
  {
		pattern: URL.API + URL.VOCABULARIES_ID,
		accesses: [ADMIN],
    method: 'DELETE'
	},
  {
		pattern: URL.API + URL.VOCABULARIES_POS,
		accesses: [ADMIN],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.VOCABULARIES_MARKED,
		accesses: [USER],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.VOCABULARIES_ID_MARK,
		accesses: [USER],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.VOCABULARIES_DOWNLOAD,
		accesses: [USER],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.PHRASES,
		accesses: [USER],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.PHRASES,
		accesses: [USER],
    method: 'POST'
	},
  {
		pattern: URL.API + URL.PHRASES_ID,
		accesses: [USER],
    method: 'PUT'
	},
  {
		pattern: URL.API + URL.PHRASES_ID,
		accesses: [USER],
    method: 'DELETE'
	},
  {
		pattern: URL.API + URL.USER_ID,
		accesses: [USER],
    method: 'GET'
	},
  {
		pattern: URL.API + URL.USER_ID,
		accesses: [USER],
    method: 'PUT'
	},
  {
		pattern: URL.API + URL.USER_PASSWORD_CHANGE,
		accesses: [USER],
    method: 'POST'
	},
  {
		pattern: URL.API + URL.USER_LOGOUT,
		accesses: [USER],
    method: 'GET'
	}
];
