const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

// Our fleet of Unicorns
const fleet = [
    {
        Name: 'Bucephalus',
        Color: 'Golden',
        Gender: 'Male',
    },
    {
        Name: 'Shadowfax',
        Color: 'White',
        Gender: 'Male',
    },
    {
        Name: 'Rocinante',
        Color: 'Yellow',
        Gender: 'Female',
    },
    {
        Name: 'Tolga',
        Color: 'Rainbow',
        Gender: 'Male',
    },
];

/**
 * Lambda entry point
 *
 * @param event from API Gateway
 * @param context request context
 * @return {Promise<{headers: object, body: string, statusCode: number}>}
 */
async function handler(event, context) {
    try {
        // TODO: authentication
        // if (!event.requestContext || !event.requestContext.authorizer) {
        //     throw new Error('Authorization not configured');
        // }

        const rideId = generateId();
        console.log('Received event (', rideId, '): ', event);

        // Because we're using a Cognito User Pools authorizer, all of the claims
        // included in the authentication token are provided in the request context.
        // This includes the username as well as other attributes.
        let username = 'Onican';
        // TODO: authentication
        // username = event.requestContext.authorizer.claims['cognito:username'];

        // The body field of the event in a proxy integration is a raw string.
        // In order to extract meaningful values, we need to first parse this string
        // into an object. A more robust implementation might inspect the Content-Type
        // header first and use a different parsing strategy based on that value.
        const requestBody = JSON.parse(event.body);

        const pickupLocation = requestBody.PickupLocation;

        const unicorn = findUnicorn(pickupLocation);

        // TODO: Record to DynamoDB
        // await recordRide(rideId, username, unicorn);

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        return {
            statusCode: 201,
            body: JSON.stringify({
                RideId: rideId,
                Unicorn: unicorn,
                UnicornName: unicorn.Name,
                Eta: Math.floor(2 + Math.random() * 18) + ' seconds',
                Rider: username,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
    catch (err) {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        return {
            statusCode: 500,
            body: JSON.stringify({
                Error: err.message,
                Reference: context.awsRequestId,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
}

/**
 * This is where you would implement logic to find the optimal unicorn for
 * this ride (possibly invoking another Lambda function as a microservice.)
 * For simplicity, we'll just pick a unicorn at random.
 */
function findUnicorn(pickupLocation) {
    console.log('Finding unicorn for ', pickupLocation.Latitude, ', ', pickupLocation.Longitude);
    return fleet[Math.floor(1 + Math.random() * fleet.length)];
}

// TODO: Record to DynamoDB
// function recordRide(rideId, username, unicorn) {
//     return ddb.put({
//         TableName: process.env.RIDES_TABLE_NAME,
//         Item: {
//             RideId: rideId,
//             User: username,
//             Unicorn: unicorn,
//             UnicornName: unicorn.Name,
//             RequestTime: new Date().toISOString(),
//         },
//     }).promise();
// }

/**
 * Generate a random ID
 * @return {string}
 */
function generateId() {
    return randomBytes(16).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// Export the handler
exports.handler = handler;
