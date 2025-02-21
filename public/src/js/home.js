let container = document.querySelector('.container')
let loggedUser = JSON.parse(localStorage.getItem('LoggedIN')) || []
if(loggedUser.loggedin){
    document.querySelector('#logUser').innerHTML = loggedUser.user.fname +" "+ loggedUser.user.lname
    async function getNews(type) {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${type}&apiKey=df3e82a911454234861368142691c1c7`)
    
        let data = await response.json();
        update(data.articles)
    }
    
    function update(news) {
        container.innerHTML = ''
        news.sort((a,b)=>new Date(b.publishedAt) - new Date(a.publishedAt)).map((value, index) => {
            if (value.urlToImage) {
                let div = document.createElement('div')
                let img = document.createElement('img')
                let title = document.createElement('div')
                let link = document.createElement('a')
    
    
                div.classList = 'flex flex-col justify-between bg-blue-900 bg-opacity-60 text-slate-200 flex flex-col gap-3 rounded-md p-1'
    
                img.classList = 'h-[200px]'
    
                title.classList = 'font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2.5vw] text-[3vh]'
    
                link.classList = 'px-2 py-2 bg-red-400 rounded-md text-center capitalize font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vh]'
    
                img.src = value.urlToImage
                title.innerHTML = value.title
                link.innerHTML = 'view more'
                link.href = value.url
                div.append(img, title, link)
                container.append(div)
            }
        })
    }
    
    function inputSearch(){
        let text = document.querySelector('#search').value
        console.log(text)
        getNews(text)
    }
    
    function logout(){
        localStorage.removeItem('LoggedIN')
        window.location.href = 'loginPage.html'
    }

    getNews('rbi')

}
else{
    window.location.href = 'loginPage.html'
}

