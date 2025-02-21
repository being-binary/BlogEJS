
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
}

async function post(event, user){
	event.preventDefault()
	obj['date'] = new Date().toLocaleString('en-US', { 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric', 
		hour: 'numeric', 
		minute: 'numeric', 
		second: 'numeric'
  })
  obj['user_id'] = user

	const res = await fetch('http://localhost:8800/post/new', {

		method : 'POST',
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify({...obj})
	})
	const data = await res.json()
	console.log(obj)
}