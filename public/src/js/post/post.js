
let obj ={
	title : '',
	content :'',
}

function setObject(tag){
	if(tag.name=="title"){
		obj.title = tag.value
	}
	if(tag.name=="content"){
		obj.content = tag.value
	}
	if(tag.name == 'tags'){
		obj.tags = tag.value
	}
}

async function post(event){
	event.preventDefault()
	obj['date'] = new Date().toISOString();
  	obj.likes = []
  	obj.tags = obj.tags.split(',')
	const res = await fetch('https://blogejs-magw.onrender.com/post/create', {

		method : 'POST',
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify({...obj})
	})
	const data = await res.json()
		toast.toastSuccess(data.msg)
	if(data.success){
		toast.toastSuccess(data.msg)
		window.location.href = '/'
	}
	else{
		toast.toastError(data.msg)
		console.log(data)
	}
}

async function update(event, user_id, pid){
	event.preventDefault()
	obj['date'] = new Date()

	const res = await fetch(`https://blogejs-magw.onrender.com/post/update/${pid}`, {

		method : 'put',
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify({...obj})
	})
	const data = await res.json()
	if(data.success){
		toast.toastSuccess(data.msg)
		window.location.href = '/'
	}
	else{
		toast.toastError(data.msg)
		console.log(data)
	}
}


function redirect(event){
	event.preventDefault()
	toast.toastInfo('You have been redirected to homepage')
	window.location.href = '/'
}


async function deleteAction(event, id){
	event.preventDefault()
	const url = `https://blogejs-magw.onrender.com/post/delete/${id}`
	console.log(`Sending DELETE request to: ${url}`);
	try {
		await fetch(url, {
			method : 'DELETE',
			headers:{
				"Content-type":"appilcation/json",
			},
		}).then((res)=>{
			if(res.ok){
				console.log('http request successful');
				toast.toastSuccess('post deleted successfully')
				window.location.href = '/'
			} else {
				toast.toastError('Post deletion Unsccessfull')
				console.log('http request unsuccessful',res)
			}
		}).catch((err)=>{
			toast.toastError(err.message)
			console.log(err.message)
		})
	} catch (error) {
		toast.toastInfo(error.message)
		console.log(error.message)
	}
}