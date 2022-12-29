let form = document.getElementById('form1');
let sbt = document.getElementById('sbt');
let msg_box = document.getElementById('msg-box');

sbt.addEventListener('click',(e)=>{
    e.preventDefault();

    let data = new URLSearchParams();
    for(let pair of new FormData(form)){
        data.append(pair[0],pair[1]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/checkunilogin',true);
    xhr.onload = function(){
        if(this.readyState==4 && this.status==200){
            let res = this.responseText;
            if(res.trim()=="failed"){
                msg_box.style.display="block";
            }else{
                let res =this.responseText;
                let university_id  = res.trim();
                location.href=`/udash`;
            }
        }
    }
    xhr.send(data);

})