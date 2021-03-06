console.log("hel    ")

const form =document.querySelector('form');
const loading=document.querySelector('.loading');
loading.style.display='';
const API_URL="http://localhost:5000/mews";
const mewsElement=document.querySelector('.mews')


listAllMews();



form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("form syubmietted")
    const formData=new FormData(form);
    const name=formData.get('name')
    const content=formData.get('content')
    const mew={
        name,
        content
    };
    console.log(mew);
    form.style.display='none';
    loading.style.display='';

    fetch(API_URL,{
        method : 'POST',
        body : JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response=>response.json())
    .then(createdMew=>{
        console.log(createdMew);
        form.style.display='';
    loading.style.display='none';
    form.reset()
    form.style.display='';
    listAllMews();
    });

})

function listAllMews(){
    mewsElement.innerHTML='';
    fetch(API_URL)
        .then(response=>response.json())
        .then(mews=>{
            mews.reverse();
            console.log(mews);
            mews.forEach(mew=>{
                const div=document.createElement('div');
                const heaader=document.createElement('h3');
                heaader.textContent=mew.name;
                const contents=document.createElement('p');
                contents.textContent=mew.content;
                const date=document.createElement('small');
                date.textContent=new Date(mew.created);
                div.appendChild(heaader);
                div.appendChild(contents);
                div.appendChild(date);
                mewsElement.appendChild(div);

            });
            loading.style.display="none";
        })
}
