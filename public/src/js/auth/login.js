import toast from "../toastity/toast.js"

let obj = {
    email: '',
    password:''
}

function setobject(tag) {
    if(tag.name == 'email'){
        obj.email = tag.value
    }
    if(tag.name == 'password'){
        obj.password  = tag.value
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