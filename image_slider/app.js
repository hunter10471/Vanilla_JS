const data = [
    {
        img:'/images/pic1.jpg',
        title:'Amazon forest',
        desc:'Lose yourself in the beauty of nature\'s marvels'
    },
    {
        img:'/images/pic2.jpg',
        title:'Rocky moutains',
        desc:'A mountainious region perfect for trekking'
    },
    {
        img:'/images/pic3.jpg',
        title:'Jakarta voyage',
        desc:'For all those sea lovers!'
    },
    {
        img:'/images/pic4.jpg',
        title:'Biggest factory tour',
        desc:'Man\'s wonders never cease to amaze'
    },
]


const Slidecontainer = document.querySelector('.slide')
const images = document.querySelectorAll('.slide img')

data.forEach(el=>{
    const img = document.createElement('img')
    img.src = el.img
    Slidecontainer.appendChild(img)
})


const nextBtn = document.getElementById('next-btn')
const prevBtn = document.getElementById('prev-btn')



let counter = 0



nextBtn.addEventListener('click',()=>{
    if(counter >= data.length - 1){
        counter = -1
    }
    counter++
    Slidecontainer.animate([
        {opacity:'0'},{opacity: '1'}
    ],{
      duration:500,
      iterations:1,  
    })
    Slidecontainer.style.transform = 'translateX(' + (-100 * counter) + 'vw)'

})


prevBtn.addEventListener('click',()=>{
    if(counter <= 0){
        counter = data.length
    }
    counter--;
    Slidecontainer.animate([
        {opacity:'0'},{opacity: '1'}
    ],{
      duration:500,
      iterations:1,  
    })
    Slidecontainer.style.transform = 'translateX(' + (-100 * counter) + 'vw)'
})


setInterval(()=>nextBtn.click(),10000)
