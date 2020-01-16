function adjustPosition(){
    
    // Método para alinhar ajustar a posição do elementos principais da página.
    
    painel.style.left = Math.round(window.innerWidth / 2 - painel.offsetWidth / 2) + "px";
    button.style.left = Math.round(window.innerWidth /2 - button.offsetWidth / 2) + "px";
    bar.style.left = Math.round(window.innerWidth / 2 - bar.offsetWidth / 2) + "px";
    bar.style.top = painel.offsetHeight + 100 + "px";
}


function createSquare(element){

    var square = document.createElement("div");
    square.setAttribute("class","square");
    element.appendChild(square);

    square.style.left = element.offsetWidth / 2 - square.offsetWidth / 2 + "px";
    square.style.top = element.offsetHeight / 2 - square.offsetHeight / 2 + "px";   
}


function createTriangle(element){

    var triangle = document.createElement("div");
    triangle.setAttribute("class","triangle-right");
    element.appendChild(triangle);

    triangle.style.left = element.offsetWidth / 2 - triangle.offsetWidth / 2 + "px";
    triangle.style.top = element.offsetHeight / 2 - triangle.offsetHeight / 2 + "px";
}


function alternate(){

    // Alterna entre o cronômetro entre Run e Pause.

    switch(stopwatch.status){

        case 1:
            stopwatch.pause();
            break;

        default:
            run();
    }
}


function init(){

    const painel = document.getElementById("painel");
    const mainText = document.getElementById("time");
    const centisecondsText = document.getElementById("centiseconds");

    const progressBarElement = document.getElementById("progressBar");
    const bar = document.getElementById("bar");
    const maxWidth = bar.offsetWidth;

    const button = document.getElementById("button");

    // Inicializa o crônometro e a barra de progresso.
    stopwatch.init(mainText, centisecondsText);
    progressBar.init(progressBarElement, maxWidth, 60);

    // Define os eventos.
    button.onclick = run;
    painel.addEventListener("click", alternate);
    painel.addEventListener("dblclick", stop);

    adjustPosition();
    updateProgressBar();
}


function removeAllChild(element){

    for (let child of element.children){
        element.removeChild(child);
    }
}


function run(){

    removeAllChild(button);
    createSquare(button);

    button.onclick = stop;
    stopwatch.run();
}


function stop(){

    removeAllChild(button);
    createTriangle(button);

    button.onclick = run;
    stopwatch.stop();
}


function updateProgressBar(){

    progressBar.value = stopwatch.milliseconds / 1000 % 60;
    progressBar.update();
    requestAnimationFrame(updateProgressBar);
}
