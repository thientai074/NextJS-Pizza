const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
        console.log(token)
		// const decoded = jwt.verify(token, 'ehfbjwfjwmwekf' )

		// req.userId = decoded.userId
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

const authorization = (req, res, next) => {
	const token = req.cookies.next-auth.session-token
	if(!token) {
		res.json('No token')
	} else {
		console.log(token)
	}
	// try {
	// 	const data = jwt.verify(token, 'ehfbjwfjwmwekf')
	// 	req.userId = data.id
	// 	return next()

	// } catch (error) {
	// 	console.log(error)
	// 	res.json('Invalid Token')
	// }
}

module.exports = {verifyToken, authorization }