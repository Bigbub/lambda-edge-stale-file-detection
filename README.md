# lambda-edge-stale-file-detection

This code is designed for use with Lambda @ Edge with the CloudFront Origin Response event.

It will note the HTTP header Last-Modified, and return a 404 error if the file is 30 seconds or older.

A sample test event is included.

This code is licensed under the Apache 2.0 license
