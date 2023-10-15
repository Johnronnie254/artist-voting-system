document.addEventListener("DOMContentLoaded", function() {
    const userTemplate = document.querySelector(".user-template");
    const usercard = document.querySelector(".usercard");
    const searchInput = document.querySelector(".search");
    let users = [];

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
                const audio = card.querySelector(".audio");
                const voteButton = card.querySelector(".vote-button");
                const totalVotes = card.querySelector(".totalVotes");

                songName.textContent = user.title;
                artistName.textContent = user.artist;
                artistCover.src = user.artwork;
                audio.src = user.url;

                let voteCount = 0;

                voteButton.addEventListener("click", () => {
                    if (voteButton.classList.contains("voted")) {
                        voteCount--;
                        voteButton.textContent = "vote";
                        alert("You have voted");
                    } else {
                        voteCount++;
                        voteButton.textContent = "voted";
                        alert("You can vote");
                    }

                    voteButton.classList.toggle("voted");
                    totalVotes.textContent = voteCount;
                });

                usercard.append(card);
                return { Song: user.title, artist: user.artist, element: card };
            });

            const aboutUs = document.querySelector('.about-us');
            aboutUs.addEventListener('click', () => {
                const aboutUsContent = document.querySelector('.paragraphContent');
                aboutUsContent.textContent = "Here are our selected artists that you can vote for. You can only vote once for your best artist";
            });
        })
        .catch(error => console.error('Error:', error));
});
