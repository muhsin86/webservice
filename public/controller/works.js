"use strict";window.onload=getWorks();var updatedWorkId,deletedWorkId,fetchedWorks=[];function getWorks(){fetch("http://studenter.miun.se/~momo1600/writeable/DT173G/web3api2020-master/src/model/works.php",{method:"GET"}).then((function(e){return e.json()})).then((function(e){fetchedWorks=e,document.querySelector("#workList").innerHTML="",e.forEach((function(e){document.querySelector("#workList").innerHTML+="\n                    <tr>\n                    <td>".concat(e.startdate," - ").concat(e.enddate,"</td>\n                    <td>").concat(e.work,"</td>\n                    <td>").concat(e.title,"</td>\n                    <td>").concat(e.url,'</td>\n                    <td><button onClick="openUpdateWorkModal(').concat(e.id,')">Update</button></td>\n                    <td><button onClick="openDeleteWorkModal(').concat(e.id,')">Delete</button></td>\n                    </tr>\n                    ')}))}))}function openUpdateWorkModal(e){updatedWorkId=e;var t=fetchedWorks.find((function(t){return t.id==e}));document.querySelector(".update-work-modal").style.display="block",document.querySelector("#update-workform #startdate").value=t.startdate,document.querySelector("#update-workform #enddate").value=t.enddate,document.querySelector("#update-workform #work").value=t.work,document.querySelector("#update-workform #title").value=t.title,document.querySelector("#update-workform #url").value=t.url}function closeUpdateWorkModal(){document.querySelector(".update-work-modal").style.display="none"}function openDeleteWorkModal(e){deletedWorkId=e;var t=fetchedWorks.find((function(t){return t.id==e}));document.querySelector(".delete-work-modal").style.display="block",document.querySelector(".delete-work-modal .work-info").innerHTML="",document.querySelector(".delete-work-modal .work-info").insertAdjacentHTML("afterbegin","\n  <p><strong>Start date: ".concat(t.startdate,"</strong></p>\n  <p><strong>End date: ").concat(t.enddate,"</strong></p>\n  <p><strong>Work: ").concat(t.work,"</strong></p>\n  <p><strong>Title: ").concat(t.title,"</strong></p>\n  <p><strong>url: ").concat(t.url,"</strong></p>\n\n  "))}function closeDeleteWorkModal(){document.querySelector(".delete-work-modal").style.display="none"}function addWork(e){e.preventDefault();var t={startdate:document.getElementById("startdate").value,enddate:document.getElementById("enddate").value,work:document.getElementById("work").value,title:document.getElementById("title").value,url:document.getElementById("url").value};fetch("http://studenter.miun.se/~momo1600/writeable/DT173G/web3api2020-master/src/model/works.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){document.querySelector(".workform .alert").innerHTML="",document.querySelector(".workform .alert").insertAdjacentHTML("afterbegin",'<div style="background-color: green; color: white; padding: 5px">'+e.message+"</div>"),document.getElementById("startdate").value="",document.getElementById("enddate").value="",document.getElementById("work").value="",document.getElementById("title").value="",document.getElementById("url").value="",getWorks()})).catch((function(e){return e}))}function deleteWork(){fetch("http://studenter.miun.se/~momo1600/writeable/DT173G/web3api2020-master/src/model/works.php",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:deletedWorkId})}).then((function(e){return e.json()})).then((function(e){closeDeleteWorkModal(),getWorks(),document.querySelector(".workform .alert").innerHTML="",document.querySelector(".workform .alert").insertAdjacentHTML("afterbegin",'<div style="background-color: red; color: white; padding: 5px">'+e.message+"</div>")})).catch((function(e){return e}))}function updateWork(){var e=document.querySelector("#update-workform #startdate").value,t=document.querySelector("#update-workform #enddate").value,o=document.querySelector("#update-workform #work").value,r=document.querySelector("#update-workform #title").value,n=document.querySelector("#update-workform #url").value,d={id:updatedWorkId,startdate:e,enddate:t,work:o,title:r,url:n};console.log("Updating work..."),fetch("http://studenter.miun.se/~momo1600/writeable/DT173G/web3api2020-master/src/model/works.php",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then((function(e){return e.json()})).then((function(e){console.log(e),closeUpdateWorkModal(),getWorks(),document.querySelector(".workform .alert").innerHTML="",document.querySelector(".workform .alert").insertAdjacentHTML("afterbegin",'<div style="background-color: green; color: white; padding: 5px">'+e.message+"</div>")})).catch((function(e){return console.log(e),e}))}document.getElementById("workform").addEventListener("submit",addWork),window.addEventListener("load",getWorks),document.querySelector(".update-work-btn").addEventListener("click",updateWork),document.querySelector(".delete-work-btn").addEventListener("click",deleteWork);