let count = 0

const number = document.getElementById('number')
const btns = document.querySelectorAll('button')

btns.forEach(function(item){
    item.addEventListener('click',function(e){
        const value = e.target.id
        if(value==='inc'){
            count++
        }else if(value==='dec'){
            count--
        }else{
            count=0
        }
        document.getElementById('number').textContent = count
        if(count > 0){
            document.getElementById('number').style.color = 'green'
        }
       
        else if(count < 0){
            document.getElementById('number').style.color = 'red'
        }
        else{
            document.getElementById('number').style.color = 'gray'
        }
       
    })
          
    }
)