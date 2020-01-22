function reportError(statusCode, message) {
    switch (statusCode) {
        case 400:
            return {
                statusCode,
                body: {
                    message: message || 'Bad request'
                }
            };

        case 500:
            return {
                statusCode,
                body: {
                    message: message || 'Internal Server Error'
                }
            };

        case 404:
            return {
                statusCode,
                body: {
                    message: message || 'Resource not found'
                }
            };
    }
}

module.exports = { reportError };
