fetch('/html/navbar.html')
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.getElementById('navbar-container').innerHTML = data;
    });