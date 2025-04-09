let obj = {
    email: '',
    password:''
}

let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
function setobject(tag) {
    if(tag.name == 'email'){
        if(!regexEmail.test(tag.value)){
            obj.email = tag.value
        }
        else{
            toast.toastError('Invalid Email Format')
        }
    }
    if(tag.name == 'password'){
        if(!regexPassword.test(tag.value)){
            obj.password  = tag.value
        }
        else{
            toast.toastError('Invalid Password Format')
        }
    }
}

async function submitForm(event) {
    event.preventDefault()
    const res = await fetch('https://blogejs-magw.onrender.com/user/login',{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({...obj})
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
        toast.toastSuccess(data.msg)
        window.location.href = '/'
    }
    else{
        toast.toastError(data.msg)
    }
}