//click search button
document.getElementById('search-btn').addEventListener('click',async ()=>{
    document.getElementById('total-book').innerText=`Search your Book 📖`
    msgNone()
    displayHidden()
    validation('progress',true)
    let searchElement=document.getElementById('search-value')
    let searchValue=searchElement.value;
    searchElement.value=""
    if(searchValue===''){
        validation('nan-value',true)
        validation('progress',false)
    }
    else{
        let res=await fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
        let data=await res.json()
        displayBook(data)
    }
})

//display all search book
const displayBook=(books)=>{
    validation('progress',false)
    displayHidden()
   
    if(books.numFound==0){
        validation('available-value',true)
    }
    else{
        document.getElementById('total-book').innerText=`Total found ${books.docs.length} book`
        msgNone()
        books.docs.forEach(book=>{
        let bookContainer=document.getElementById('book-container')
        let {title,author_name,publish_date,cover_i,author_key}=book
        let bookDiv=document.createElement('div')
        bookDiv.innerHTML= 
        `<div class="card card-compact w-full bg-base-100 shadow-xl">
        <figure><img src="${cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" alt="Shoes" class="h-[300px]"/></figure>
        <div class="card-body">
          <h2 class="card-title">Title : ${title.length>20?title.slice(0,20)+"...":title}</h2>
          <p class="text-md">Author : ${author_name? author_name[0] : 'N/A'}</p>
          <p class="text-md">Publish : ${publish_date? publish_date[0] : 'N/A'}</p>
          <div class="card-actions">
          <label onclick="authorDetails('${author_key}')" for="my-modal-4" class="btn modal-button bg-yellow-700 border-none w-full">Author Details</label>
          </div>
        </div>
      </div>
        `
        bookContainer.appendChild(bookDiv)   
    })
    }
}

const authorDetails=async (authorKey)=>{
    let res=await fetch(`https://openlibrary.org/authors/${authorKey}.json`)
    let data=await res.json()
    let {photos,birth_date,bio,name,wikipedia}=data;

    document.getElementById('modal-field').innerHTML=
    `<img class="my-3" src="${photos ? `https://covers.openlibrary.org/b/id/${photos}-S.jpg` : `https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1913928688.jpg`}"
    <h3 class="font-semibold">Name : ${name}</h3>
    <h3 class="font-semibold">${birth_date ? `Birth Date : ${birth_date}`:''}</h3>
    <h3 class="font-semibold">${bio ? `Bio : ${bio.value}`:""}</h3>
    <a class="font-semibold" href=" ${wikipedia}">${wikipedia? `Wikipedia : ${wikipedia}` :''}</a>
    `
}