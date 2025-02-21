let logsign = true

let login_obj = {
    email: "",
    password: ""
}


let signUp = JSON.parse(localStorage.getItem("signUp")) || []
let login_error = document.querySelector(`#error`)

let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function loginUpdate(event) {
    
    if(event.target.name == 'email'){
        if(regexEmail.test(event.target.value)){
            login_obj[event.target.name] = event.target.value
            document.querySelector(`#${event.target.name}error`).innerHTML = ``
        }
        else{
            document.querySelector(`#${event.target.name}error`).innerHTML = `Invalid Email address`
            document.querySelector(`#${event.target.name}error`).style.color = 'red'
            return
        }
        
    }
    login_obj[event.target.name] = event.target.value
}

function checkExist(email) {
    return signUp.find((user) => user.email == email)
}

function loginForm(event) {
    event.preventDefault()
    for(let key in login_obj){
        if(!login_obj[key]){
            document.querySelector(`#${key}error`).innerHTML = `${key} required`
            document.querySelector(`#${key}error`).style.color = 'red'
            return
        }
        else{
            document.querySelector(`#${key}error`).innerHTML = ''   
        }
    }
    let user = checkExist(login_obj.email)
    console.log(typeof user)
    if (user) {
        if (user.password == login_obj.password) {
            localStorage.setItem('LoggedIN', JSON.stringify({user:user,loggedin:true}))
            window.location.href = 'home.html'
        }
        else {
            login_error.innerHTML = "Wrong Password"
            login_error.style.display = "block"
            setTimeout(() => {
                login_error.style.display = 'none'
            }, 5000)
        }
    }
    else {
        login_error.innerHTML = "user does not exist"
        login_error.style.display  = "block"
        setTimeout(()=>{
            login_error.style.display = 'none'
        },5000)
    }
}

let changeForm = (event)=>{
    if(logsign){
        event.target.innerHTML = 'Login'
        logsign = false
    }
    else{
        event.target.innerHTML = 'Sign Up'
        logsign = true   
    }
    document.querySelector('.login').classList.toggle('none')
    document.querySelector('.signup').classList.toggle('none')
}

document.querySelector("#formToggle").addEventListener('click', changeForm)



//SIGNUP FORM

let obj ={
    fname:"",
    lname:"",
    email:"",
    password:""
}
let error = document.querySelector(`#serror`)

let data = JSON.parse(localStorage.getItem("signUp"))|| []
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

function signUpUpdate(event){

    if(event.target.name == 'email'){
        if(regexEmail.test(event.target.value)){
            obj[event.target.name] = event.target.value
            document.querySelector(`#s${event.target.name}error`).innerHTML = ``
        }
        else{
            document.querySelector(`#s${event.target.name}error`).innerHTML = `Invalid Email address`
            document.querySelector(`#s${event.target.name}error`).style.color = 'red'
            return
        }
        
    }
    if(event.target.name == 'password'){
        if(regexPassword.test(event.target.value)){
            obj[event.target.name] = event.target.value
            document.querySelector(`#s${event.target.name}error`).innerHTML = ``
        }
        else{
            document.querySelector(`#s${event.target.name}error`).innerHTML = `Invalid Password`
            document.querySelector(`#s${event.target.name}error`).style.color = 'red'
            return
        }
    }
    obj[event.target.name] = event.target.value
    // console.log(obj)
}

function signUpForm(event){
    event.preventDefault()
    for(let key in obj){
        if(!obj[key]){
            document.querySelector(`#s${key}error`).innerHTML = `${key} required`
            document.querySelector(`#s${key}error`).style.color = 'red'
            return
        }
        else{
            document.querySelector(`#s${key}error`).innerHTML = ''   
        }
    }
    if(signUpCheckExist(obj.email)){
        error.innerHTML = "user exist"
        error.style.display  = "block"
        setTimeout(()=>{
            error.style.display = 'none'
        },5000)
        return  
    }
    else{
        data.push({...obj})
        error.innerHTML = `user creation successfull`
        error.style.color='green'
        localStorage.setItem("signUp",JSON.stringify(data))
        console.log(document.querySelector('#signupformid').reset())
    }
}

function signUpCheckExist(email){
    for(let user of data){
        if (user.email == email){
            return true
        }
    }
    return false
}