const data = [
    {
        name:'Rob Brakovich',
        title:'Lead Designer, Gucci',
        photo:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        rating: 4,
        statement: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid dignissimos harum, obcaecati libero esse excepturi amet et recusandae, nobis optio quaerat enim, ea consectetur?'
    },
    {
        name:'Mohsin Wali',
        title:'Product manager, Prima Sol.',
        photo:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        rating: 5,
        statement: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid dignissimos harum, obcaecati libero esse excepturi amet et recusandae, nobis optio quaerat enim, ea consectetur?'
    },
    {
        name:'Trevor Stok',
        title:'Assistant Director, Commerce Chambers inc.',
        photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        rating: 4,
        statement: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid dignissimos harum, obcaecati libero esse excepturi amet et recusandae, nobis optio quaerat enim, ea consectetur?'
    },
    {
        name:'Poppy Fida',
        title:'Senior UI/UX manager, Plants co.',
        photo:'https://images.unsplash.com/photo-1614436163996-25cee5f54290?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80',
        rating: 3,
        statement: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid dignissimos harum, obcaecati libero esse excepturi amet et recusandae, nobis optio quaerat enim, ea consectetur?'
    },
    {
        name:'Olivia Connor',
        title:'Fashion designer, Sara co.',
        photo:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        rating: 5,
        statement: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid dignissimos harum, obcaecati libero esse excepturi amet et recusandae, nobis optio quaerat enim, ea consectetur?'
    },
]






data.forEach(element=>{


    
    
    const Container = document.querySelector('.card-container')

    const cardElement = document.createElement('div')

    const cardInfo = document.createElement('div')

    const iconContainer = document.createElement('div')

    iconContainer.classList.add('card-icons')

    cardInfo.classList.add('card-info')
    
    cardElement.classList.add('card')
    cardElement.id = data.indexOf(element)


    for (let i = 1; i <= element.rating; i++) {
        const icon = document.createElement('i')
        icon.classList.add('ri-star-fill')
        iconContainer.appendChild(icon)
        }

        cardInfo.innerHTML = `
            <img src=${element.photo}>
            <div class="person-info">
                <h1>${element.name}</h1>
                <span>${element.title}</span>
            </div>
        <p class="card-text">
        ${element.statement}
        </p>
        `

        cardInfo.appendChild(iconContainer)

        cardElement.appendChild(cardInfo)

        Container.appendChild(cardElement)

})

var x = 0;

const plusIndex = () =>{
    if(x >= data.length - 1){
        x = 0
    }else{
        x ++;
    }

}

const minusIndex = () =>{
    if(x <= 0){
        x = data.length - 1
    }else{
        x --;
    }

}

const next = () =>{
    let sliderWidth = document.getElementById('slider-back').offsetWidth

    for (let i = 0; i < data.length; i++) {
    document.getElementById(`${i}`).classList.remove('active') 
    }
    plusIndex()
     document.getElementById(`${x}`).classList.add('active')
     if(sliderWidth <= 240){
         document.getElementById('slider-back').style.width = (sliderWidth + 60)+'px'
     }else{
        document.getElementById('slider-back').style.width = '60px'
     }

     

}

const previous = () =>{
    let sliderWidth = document.getElementById('slider-back').offsetWidth

    for (let i = 0; i < data.length; i++) {
    document.getElementById(`${i}`).classList.remove('active') 
    }
    minusIndex()
    console.log(document.getElementById(`${x}`));
    document.getElementById(`${x}`).classList.add('active')
    document.getElementById('slider-back').style.width -= '20%'

    if(sliderWidth <= 60){
        document.getElementById('slider-back').style.width = '300px'
    }else{
       document.getElementById('slider-back').style.width = (sliderWidth- 60)+'px'
    }

}

next()

