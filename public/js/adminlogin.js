let form = document.getElementById('Adminform');
let sbtn = document.getElementById('sbtn');
let msg_box = document.getElementById('msg-box');
let msg_txt = document.getElementById('msg-txt');

sbtn.addEventListener('click',(e)=>{
    e.preventDefault();

    let data = new URLSearchParams();
    for(let pair of new FormData(form)){
        data.append(pair[0],pair[1]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/mAdminlogin',true);
    xhr.onload = function(){
        if(this.readyState==4 && this.status==200){
            let res = this.responseText;
            if(res.trim()=="user"){
                msg_txt.innerHTML=`User Not Found.`;
                msg_box.style.display="block";
                form.reset();
            }else if(res.trim()=="password"){
                msg_txt.innerHTML=`Wrong Pasword.`;
                msg_box.style.display="block";
                form.reset();
            }else{
                let res =this.responseText;
                let admin_id  = res.trim();
                location.href=`/cdash`;
            }
        }
    }
    xhr.send(data);

})