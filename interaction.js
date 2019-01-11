var openehr_cdr_query = require('openehr-cdr-query');
var CDR = openehr_cdr_query.CDR;
var CDRs = openehr_cdr_query.CDRs;


var templateShowButton = document.getElementById('templateButton');
var CDRShowButton = document.getElementById('CDRButton');
var hideButton = document.getElementById('hide');
var hideButton2 = document.getElementById('hide2');

var cdrList = [];
var cdrListJSON = JSON.parse(window.localStorage.getItem("cdrList")) || [];
cdrListJSON.forEach(e => {
  cdrList.push({
    name: e.name,
    cdr: new CDR({
      url: e.url,
      authentication: {
        scheme: 'basic',
        username: e.username,
        password: e.password
      }
    })
  })
})

var checkedCDRs = JSON.parse(window.localStorage.getItem("checkedCDRs")) || [];


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
        if (cdrList.length == 0) {
          html += 'Click "Add New" to add a CDR'
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

    cdrList.push({
      name: name,
      cdr: new CDR({
        url: url,
        authentication: {
          scheme: 'basic',
          username: username,
          password: password
        }
      })
    });

    cdrListJSON.push({
      name: name,
      url: url,
      username: username,
      password: password
    })

    window.localStorage.setItem("cdrList",JSON.stringify(cdrListJSON));
    alert("CDR added successfully")
    //emptying textboxes
    document.getElementById("nameInput").value = '';
    document.getElementById("urlInput").value = '';
    document.getElementById("usernameInput").value = '';
    document.getElementById("passwordInput").value = '';
}

document.getElementById('aqlForm').addEventListener('submit', e => {
  e.preventDefault();
  var aql = e.target[0].value
  var cdrsToQuery = cdrList.filter((_, i) => checkedCDRs[i]).map(e => e.cdr)
  var resultArea = document.getElementById('results')
  new CDRs(cdrsToQuery).query(aql).all().concat().then(result => {
    console.log(result)
    resultArea.value = JSON.stringify(result, null, 2)
  }).catch(error => {
    console.error(error)
    resultArea.value = error
  })
})
