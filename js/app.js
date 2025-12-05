
document.addEventListener('DOMContentLoaded',()=>{
 let threads=[];
 const wrap=document.querySelector('.threads');
 const search=document.getElementById('searchInput');

 function render(){
   if(!wrap) return;
   wrap.innerHTML="";
   let q=(search?.value||"").toLowerCase();
   threads
     .filter(t=>t.title.toLowerCase().includes(q))
     .forEach(t=>{
       let d=document.createElement('div');
       d.className='thread';
       d.innerHTML=`<h4>${t.title}</h4><p>${t.body}</p>
                    <button class='replybtn'>Reply</button>
                    <div class='replies'></div>`;
       let rep=d.querySelector('.replies');
       t.replies.forEach(r=>{
         let rr=document.createElement('div');
         rr.className='reply';
         rr.innerHTML=`<p>${r}</p>`;
         rep.appendChild(rr);
       });
       d.querySelector('.replybtn').onclick=()=>{
         let msg=prompt("Reply:");
         if(msg){ t.replies.push(msg); render(); }
       };
       wrap.appendChild(d);
     });
 }

 let add=document.querySelector('.new-thread');
 if(add){
   add.onclick=()=>{
     let t=prompt("Thread title:");
     let b=prompt("Message:");
     if(t&&b){ threads.push({title:t,body:b,replies:[]}); render(); }
   };
 }

 if(search){ search.oninput=()=>render(); }

 render();
});
