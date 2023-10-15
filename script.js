document.addEventListener("DOMContentLoaded", function() {  // An eventListener "DOMContentLoaded" to ensure every DOM element is executed
    const userTemplate = document.querySelector(".user-template");
    const usercard = document.querySelector(".usercard"); 
    const searchInput = document.querySelector(".search"); 
    let users =[];

    searchInput.addEventListener('input', (e) => {  //An eventListener for search Input and also ensure search engine works effectively
        const value = e.target.value.toLowerCase();
        users.forEach(user => {
            const isVisible = (typeof user.title === 'string' && user.title.toLowerCase().includes(value)) || 
                              (typeof user.artist === 'string' && user.artist.toLowerCase().includes(value));
            user.element.classList.toggle("hide", !isVisible);
        });
    });

    fetch("db.json") ///fetching data from JSON file to bring it to the DOM
        .then((res) => res.json())
        .then((data) => {
            users = data.songs.map(user => {
                const card = userTemplate.content.cloneNode(true).children[0];
                const songName = card.querySelector("[song-name]");
                const artistName = card.querySelector("[artist-name]");
                const artistCover = card.querySelector(".image");
                const audio =card.querySelector(".audio")
                const voteButton = card.querySelector(".vote-button");
                const totalVotes = card.querySelector(".totalVotes");

                songName.textContent = user.title;
                artistName.textContent = user.artist;
                artistCover.src = user.artwork;
                audio.src = user.url;

               let voteCount = 0;

                voteButton.addEventListener("click", () =>{ //an eventListner that adds 'my votes' when the button is clicked
                    if (voteButton.classList.contains("voted")) {
                        voteCount--;
                        voteButton.textContent = "vote"
                        alert(this.voteButton + "You have voted")
                    } else {
                        voteCount++;
                        voteButton.textContent = "voted"
                        alert(this.voteButton + "You can vote")
                    }
            
                    voteButton.classList.toggle("voted"); //Visually show that the button has been clicked
                    totalVotes.textContent = voteCount; //return the new vote after counting
                });

               
    
    

            
                usercard.append(card); //appending the card to fetch all other elements in the object data
                return {  Song: user.title, artist: user.artist, element: card };
            });
        });
    });






    