const stopwatch = {

    milliseconds: 0,
    centisecondsText: null,
    status: -1,
    mainText: null,
    intervalTime: 10,

    get time (){

        // Obtém o tempo a partir dos milissegundos.
        var cs = parseInt(this.milliseconds % 1000 / 10);
        var sec = parseInt(this.milliseconds / 1000 % 60);
        var min = parseInt(this.milliseconds / (1000 * 60) % 60);
        var hour = parseInt(this.milliseconds / (1000 * 60 * 60));

        // Formata os centésimos de segundos.
        if(cs < 10){
            cs = "0" + cs;
        }

        // Formata os segundos, minutos e horas.
        sec = sec < 10 ? "0" + sec : sec;
        min = min < 10 ? "0" + min : min;
        hour = hour < 10 ? "0" + hour : hour;

        return {hour: hour, min: min, sec: sec, cs: cs};
    },

    init: function(mainText, centisecondsText = null){
        
        this.mainText = mainText;
        this.centisecondsText = centisecondsText;
        this.reset();
    },

    pause: function(){
        this.status = 0;
    },

    reset: function(){

        this.milliseconds = 0;
        clearInterval(this.interval);

        delete this.turns;
        delete this.show;

        this.mainText.innerHTML = "00 : 00 : 00";

        if (this.centisecondsText){
            this.centisecondsText.innerHTML = "00";
        }
    },

    run: function(){

        if (this.status == -1){
            this.interval = setInterval(function(self){self.update()}, this.intervalTime, this);
        }
        this.status = 1;
    },

    stop: function(){

        this.status = -1;
        this.reset();
    },

    update: function(){

        // Obtém o tempo cronometrado.
        var {hour, min, sec, cs} = this.time;

        // Caso status seja 1, será mostrado o tempo atual e a 
        // variável que conta os milissegundos será incrementada.
        if (this.status == 1){

            this.mainText.innerHTML = `${hour} : ${min} : ${sec}`;

            if (this.centisecondsText){
                this.centisecondsText.innerHTML = cs;
            }
            this.milliseconds += this.intervalTime;


        // Caso o status seja ZERO, o tempo cronometrado será mostrado piscando.
        }else if (this.status == 0){

            this.turns = !this.turns ? 0 : this.turns; 

            // A cada 400ms ele esconde ou mostra o texto.
            if (this.turns % 400  == 0){
                this.show = !this.show;
            }

            this.mainText.innerHTML = this.show ? `${hour} : ${min} : ${sec}` : "&nbsp;";

            if (this.centisecondsText){
                this.centisecondsText.innerHTML = this.show ? cs : "&nbsp;";
            }
            this.turns += this.intervalTime;
        }
    }
}
