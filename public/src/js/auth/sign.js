console.log('hello')

let obj = {
    email: '',
    password:''
}
let pass
function setobject(tag) {
    if(tag.name == 'email'){
        obj.email = tag.value
    }
    if(tag.name == 'password'){
        pass = tag.value
    }
    if(tag.name == 'cpassword'){
        if(pass == tag.value){
            obj.password = pass
        }
        else{
           return alert('password no match')
        }
    }
}

async function submitForm(event) {
    event.preventDefault()
    console.log(obj)
    const res = await fetch('http://localhost:8800/user/register',{
        action:'/login',
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({...obj})
    })
    const data = await res.json()
    console.log(data)
}