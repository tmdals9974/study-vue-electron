import Datastore from 'nedb-promises';
import path from 'path';

const isBuild = process.env.NODE_ENV === 'production';

const pathToDbFile = path.join(
	isBuild ? __dirname : __static,
	'../src/database/data.db'
);

const db = new Datastore({
	filename: pathToDbFile,
	autoload: true,
	timestampData: true
});

export const getData = async ({ where, sort } = {}) => {
	const proxies = await db.find(where).sort(sort);
	return proxies;
};

export const createData = async data => {
	const proxies = await db.insert(data);
	return proxies;
};

export class User {
	constructor(id, name, pw, username, email, website) {
		this.id = id;
		this.name = name;
		this.pw = pw;
		this.username = username;
		this.email = email;
		this.website = website;
	}
}
