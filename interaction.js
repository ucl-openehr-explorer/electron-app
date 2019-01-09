var CDR = require('openehr-cdr-query').CDR;


var templateShowButton = document.getElementById('templateButton');
var CDRShowButton = document.getElementById('CDRButton');
var hideButton = document.getElementById('hide'); 
var hideButton2 = document.getElementById('hide2'); 

var cdrList = JSON.parse(window.localStorage.getItem("cdrList")) || [];

var checkedCDRs = JSON.parse(window.localStorage.getItem("checkedCDRs")) || [];
// if (checkedCDRs = []){
//     window.localStorage.setItem("checkedCDRs",checkedCDRs);
// }


try{
    var html = '<table border ="0">';
    for (var i = 0; i < cdrList.length; i++){
        html +="<tr>";
        
        
        if(checkedCDRs[i]==true){ //if CDR has been checked in initial page

            html +="<td><input type='checkbox' checked id='checkbox" + i + "' name='" + cdrList[i].name +  "' onclick='check(" + i + ")'>"
        }
        else{
            console.log(checkedCDRs[i])
            html +="<td><input type='checkbox'  id='checkbox" + i + "' name='" + cdrList[i].name + "' onclick='check(" + i + ")'>"
            }
            html +="<td>" + cdrList[i].name + "</td>";
            html +="<td>" + cdrList[i].cdr.url + "</td>";
            
            html +="</tr>";
        }
        html +="</table>";
        document.getElementById("displayCDRs").innerHTML = html;
    }
    catch{
        
    }

    // stores array of checked CDRs for passing 
function check(i){
    if (document.getElementById('checkbox' + i).checked){ //if just checked      
        checkedCDRs[i] = true;
    }
    else{ //if just unchecked
        checkedCDRs[i] = false;
    }
    console.log(checkedCDRs.length);
    checkedCDRs = Array.from(checkedCDRs, item => item || false)
    window.localStorage.setItem("checkedCDRs",JSON.stringify(checkedCDRs));
    console.log(checkedCDRs)
}
    
// hideButton.onclick = function() {
//     // alert("working")
//     var div = document.getElementById('mayHide');
//     if (div.style.display !== 'none') {
//         div.style.display = 'none';
//     }
//     else {
//         div.style.display = 'block';
//     }
// };
try{
    
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
}
catch{

}


// hideButton2.onclick = function() {
//     // alert("working")
//     var div = document.getElementById('mayHide2');
//     if (div.style.display !== 'none') {
//         div.style.display = 'none';
//     }
//     else {
//         div.style.display = 'block';
//     }
// };

function cdrObject(name, ip, port, username, password){
        this.name = name;
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.password = password;
}

function addCDR(){
    //gets the values from textboxes
    var name = document.getElementById("nameInput").value;
    var url = document.getElementById("urlInput").value;
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    
    //creates new CDR with input values
    cdr = new CDR({
        url: url,
        authentication: {
            scheme: 'basic',
            username: username,
            password: password
        }
    })
    
   //adds new CDR to list
    cdrList.push({
        name: name,
        cdr: cdr
    });

   

    window.localStorage.setItem("cdrList",JSON.stringify(cdrList));
    alert("CDR added successfully")
    //emptying textboxes
    document.getElementById("nameInput").value = '';
    document.getElementById("urlInput").value = '';
    document.getElementById("usernameInput").value = '';
    document.getElementById("passwordInput").value = '';


    console.log(cdrList);
}