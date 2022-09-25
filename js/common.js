//validation
const validation=(id,block)=>{
    let elements=document.getElementById(id)
    if(block===true){
        elements.style.display='block'
    }
    else{
        elements.style.display='none'
    }
}
// display section hidden
const displayHidden=()=>{
    let bookContainer=document.getElementById('book-container')
    bookContainer.textContent='';
}
// hidden error msg
const msgNone=()=>{
    validation('nan-value',false)
    validation('available-value',false)
}

