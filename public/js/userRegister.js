
let formElem = document.getElementById('form1');
let success_msgbox = document.getElementById('msg-box');
let failed_msgbox = document.getElementById('msg-box2');
let db = document.getElementById("db");

let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");


let sbt = document.querySelector('#sbt');


sbt.addEventListener('click',function(e){

    let dateFormate = day.value+" "+month.value+" "+year.value;
  
    db.value = dateFormate;

    e.preventDefault();
    const data = new URLSearchParams();
    for (const pair of new FormData(formElem)) {
        data.append(pair[0], pair[1]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST","/send",true);

    xhr.onload = function(){
        if(this.readyState==4 && this.status==200){
            let res = this.responseText;
            if(res.trim()=="sent"){
                formElem.reset();
                success_msgbox.style.display="block";
                
            }
            
            
        }else{
            failed_msgbox.style.display="block";
        }
    }

    xhr.send(data);
});

    
