let game = {
    //game letiables
    memeArray: ["doot","pizza"],
    videoLoc: ["https://www.youtube.com/embed/gu4AyUWBr18?autoplay=1","https://www.youtube.com/embed/fdpMPhiG5k0?autoplay=1"],
    randIdx: undefined,
    lettersEntered: [],
    wordToGuess: undefined,
    numOfWins: 0,
    guessRemaining: 0,
    gameOver: undefined,

    //HTML Elements
    imageElem: undefined,
    videoElem: undefined,
    winTextElem: undefined,
    startGameElem: undefined,
    numOfWinsElem: undefined,
    guessTextElem: undefined,
    numOfGuessElem: undefined,
    lettersGuessedElem: undefined,
    audioElem: undefined,

    //Function Declaration/Defintions
    initGame: function() {
        //initialize letiables
        this.imageElem = document.getElementById("imageBox")
        this.videoElem = document.getElementById("videoBox");
        this.winTextElem = document.getElementById("winText");
        this.startGameElem = document.getElementById("startGame");
        this.numOfWinsElem = document.getElementById("numOfWins");
        this.guessTextElem = document.getElementById("guessText");
        this.numOfGuessElem = document.getElementById("numOfGuess");
        this.lettersGuessedElem = document.getElementById("lettersGuessed");
        this.audioElem = document.getElementById("datboi.wav");

        //This will run on any subsequent game
        if(this.startGameElem.hasAttribute("style"))
            this.startGameElem.style.display = "";

        this.guessRemaining = 12;
        this.gameOver = false;
        this.lettersGuessedElem.textContent = "";
        this.numOfGuessElem.textContent = this.guessRemaining;
        this.numOfWinsElem.textContent = this.numOfWins;
        this.randIdx = Math.floor(Math.random() * this.memeArray.length);
        this.wordToGuess = this.memeArray[this.randIdx].split("");
        
        let underscoreElem = undefined;
        for(let i=0; i < this.wordToGuess.length; ++i)
        { 
            underscoreElem = document.createElement("span");
            underscoreElem.setAttribute("name",this.wordToGuess[i]);
            underscoreElem.textContent = "__   "; 
            this.guessTextElem.appendChild(underscoreElem);
        }
    },

    endGame: function() {
        //initialize letiables
        this.startGameElem.removeAttribute("style");
        this.guessTextElem.innerHTML = "";
        this.numOfGuessElem.textContent = "";
        this.lettersGuessedElem.textContent = "";
        this.lettersEntered = [];
    },

    displayResult: function() {
        if(this.wordToGuess.length <= 0)
        {
            this.imageElem.style.display = "none";
            this.winTextElem.style.display = "block";
            
            this.audioElem.pause();
            this.audioElem.currentTime = 0;

            this.videoElem.setAttribute("src",this.videoLoc[this.randIdx]);
            this.videoElem.style.display = "block";
            ++this.numOfWins;
        }
    },

    isSameKeyEntered: function(key) {
        //Check if the same key is entered
        //If so, do not use as guess
        for(let i = 0; i < this.lettersEntered.length; ++i)
        {
            if(key === this.lettersEntered[i])
                return true;
        }

        return false;
    },

    displayLettersEntered: function() {
        this.lettersGuessedElem.textContent = "";
        for(let i = 0; i < this.lettersEntered.length; ++i)
            this.lettersGuessedElem.textContent += this.lettersEntered[i] + ", ";
    },

    displayToScreen:  function(key) {
        for(let i = 0; i < this.wordToGuess.length; ++i)
        {
            if(key == this.wordToGuess[i])
            {
                let letterElem = document.getElementsByName(key);
                if(letterElem.length > 1){
                    for(let j = 0; j < letterElem.length; ++j)
                    {   
                        letterElem[j].textContent = key;
                        this.wordToGuess.splice(i,1);
                    }
                }
                else
                {
                    letterElem[0].textContent = key;
                    this.wordToGuess.splice(i,1);
                }    
            }
        }

        this.lettersEntered.push(key);
        this.displayLettersEntered();

        if(this.wordToGuess.length <= 0)
            game.gameOver = true;
    },

    startGame:  function() {
        document.onkeydown = function(kb) {
            
            //Start the game music
            if(game.audioElem.paused)
            {
                game.audioElem.setAttribute("src","assets/datboi.wav");
                game.audioElem.loop = true;
                game.audioElem.play();
            }

            if(kb.keyCode >= 65 && kb.keyCode <= 95 && !game.isSameKeyEntered(kb.key.toLowerCase()))
            {
                if(!game.startGameElem.hasAttribute("style"))
                    game.startGameElem.style.display = "none";  

                --game.guessRemaining;
                if(game.guessRemaining <= 0){
                    game.gameOver = true;
                }
                else {
                    game.numOfGuessElem.textContent = game.guessRemaining;
                }

                game.displayToScreen(kb.key.toLowerCase());
            }

            if(game.gameOver)
            {
                game.displayResult();
                game.endGame();
                game.initGame();
            }
        }
    },

    run: function() {
        // Main Game Logic
        console.log("Running Game!");
        this.initGame();
        this.startGame();
    },
}