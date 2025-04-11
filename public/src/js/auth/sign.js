
let obj = {
    email: '',
    password: '',
    name: ''
}

let regexName = /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/;
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
let pass = ''

function allKeysHaveValues(obj) {
    return Object.values(obj).every(value =>
        value !== undefined &&
        value !== null &&
        value !== ''
    );
}


function setobject(tag) {
    if (tag.name == 'fullname') {
        console.log('iam name',tag.value)
        if (tag.value == '') return toast.toastError(`${tag.name} required`)
        if (regexName.test(tag.value)) {
            obj.name = tag.value
        }
        else {
            toast.toastError('Invalid Name Format')
        }
    }
    if (tag.name == 'email') {
        if (tag.value == '') return toast.toastError(`${tag.name} required`)
        if (regexEmail.test(tag.value)) {
            obj.email = tag.value
        }
        else {
            toast.toastError('Invalid Email Format')
        }
    }
    if (tag.name == 'password') {
        if (tag.value == '') return toast.toastError(`${tag.name} required`)
        if (regexPassword.test(tag.value)) {
            pass = tag.value
        }
        else {
            toast.toastError('Invalid Password Format')
        }

    }
    if (tag.name == 'cpassword') {
        if (tag.value == '') return toast.toastError(`${tag.name} required`)
        if (regexPassword.test(tag.value)) {
            if (pass == tag.value) {
                obj.password = pass
            }
            else {
                return toast.toastError('password no match')
            }
        }
        else {
            toast.toastError('Invalid Password Format')
        }

    }
}

async function submitForm(event) {
    event.preventDefault()

    if (allKeysHaveValues(obj)) {
        loader()
        const res = await fetch('https://blogejs-magw.onrender.com/user/register', {
            action: '/login',
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ ...obj })
        })
        removeLoader()
        const data = await res.json()
        if (data.success) {
            toast.toastSuccess(data.msg)
            window.location.href = '/'
        }
        else {
            toast.toastError(data.msg)
        }
    } else {
        toast.toastError('All Fields are required')
    }

}