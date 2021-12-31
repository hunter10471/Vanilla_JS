//Creating book class to instantiate further books

class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}


//Creating User Interface class to handle all the interface events

class UI{
    static displayBooks(){
        const books = Store.getbooks()
        books.forEach(book => {
            UI.addBookToList(book)
        });
    }

    static addBookToList(book){
        const books = JSON.parse(localStorage.getItem('books'))
            const list = document.querySelector('#book-list')
            const row = document.createElement('tr')
            row.innerHTML =`<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="btn btn-danger delete">X</a></td>`
            list.appendChild(row)
    }

    static removeBook(book){
        if(book.classList.contains('delete')){
            book.parentElement.parentElement.remove()
        }
    }

    static clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static addAlert(className,msg){
        const div = document.querySelector('#book-form')
        const container = document.querySelector('.container')
        const newdiv = document.createElement('div')
        newdiv.className = `alert alert-${className}`
        newdiv.appendChild(document.createTextNode(msg))
        container.insertBefore(newdiv,div)
        setTimeout(()=>{
            container.removeChild(newdiv)
        },2000)
    }

    
}


//Creating storage class to handle all the storage of our books

class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBookToStore(book){
        const books = Store.getbooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))

    }

    static removeBookFromStore(isbn){
        const books = Store.getbooks()
        books.forEach((book,index)=>{
                if(isbn===book.isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//UI method to view all the books
document.addEventListener('DOMContentLoaded',UI.displayBooks())

//Deleting a book from local storage and UI
document.querySelector('#book-list').addEventListener('click',(e)=>{
    Store.removeBookFromStore(e.target.parentElement.previousElementSibling.textContent)
    UI.removeBook(e.target)
    UI.addAlert('success','Book successfully removed')
})

//Adding a book
document.addEventListener('submit',(e)=>{
    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
    if(title==='' || author==='' || isbn ===''){
        UI.addAlert('danger','Please fill all the fields...')
    }else{
        const book = new Book(title,author,isbn)
        UI.addBookToList(book)
        UI.clearFields()
        Store.addBookToStore(book)
        UI.addAlert('success','Book successfully added!')
    }
})


