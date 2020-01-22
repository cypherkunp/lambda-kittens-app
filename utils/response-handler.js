function reportResponse(statusCode, response) {
    switch (statusCode) {
        case 200:
            return {
                statusCode,
                body: response
            };

        case 201:
            return {
                statusCode,
                body: response
            };
    }
}

module.exports = {
    reportResponse
};
