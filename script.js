document.addEventListener("DOMContentLoaded", function() {  
    // Event listener to display all content when the page is loaded

    const userTemplate = document.querySelector(".user-template");
    const usercard = document.querySelector(".usercard"); 
    const searchInput = document.querySelector(".search"); 
    let users =[];

    searchInput.addEventListener('input', (e) => {   
        // Event listener to set value to the search bar content and also set search engine working
        const value = e.target.value.toLowerCase(); 
        users.forEach(user => {
            const isVisible = (typeof user.title === 'string' && user.title.toLowerCase().includes(value)) || 
                            (typeof user.artist === 'string' && user.artist.toLowerCase().includes(value));
            user.element.classList.toggle("hide", !isVisible);
        });
    });

    // Fetching json data to be used
    fetch("db.json") 
        .then((res) => res.json())
        .then((data) => {
            users = data.songs.map(user => {
                const card = userTemplate.content.cloneNode(true).children[0];
                const songName = card.querySelector("[song-name]");
                const artistName = card.querySelector("[artist-name]");
                const artistCover = card.querySelector(".image");
                const audio = card.querySelector(".audio")
                const voteButton = card.querySelector(".vote-button");
                const totalVotes = card.querySelector(".totalVotes");

                songName.textContent = user.title;
                artistName.textContent = user.artist;
                artistCover.src = user.artwork;
                audio.src = user.url;

                let voteCount = 0; 

                voteButton.addEventListener("click", () => {  
                    // Event listener to increase value of artist votes
                    if (!voteButton.classList.contains("voted")) {
                        voteCount++;
                        voteButton.textContent = "voted"
                        alert( "Congratulations! You just voted")
                        voteButton.classList.add("voted");
                        totalVotes.textContent = voteCount;

                        // Disable all vote buttons after one vote
                        const allVoteButtons = document.querySelectorAll(".vote-button");
                        allVoteButtons.forEach(button => {
                            button.disabled = true;
                        });
                    }
                });

                usercard.append(card);
                return {  Song: user.title, artist: user.artist, element: card };
            });

            const aboutUsContent = document.querySelector('.paragraphContent');
            aboutUsContent.textContent = "Here are our selected artists that you can vote for. You can only vote once for your best artist";

            const contactUsContent = document.querySelector('.contactUsContent');
            contactUsContent.textContent = 'Call us through: 0796521993 or reach us out on all our social media pages: sadworldsongs';

            const aboutSection = document.querySelector('.aboutSection');
            aboutSection.appendChild(aboutUsContent);

            const contactUs = document.querySelector('.contactUs');
            contactUs.appendChild(contactUsContent);
        })
        .catch(error => console.error('Error:', error));
});
