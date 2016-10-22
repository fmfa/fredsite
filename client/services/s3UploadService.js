myApp.service('S3UploadService', ['$q', function ($q) {
    console.log("inside the s3upload service")
    // Us standard region
    AWS.config.region = 'us-west-1';

    AWS.config.update({ accessKeyId: '*****', secretAccessKey: '********' });

    var bucket = new AWS.S3({ params: { Bucket: 'siliconvalleyfaces', maxRetries: 5 }, httpOptions: { timeout: 360000 } });

    this.Progress = 0;
    this.Upload = function (file) {
        console.log('in the S3UploadService')
        console.log(file)
        var deferred = $q.defer();
        var params = { Bucket: 'siliconvalleyfaces', Key: file.url, ContentType: file.type, Body: file };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'bucket-owner-full-control'
        };
        var uploader = bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve();
        });
        uploader.on('httpUploadProgress', function (event) {
            deferred.notify(event);
        });

        return deferred.promise;
    };
}]);
