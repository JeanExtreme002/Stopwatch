const progressBar = {

    element: null,
    maxWidth: null,
    total: 100,
    value: 0,

    get progress(){
        return 100 / this.total * this.value;
    },

    init: function(element, maxWidth, total = 100){
        this.element = element;
        this.maxWidth = maxWidth;
        this.total = total;
    },

    update: function(){
        this.element.style.width = this.maxWidth / 100 * this.progress + "px";
    }
}