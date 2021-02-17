// scheme-model
const db = require('../../data/db-config')

function find() {
	return db('schemes')
}

function findById(id) {
	const schemeObject = db('schemes').where('id', id).first()
	if (!schemeObject) {
		return Promise.resolve(null)
	} else {
		return schemeObject
	}
}

function findSteps(id) {
	return db('schemes as sc')
		.join('steps as s', 's.scheme_id', 'sc.id')
		.select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
		.where('sc.id', id)
		.orderBy('s.step_number')
}

function add(scheme) {
	return db('schemes')
		.insert(scheme)
		.then(([id]) => {
			return findById(id)
		})
}

function update(changes, id) {
	return db('schemes')
		.update(changes)
		.where('id', id)
		.then(() => {
			return findById(id)
		})
}

async function remove(id) {
	const scheme = await findById(id)
	if (!scheme) {
		return Promise.resolve(null)
	} else {
		return db('schemes')
			.where('id', id)
			.del()
			.then(() => {
				return scheme
			})
	}
}

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
}
