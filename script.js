(function() {
    'use strict';
    var userGuess = [],
    colors = [],
    btnsProp = document.getElementsByClassName('btns'),
    guessPlace = document.getElementsByClassName('guess'),
    hints = document.getElementsByClassName('hint'),
    codeCracker = document.getElementsByClassName('secret socket'),
    modelOverlay = document.getElementById('modalOverlay'),
    modalMessage = document.getElementById('modalMessage'),
    pegs = {
        1:'grey',
        2:'red',
        3:'blue',
        4:'yellow',
        5:'orange',
        6:'green'
    };

    
    var rowInc = 1;
    var hintInc = 1;

    function gameSetup()
    {
        colorGenerator(1,7);
        for(var i=0;i<btnsProp.length;i++)
        {
            btnsProp[i].addEventListener('click', addGuess , false);
        }
    
        document.getElementById('delete').onclick = deleteGuess;
        document.getElementById('reset').onclick = restart;
    
    }

    function addGuess()
    {
        var self = this;
        var stocks = guessPlace[guessPlace.length - rowInc].getElementsByClassName('socket');
        stocks[userGuess.length].className = stocks[userGuess.length].className + ' peg ' + self.id;
    
        userGuess.push(+(self.value));
        
        if(userGuess.length === 4)
        {
            if(compare())
            {
            gameState('won');
            }
            else
            {
              rowInc+=1;
            }
        }      
        
        if ( rowInc === guessPlace.length + 1 && !compare() )
        gameState('lost');     
    }

    function compare () {
        var isMatch = true;
        var codeCopy = colors.slice(0);
    
        for (var i = 0; i < colors.length; i++) {
          if (userGuess[i] === colors[i]) {
            insertPeg('hit');
            codeCopy[i] = 0;
            userGuess[i] = -1;
          } else
            isMatch = false;
        }
    
        for (var j = 0; j < colors.length; j++) {
          if (codeCopy.indexOf(userGuess[j]) !== -1) {
            insertPeg('almost');
            codeCopy[codeCopy.indexOf(userGuess[j])] = 0;
          }
        }
    
        hintInc += 1; 
        userGuess = []; 
    
        return isMatch;
      }
    
      function insertPeg (type) {
        var sockets = hints[hints.length - hintInc].getElementsByClassName('js-hint-socket');
        sockets[0].className = 'socket ' + type;
      }
    
    function deleteGuess()
    {
        if(userGuess.length!=0)
        {
        var stocks = guessPlace[guessPlace.length - rowInc].getElementsByClassName('socket');
        stocks[userGuess.length - 1].className = ' socket ';
        userGuess.pop();
        }
    }

    function colorGenerator(min,max)
    {
        for(var colorGen=0;colorGen<4;colorGen++)
        {
            colors[colorGen] = Math.floor(Math.random() * (max - min)) + min;
            console.log(colors[colorGen]);
        }
    }
    
    function restart()
    {
        
        userGuess = [];
        clearBoard();
        hideModal();
        hintInc = 1;
        rowInc = 1;
        gameSetup();
        document.getElementsByTagName('body')[0].className = '';
        hideCode();
    }

    function clearBoard()
    {
        for (var i = 0; i < guessPlace.length; i++) {
            var socket = guessPlace[i].getElementsByClassName('socket');
            for (var j = 0; j < 4; j++) {
              socket[j].className = 'socket';
            }
        }
        
        for (var i = 0; i < hints.length; i++) {
            var socketCollection = hints[i].getElementsByClassName('socket');
            for (var j = 0; j < 4; j++) {
              socketCollection[j].className = 'js-hint-socket socket';
            }
        }
    }
 
function gameState(state)
    {
        gameOver();
        modelOverlay.className = 'modalOverlay visible';
        document.getElementById('restart').addEventListener('click', restart , false);
        document.getElementById('hideModal').addEventListener('click', hideModal, false);
        if(state === 'won')
        {
            var ShowMessage = document.getElementById('resultMessage');
            ShowMessage.innerHTML = 'Congratulations! You Won.';
            showsMessage.style.color = '#008080';
        }
        if(state === 'lost')
        {
            var ShowMessage = document.getElementById('resultMessage');
            ShowMessage.innerHTML = 'Try Again! You lost.';
            ShowMessage.style.color = '#FF4136';
        }
    }

 
 function gameOver()
    {
        for ( var i = 0 ; i < btnsProp.length; i++)
        {
            btnsProp[i].removeEventListener('click' , addGuess , false);
        }
        revealCode();
    }

    function hideModal()
    {
        modelOverlay.className = 'modalOverlay';
    }

    function revealCode()
    {
        for(var i=0;i<codeCracker.length;i++)
        {
            codeCracker[i].innerHTML = '';
            codeCracker[i].className = codeCracker[i].className + ' ' + pegs[colors[i]];
        }
    }

    function hideCode()
    {
        for(var i=0;i<codeCracker.length;i++)
        {
            codeCracker[i].innerHTML = '?';
            codeCracker[i].className ='secret socket';
        }
    }

    gameSetup();
}())