const userTemplate = document.getElementById('user-template')
const usercard = document.querySelector("[usercard]")
const searchInput = document.getElementById('search')

searchInput.addEventListener('search', (e)=>{
    const value = e.target.value
    console.log(value)
})


fetch("db.json")
.then((res)=> res.json())
.then((data) =>{
    data.forEach(user =>{  
    const card = userTemplate.content.cloneNode(true).children[0]
    const songName = card.querySelector("[song-name]")
    const artistName = card.querySelector("[artist-name]")
    const artistCover = card.querySelector("[artist-cover]")
    songName.textContent = user.title
    artistName.textContent = user.artist
    artistCover.src = user.artwork
    usercard.append(card)

    })
    
})