'use strict';
/*
 *  Detect stale files with an age older than maxAge, using Last-Modified HTTP
 *  header value in the Response object.
 *  Designed for use with a CloudFront Origin Response trigger.
 *
 *  Author: Derek Ewell
 *
 */

const lastModifiedHeader = 'Last-Modified';
const maxAge = 30 * 1000;  // max 30 seconds of age, shown in ms

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    var responseOutgoing;

    if (response.headers[lastModifiedHeader.toLowerCase()])  {
        // Last-Modified header exists
        const lastModifiedString =
         response.headers[lastModifiedHeader.toLowerCase()][0].value;
        const lastModifiedDate = new Date(lastModifiedString);
        const currentDate = new Date();

        if ((currentDate - lastModifiedDate) >= maxAge)  {
            // file is stale (based on maxAge value)
            responseOutgoing = {
                status: '404',
                statusDescription: 'File is stale',
            };
        } else  {
            // file is not stale (based on maxAge value)
            responseOutgoing = response;
        }
    } else  {
        // can't find Last-Modified header
        responseOutgoing = response;
    }

    callback(null, responseOutgoing);
};
