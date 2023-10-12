const userTemplate = document.querySelector(".user-template");
const usercard = document.querySelector(".usercard"); 
const searchInput = document.querySelector(".search"); 
let users =[]



searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible = (typeof user.title === 'string' && user.title.toLowerCase().includes(value)) || 
                          (typeof user.artist === 'string' && user.artist.toLowerCase().includes(value));
        user.element.classList.toggle("hide", !isVisible);
    });
});

fetch("db.json")
    .then((res) => res.json())
    .then((data) => {
        users = data.songs.map(user => {
            const card = userTemplate.content.cloneNode(true).children[0];
            const songName = card.querySelector("[song-name]");
            const artistName = card.querySelector("[artist-name]");
            const artistCover = card.querySelector(".image");
            songName.textContent = user.title;
            artistName.textContent = user.artist;
            artistCover.src = user.artwork;
            usercard.append(card);
            return {  Song: user.title, artist: user.artist, element: card };
        });
    });
