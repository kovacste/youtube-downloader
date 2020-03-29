function downloadToMp3() {
    beforeConvert();
    let url = document.getElementById('url').value;
    fetch('/getYTMusic', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    }).then((response) => {
        return response.json();
    }).then(json => {
        afterFinished(json);
    })
}

function beforeConvert() {
    document.getElementById('spinner').style = 'display: inline-block;';
    document.getElementById('spinner').classList.add('spin');
    document.getElementById('convert-text').style = 'display: none;';
    document.getElementById('dl-link').style = 'display: none;';
}

function afterFinished(json) {
    document.getElementById('spinner').style = 'display: none;';
    document.getElementById('convert-text').style = 'display: inline-block;';
    document.getElementById('dl-link').href = json.url.split('/')[1];
    document.getElementById('dl-link').download = json.url.split('/')[1];
    document.getElementById('dl-link').style = 'display: inline-block;';
}

function clear() {
    document.getElementById('url').value = '';
}
