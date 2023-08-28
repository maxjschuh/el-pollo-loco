let canvas;
let world;

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas);


    // setTimeout(() => {
    //     ctx.drawImage(character, 20, 20, 50, 150); 

    // }, 2000);

}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == 37) {
        // character.super().moveLeft();
        console.log('links');
    }
    else if (e.keyCode == 39) {
        // moveRight();
        console.log('rechts');
    }
}






