exports.urlToMp3 = function(url) {
    return new Promise((resolve, reject) => {

        const fs = require('fs');
        const youtubedl = require('youtube-dl');
        var ffmpeg = require('ffmpeg');
            
        const video = youtubedl(url, ['--format=18'], {cwd: __dirname})
        
        video.on('info', function(info) {
            console.log('download started')
        })
        
        video.on('end', function () {
            try {
                var process = new ffmpeg('myvideo.mp4');
                process.then(function (video) {
                    
                    video.fnExtractSoundToMP3('public/myvideo.mp3', function (error, file) {
                        if (!error){
                            console.log('Audio file: ' + file);
                            resolve(file)
                        } else {
                            reject(error)
                        }
                    });
                }, function (err) {
                    console.log('Error: ' + err);
                    reject(err)
                });
            } catch(e) {
                reject(e)
                console.log(e)
            }
        })
        
        video.pipe(fs.createWriteStream('myvideo.mp4'));    
    })
}
