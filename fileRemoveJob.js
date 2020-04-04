exports.removeFiles = function() {
    let fs = require('fs');
    const path = './public/';

    fs.readdirSync(path).filter(f => {
        if(['mp3', 'mp4'].includes(f.split('.xyz.')[1])) {
            fs.unlinkSync(path + f)
        }
    })
}