var openehr_cdr_query = require('openehr-cdr-query');
var CDR = openehr_cdr_query.CDR;
var CDRs = openehr_cdr_query.CDRs;
var fs = require('fs');


var templateShowButton = document.getElementById('templateButton');
var CDRShowButton = document.getElementById('CDRButton');
var hideButton = document.getElementById('hide');
var hideButton2 = document.getElementById('hide2');

var cdrList = [];
var cdrListJSON = JSON.parse(window.localStorage.getItem("cdrList")) || [];
//Read from config file.
//var cdrListJSON = JSON.parse(fs.readFileSync('config.json')) || [];
cdrListJSON.forEach(e => {
  cdrList.push({
    name: e.name,
    loginName: e.loginName,
    url: e.url,
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
        //check if CDR loginName is same as the one currently logged in
        if (cdrList[i].loginName === window.sessionStorage.getItem("loginName")) {

            html +="<tr>";


            if(checkedCDRs[i]==true){ //if CDR has been checked in initial page

                html +="<td><input type='image' id='delete" + i + "' src='bin1.png' style='width:25px; margin-right:15px;' onclick='deleteCDR(" + i + ")'><input type='checkbox' checked id='checkbox" + i + "' name='" + cdrList[i].name +  "' onclick='check(" + i + ")'>"
            }
            else{
                console.log(checkedCDRs[i])
                html +="<td><input type='image' id='delete" + i + "' src='bin1.png' style='width:25px; margin-right:15px;' onclick='deleteCDR(" + i + ")'><input type='checkbox' id='checkbox" + i + "' name='" + cdrList[i].name + "' onclick='check(" + i + ")'>"
            }
            html +="<td>" + cdrList[i].name + "</td>";
            html +="<td>" + cdrList[i].cdr.url + "</td>";

            html +="</tr>";
        }
    }
        if (cdrList.length == 0) {
          html += 'Click "Add New" to add a CDR'
        }
        html +="</table>";
        document.getElementById("displayCDRs").innerHTML = html;
    }
    catch{

    }

function deleteCDR(i){
  

  if(confirm('Are you sure you want to delete \'' + cdrList[i].name + '\' from the CDR list?')){

    cdrListJSON.splice(i,1);
    checkedCDRs.splice(i,1);
    
    
    window.localStorage.setItem("cdrList",JSON.stringify(cdrListJSON));
    //updating config json file
    try{
      fs.writeFileSync('config.json', JSON.stringify(cdrListJSON, null, 2));
    } catch (err) {
      throw err;
    }
    // fs.writeFile('config.json', JSON.stringify(cdrListJSON, null, 2), function(err) {
    //   if (err) throw err;
    //   console.log('Deleted CDR from configuration file.')
    // });
    window.localStorage.setItem("checkedCDRs",JSON.stringify(checkedCDRs));
  
    
    console.log(cdrList);
    location.reload();
  } else {

  }

}


// stores array of checked CDRs for passing
function check(i){
  if (document.getElementById('checkbox' + i).checked){ //if just checked
        checkedCDRs[i] = true;
    }
    else{ //if just unchecked
        checkedCDRs[i] = false;
      }
    checkedCDRs = Array.from(checkedCDRs, item => item || false)
    window.localStorage.setItem("checkedCDRs",JSON.stringify(checkedCDRs));
  }

 
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
    
    //get currently logged in username from sesison storage
    var loginName = window.sessionStorage.getItem("loginName");
    
    cdrList.push({
      name: name,
      loginName: loginName,
      url: url,
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
      loginName: loginName,
      url: url,
      username: username,
      password: password
        
      });

    window.localStorage.setItem("cdrList",JSON.stringify(cdrListJSON));
    //writing to config json file
    try{
      fs.writeFileSync('config.json', JSON.stringify(cdrListJSON, null, 2));
    } catch (err) {
      throw err;
    }
    // fs.writeFile('config.json', JSON.stringify(cdrListJSON, null, 2), function(err) {
    //   if (err) throw err;
    //   console.log('Configuration Saved');
    // });
    alert("CDR added successfully")
    //emptying textboxes
    document.getElementById("nameInput").value = '';
    document.getElementById("urlInput").value = '';
    document.getElementById("usernameInput").value = '';
    document.getElementById("passwordInput").value = '';
}

function userLogon() {
  //get the values from the text box
  loginName = document.getElementById("loginName").value;
  //save the value into temporary session storage
  window.sessionStorage.setItem("loginName", loginName);
  //emptying textbox
  document.getElementById("loginName").value = '';
  
  return true;
}
var localResults = [];

document.getElementById('aqlForm').addEventListener('submit', e => {
  e.preventDefault();
  var aql = e.target[0].value
  var cdrsToQuery = cdrList.filter((_, i) => checkedCDRs[i]).map(e => e.cdr)
  console.log(cdrsToQuery);
  var resultArea = document.getElementById('results')
  new CDRs(cdrsToQuery).query(aql).all().concat().then(result => {
    localResults = result;
    console.log(result)
    resultArea.value = JSON.stringify(result, null, 2)
  }).catch(error => {
    console.error(error)
    resultArea.value = error
  })
})



function CreateTableFromJSON() {
  
      
    tableVar = localResults.pop().resultSet;
    for(var r = 0; r < tableVar.length; r++){ //adding row number
      
      tableVar[r][0] = r + 1;
    }
    console.log(tableVar);

    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < tableVar.length; i++) {
        for (var key in tableVar[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    
    
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.
    
    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
    
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < tableVar.length; i++) {
      
      tr = table.insertRow(-1);
      
      for (var j = 0; j < col.length; j++) {
        
        var tabCell = tr.insertCell(-1);
        
        var outputCell = JSON.stringify(tableVar[i][col[j]])
        
        tabCell.innerHTML = outputCell;
      }
    }
    

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//     if (div.style.display !== 'none') {