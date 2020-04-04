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
                    video.fnExtractSoundToMP3(normalizeName('public/' + title + '_youtube-music.xyz.mp3'),  (error, file) => {
                        if (!error){
                            resolve(file)
                        } else {
                            reject(error)
                        }
                    });
                }, function (err) {
                    reject(err)
                });
            } catch(e) {
                reject(e)
            }
        })
        video.pipe(fs.createWriteStream('video.mp4'));
    })
}

function normalizeName(name) {
    const remove = ['(', ')', '|', '|'];
    remove.forEach(i => {
        name = name.replace(i, '')
    })
    return name.replace(/\s/g, '_')
}

exports.urlToMp4 = function(url) {
    return new Promise((resolve, reject) => {

        const fs = require('fs');
        const youtubedl = require('youtube-dl');
        var title = '';
        const video = youtubedl(url, ['--format=18'], {cwd: __dirname})

        video.on('info', function(info) {
            title = normalizeName(info.fulltitle) + '_youtube-music.xyz.mp4';
        })

        video.on('end', function() {
            fs.rename('public/myvideo.mp4', 'public/' + title , function(err) {
                if ( err ) reject(err)
                resolve( 'public/' + title)
            });
        })

        video.pipe(fs.createWriteStream('public/myvideo.mp4'));
    })
}


