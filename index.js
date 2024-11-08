 const DECISON_USER = 75;
 let isAnimation =  false; 
 let pullDeltax = 0;// para captar si la carta se mueve

 function starDrag (e) {
    if (isAnimation) return

    const actulaCard = e.target.closest('article')
    if (!actulaCard) return 

    const startX = e.pageX ?? e.touches[0].pageX

    //eventos de el mouse y el la pantalla

    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onEnd);


    document.addEventListener('touchmove',onMove,{passive:true});
    document.addEventListener('touchend',onEnd,{passive:true});
    console.log(e)

    function onMove(e) {
        const currentX = e.pageX ?? e.touches[0].pageX
    
        pullDeltax = currentX - startX;

        if (pullDeltax == 0) return

        isAnimation = true;

        const deg = pullDeltax/10;

        actulaCard.style.transform = `translateX(${pullDeltax}px)
        rotate(${deg}deg)
        `
        actulaCard.style.cursor = 'grabbing';

        const opacity = Math.abs(pullDeltax) / 100
        const isRight = pullDeltax > 0
  
        const choiceEl = isRight
          ? actulaCard.querySelector('.choice.like')
          : actulaCard.querySelector('.choice.nope')
  
        choiceEl.style.opacity = opacity
      
   
   
     }
     
 function onEnd(e) {
            
            document.removeEventListener('mousemove',onMove);
            document.removeEventListener('mouseup',onEnd);
        
            document.removeEventListener('touchmove',onMove,{passive:true});
            document.removeEventListener('touchend',onEnd,{passive:true});
            console.log(e)
    
            const decision = Math.abs(pullDeltax) >= DECISON_USER;

            if (decision) {
                
                const goRight = pullDeltax >= DECISON_USER;
                const goLeft = !goRight;

                actulaCard.classList.add(goRight ? 'go-right' : 'go-left');
                actulaCard.addEventListener('transitionend',()=>{
                    actulaCard.remove()
                })
                
        } else {
            actulaCard.classList.add('reset');
            actulaCard.classList.remove( 'go-right','go-left' );

            actulaCard.querySelectorAll('.choice').forEach(choice => {
                choice.style.opacity = 0
              })
        }

        actulaCard.addEventListener('transitionend',()=>{
            actulaCard.removeAttribute('style');
            actulaCard.classList.remove('reset');

            pullDeltax = 0;
            isAnimation = false;
        })
     }  
 }


    document.addEventListener('mousedown',starDrag);
    document.addEventListener('touchstart',starDrag,{passive:true});

 