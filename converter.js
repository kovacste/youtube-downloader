exports.urlToMp3 = function(url) {
    return new Promise((resolve, reject) => {

        const fs = require('fs');
        const youtubedl = require('youtube-dl');
        var ffmpeg = require('ffmpeg');
        var title = '';
        const video = youtubedl(url, ['--format=18'], {cwd: __dirname})
        
        video.on('info', function(info) {
            console.log('download started', info.fulltitle)
            title = info.fulltitle;
        })
        
        video.on('end', function () {
            try {
                var process = new ffmpeg('video.mp4');
                process.then(function (video) {
                    
                    video.fnExtractSoundToMP3(('public/' + title + '_youtube-music.xyz.mp3')
                        .replace('(', '')
                        .replace(')', '')
                        .replace('|', '')
                        .replace(/\s/g, '_'), function (error, file) {
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
        
        video.pipe(fs.createWriteStream('video.mp4'));
    })
}
