function downloadToMp3() {
    console.log('get it ')
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
        console.log(json)
        //window.open(json.url.split('/')[1], '_self');
        document.getElementById('dl-link').href = json.url.split('/')[1];
        document.getElementById('dl-link').style = 'display: inline;';
    })
}
