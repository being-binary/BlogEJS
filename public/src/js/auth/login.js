
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
        obj.password  = tag.value
    }
}

async function submitForm(event) {
    event.preventDefault()
    const res = await fetch('http://localhost:8800/user/login',{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({...obj})
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
        Toastify({
            text: "This is a toast",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
        window.location.href = '/'
    }
    else{
        alert('use not found')
    }
}