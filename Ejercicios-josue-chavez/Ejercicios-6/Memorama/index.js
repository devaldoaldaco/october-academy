(function(){
    const emojis = ['🍉','🍇','🍓','🍒','🍍','🥝','🍌','🍑'];
    const boardEl = document.getElementById('board');
    const score1El = document.getElementById('score1');
    const score2El = document.getElementById('score2');
    const currentEl = document.getElementById('current');
    const p1El = document.getElementById('p1');
    const p2El = document.getElementById('p2');
    const foundEl = document.getElementById('found');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const toast = document.getElementById('toast');

    let deck = [];
    let flipped = [];
    let lock = false; 
    let currentPlayer = 1; // 1 o 2
    let scores = {1:0,2:0};
    let foundPairs = 0;

    function makeDeck(){
        const doubled = emojis.concat(emojis);
        deck = shuffled(doubled).map((emoji, idx) => ({id: idx, emoji, matched:false}));
    }

    function shuffled(arr){
        const a = arr.slice();
        for(let i=a.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
        }
        return a;
    }

    function render(){
        boardEl.innerHTML='';
        deck.forEach(card=>{
        const el = document.createElement('div');
        el.className='card';
        el.dataset.id=card.id;

        if(card.matched) el.classList.add('flipped','disabled');

        el.innerHTML = `
            <div class="card-inner">
            <div class="face front">${card.emoji}</div>
            <div class="face back">?</div>
            </div>`;

        el.addEventListener('click', onCardClick);
        boardEl.appendChild(el);
        });
        updateUI();
    }

    function onCardClick(e){
        if(lock) return;
        const cardWrap = e.currentTarget;
        const id = Number(cardWrap.dataset.id);
        const card = deck.find(c=>c.id===id);
        
        if(!card || card.matched) return;
        if(flipped.some(f=>f.card.id===id)) return;

        flipVisual(cardWrap);
        flipped.push({card, el:cardWrap});

        if(flipped.length===2){
        checkMatch();
        }
    }

    function flipVisual(cardWrap){
        cardWrap.classList.add('flipped');
    }
    function unflipVisual(cardWrap){
        cardWrap.classList.remove('flipped');
    }

    function checkMatch(){
        lock=true;
        const [a,b] = flipped;
        if(a.card.emoji === b.card.emoji){
            a.card.matched = true; b.card.matched = true;
            a.el.classList.add('flipped','disabled');
            b.el.classList.add('flipped','disabled');

            scores[currentPlayer] += 1;
            foundPairs += 1;
            updateScores();

            showToast('¡Pareja encontrada!');

            resetTurn(false);
            if(foundPairs===emojis.length) {
                setTimeout(endGame, 700);
            } else {
                setTimeout(()=>{ lock=false; }, 700);
            }
        } else {
            setTimeout(()=>{
                unflipVisual(a.el);
                unflipVisual(b.el);
                resetTurn(true);
                lock=false;
            }, 900);
        }
    }

    function resetTurn(shouldSwitch){
        flipped = [];
        if(shouldSwitch) switchPlayer();
        updateUI();
    }

    function switchPlayer(){
        currentPlayer = currentPlayer===1?2:1;
        updateUI();
    }

    function updateScores(){
        score1El.textContent = scores[1];
        score2El.textContent = scores[2];
        foundEl.textContent = foundPairs;
    }

    function updateUI(){
        currentEl.textContent = `Jugador ${currentPlayer}`;
        p1El.classList.toggle('active', currentPlayer===1);
        p2El.classList.toggle('active', currentPlayer===2);
        updateScores();
    }

    function endGame(){
        const s1 = scores[1], s2 = scores[2];
        let title='¡Partida terminada!';
        let body='';
        if(s1> s2){ title='¡Ganador: Jugador 1!'; body=`Puntaje ${s1} — ${s2}`; }
        else if(s2> s1){ title='¡Ganador: Jugador 2!'; body=`Puntaje ${s2} — ${s1}`; }
        else { title='¡Empate!'; body=`Ambos ${s1} puntos`; }
        modalTitle.textContent = title;
        modalBody.textContent = body;
        modal.classList.add('show');
    }

    function showToast(text){
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(()=>{ toast.classList.remove('show'); }, 900);
    }

    document.getElementById('restart').addEventListener('click', ()=>{ startGame(); });
    document.getElementById('shuffle').addEventListener('click', ()=>{ makeDeck(); render(); });
    document.getElementById('play-again').addEventListener('click', ()=>{ modal.classList.remove('show'); startGame(); });

    function startGame(){
        makeDeck();
        flipped=[]; lock=false; currentPlayer=1; scores={1:0,2:0}; foundPairs=0; 
        updateUI(); 
        render(); 
        modal.classList.remove('show'); 
        toast.classList.remove('show');
    }

    startGame();

})();