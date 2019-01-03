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
    var template = document.getElementById('mayHide');
    var CDR = document.getElementById('mayHide2');
    if (template.style.display == 'block' && CDR.style.display == 'none') {
        template.style.display = 'none';
    }
    else if(template.style.display == 'none' && CDR.style.display == 'block') {
        template.style.display = 'block';
        CDR.style.display = 'none';
    }
    else if(template.style.display == 'none' && CDR.style.display == 'none') {
        template.style.display = 'block';
    }
    else{
        template.style.display = "none";
    }
};

var hideButton2 = document.getElementById('hide2'); // Assumes element with id='button'

hideButton2.onclick = function() {
    // alert("working")
    var div = document.getElementById('mayHide2');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};

var CDRShowButton = document.getElementById('CDRButton');

CDRShowButton.onclick = function(){
    var template = document.getElementById('mayHide');
    var CDR = document.getElementById('mayHide2');
    if (CDR.style.display == 'block' && template.style.display == 'none') {
        CDR.style.display = 'none';
    }
    else if(CDR.style.display == 'none' && template.style.display == 'block') {
        CDR.style.display = 'block';
        template.style.display = 'none';
    }
    else if(CDR.style.display == 'none' && template.style.display == 'none') {
        CDR.style.display = 'block';
    }
    else{
        CDR.style.display = "none";
    }
};
