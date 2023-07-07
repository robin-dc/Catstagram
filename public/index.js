const url = "https://api.thecatapi.com/v1/images/search?limit=10"

window.onload = () => {

    async function getCats(){
        const catstagram = JSON.parse(localStorage.getItem("catstagram"))
        let data;
        let modifiableStorage;

        if(catstagram){
           data = catstagram
           modifiableStorage = catstagram
        }
        else{
            const response = await fetch(url)
            data = await response.json()

            modifiableStorage = data.map(obj => {
                return {...obj, comments:[], likes : 0}
            })

            localStorage.setItem('catstagram', JSON.stringify(modifiableStorage))
            data = modifiableStorage
        }

        const resBody = data.map(cat => {
            // console.log(data)
            return `<div class="post">

                        <div class="post-header">
                            <img src="${cat.url}" alt="">
                            <h4>bbangsaz_</h4>
                        </div>
                        <div class="picture" id="${cat.id}">
                            <img src="${cat.url}" alt="">
                        </div>

                        <div class="post-footer">
                            <small>Cats are adorable, independent, and curious creatures that make wonderful companions with their playful nature.</small>
                            <div class="controller">
                                <div class="likes">
                                    <i class="fa-solid fa-heart" id="${cat.id}"></i>
                                    <small>0</small>
                                </div>
                                <form class="form" id="${cat.id}">
                                    <input type="text" placeholder="Add comment here." name="comment" id="comment">
                                    <button>Comment</button>
                                </form>
                            </div>
                            <ul class="comments">

                            </ul>
                        </div>

                    </div>`
        }).join("\n")
        document.querySelector('.container').innerHTML = resBody

        const heartBtns = document.querySelectorAll('i')
        const pictures = document.querySelectorAll('.picture')
        const forms = document.querySelectorAll(".form")

        forms.forEach(form => {
            if(catstagram){
                const id = form.getAttribute('id')
                const commentContainer = form.parentElement.parentElement.childNodes[5]

                catstagram.forEach(obj => {
                    if(obj.id == id){
                        commentContainer.innerHTML = obj.comments.map(comment => {
                            return `<li id="${id}">
                                        <img src="https://i.pinimg.com/originals/b0/db/63/b0db63de1016c2022247812d25fb9af7.jpg" alt="">
                                        <div>
                                            <h4>catlover</h4>
                                            <small>${comment}</small>
                                        </div>
                                    </li>`
                        }).join("\n")
                    }
                })
            }
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                localStorage.removeItem('catstagram')

                const formData = new FormData(form);
                const comment = formData.get('comment');
                const commentContainer = e.target.parentElement.parentElement.childNodes[5]
                const catId = e.target.getAttribute('id')

                const input = e.target.childNodes[1]

                const resBody = `<li id="${catId}">
                                    <img src="https://i.pinimg.com/originals/b0/db/63/b0db63de1016c2022247812d25fb9af7.jpg" alt="">
                                    <div>
                                        <h4>catlover</h4>
                                        <small>${comment}</small>
                                    </div>
                                </li>`
                commentContainer.innerHTML += resBody
                input.value = ""

                modifiableStorage.find(obj => obj.id === catId).comments.push(comment)
                localStorage.setItem('catstagram', JSON.stringify(modifiableStorage))
                // console.log(modifiableStorage)
            })
        })

        heartBtns.forEach(btn => {
            if(catstagram){
                const id = btn.getAttribute('id')
                catstagram.forEach(obj => {
                    if(obj.id == id){
                        btn.parentElement.childNodes[3].innerHTML = obj.likes
                        if(obj.likes > 0){
                            btn.classList.add('active')
                        }
                    }
                })
            }

            btn.addEventListener('click', (e) => {
                const like = e.target.parentElement.childNodes[3]
                const catId = e.target.getAttribute('id')

                btn.classList.add('active')

                modifiableStorage.find(obj => obj.id === catId).likes++
                like.innerHTML = modifiableStorage.find(obj => obj.id === catId).likes

                localStorage.setItem('catstagram', JSON.stringify(modifiableStorage))
            })
        })

        pictures.forEach(pic => {
            pic.addEventListener("dblclick", (e) =>{
                const heart = e.target.parentElement.parentElement.childNodes[5].childNodes[3].childNodes[1].childNodes[1]
                const like = e.target.parentElement.parentElement.childNodes[5].childNodes[3].childNodes[1].childNodes[3]
                const catId = e.target.parentElement.getAttribute('id')

                heart.classList.add('active')

                modifiableStorage.find(obj => obj.id === catId).likes++
                like.innerHTML = modifiableStorage.find(obj => obj.id === catId).likes

                localStorage.setItem('catstagram', JSON.stringify(modifiableStorage))
            })
        })

    }

    getCats()
    const reloadBtn = document.getElementById('reload')
    reloadBtn.addEventListener('click', () => {
        document.querySelector('.container').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="gray" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
    </svg>`
        localStorage.removeItem('catstagram')
        getCats()
    })

}
S
