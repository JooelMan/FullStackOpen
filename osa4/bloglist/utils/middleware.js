const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	
	return null
}

const tokenExtractor = (request, response, next) => {
	request.token = getTokenFrom(request)

	next()
}

const userExtractor = async (request, response, next) => {
	// JsonWebTokenError if not valid token from row below
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
		request.user = null
  } else {
		request.user = await User.findById(decodedToken.id)
	}

	next()
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'token missing or invalid' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired'})
	}

	next(error)
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}