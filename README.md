# lambda-edge-stale-file-detection

This code is designed for use with Lambda @ Edge with the CloudFront Origin Response event.

It will note the HTTP header Last-Modified, and return a 404 error if the file is 30 seconds or older.

A sample test event is included.

When configuring this in a CloudFront distribution, it is recommended to set up a separate behavior just for the type of files that need to be checked for currency, to avoid a large number of function invocations on files that don't need to be monitored (don't use the "Default" behavior for this!).

This code is licensed under the Apache 2.0 license
