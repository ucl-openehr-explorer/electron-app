var hideButton = document.getElementById('hide'); // Assumes element with id='button'

hideButton.onclick = function() {
    // alert("working")
    var div = document.getElementById('mayHide');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};

var templateShowButton = document.getElementById('templateButton');

templateShowButton.onclick = function(){
    var div = document.getElementById('mayHide');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};
