const canvas = document.querySelector('canvas');
var texto = document.getElementById('tempo');
const ctx = canvas.getContext('2d');

var mouse_gravi = document.getElementById('mouse_gravidade');
var int_gravi = document.getElementById('interfere_gravidade');

const width = canvas.width = window.innerWidth - 30;
const height = canvas.height = window.innerHeight - 60;

var XX = 0;
var YY = 0;

G = 0.00000000006674

function getRndInteger(min, max) {
    /*gera um número aleatório entre um intervalo min - max*/
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Ball(x, y, velX, velY, color, size) {
    /*Objeto da bola com posicao, velocidade, cor e tamanho*/
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}  

Ball.prototype.draw = function() {
    /*método da bola que a desenha no canvas*/
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    /*método da bola que atualiza sua posicao realizando todos os calculos*/
    var colisao_parede = .4
    if ((this.x) >= width) {
      this.velX = -(this.velX*colisao_parede);
      this.x = width;
    }
  
    if ((this.x) <= 0) {
      this.velX = -(this.velX*colisao_parede);
      this.x = 0;
    }
  
    if ((this.y) >= height) {
      this.velY = -(this.velY*colisao_parede);
      this.y = height;
    }
  
    if ((this.y) <= 0) {
      this.velY = -(this.velY*colisao_parede);
      this.y = 0;
    }

    //this.velX *= .9;
    //this.velX += .2;

    //this.velY *= 0.9;
    //this.velY += 0.1;

    this.x += this.velX*.9;
    this.y += this.velY*.9;

    //################################  O CURSOR TEM GRAVIDADE E ATRAI AS BOLAS PARA SI
    //esta desativado
    if (XX != 0 && YY != 0){
        this.velX += (XX - this.x)/100 * (1/Math.pow(this.size,2));
        this.velY += (YY - this.y)/100 * (1/Math.pow(this.size,2));
    }//################################  O CURSOR TEM GRAVIDADE E ATRAI AS BOLAS PARA SI


    //################################  GRAVIDADE ENTRE AS BOLAS (INFLUENCIAM UMAS NAS OUTRAS)
    for (let j = 0; j < bolas.length; j++) {
        if (!(this === bolas[j])) { //quando não for a bora atual

        /*calcula a distancia entr o centro das duas bolas comparadas*/
        var distancia = Math.sqrt((bolas[j].x - this.x)**2 + (bolas[j].y - this.y)**2);

        /*de -pi á pi, "tan(seno / cosseno)" calcula o angulo formado pelo vetod de uma bola a outra*/

        var volume = (4*3.14*(bolas[j].size**3))/3;
        var angulo = Math.atan2((bolas[j].y - this.y), (bolas[j].x - this.x));
            /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LEI DA GRAVITAÇÃO UNIVERSAL             */
            //Relação dos corpos/massas (força entre eles)
            //F = (G*M*m)/(d^2)
            //P = g*m
            //g = (G*m)/(d^2)
            // g : aceleração da gravidade
            
            if (distancia > ((this.size) + (bolas[j].size))) {
                g = (.01*volume)/(distancia**2)
                this.velX += (Math.cos(angulo))*g;
                this.velY += (Math.sin(angulo))*g;
            }else{ // quando uma bola esta dentro de outra
                //angulo em que elas se colidiram (vetor normal de força)
                /*
                var angulo_colisao_normal = Math.atan2(this.y - bolas[j].y, this.x - bolas[j].x);
                //angulo em que ela se desloca
                var angulo_desloc = Math.atan2(this.velY, this.velX);
                
                velMOD = Math.sqrt((this.velX)**2 + (this.velY)**2);

                this.velX = Math.cos(angulo_colisao_normal - angulo_desloc) * velMOD
                this.velY = Math.sin(angulo_colisao_normal - angulo_desloc) * velMOD
                */
            }

            //this.velX += (1/(distancia + .01))*Math.cos(angulo)* (1/Math.pow(this.size,2))*50;
            //this.velY += (1/(distancia + .01))*Math.sin(angulo)* (1/Math.pow(this.size,2))*50;
            /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LEI DA GRAVITAÇÃO UNIVERSAL             */



            

            /*calcula gravidade. 1/distancia (quanto menor a distancia maior a influencia gravitacional)
            separados os componentes X e Y com cos e sin.
            tudo multiplica por 1/tamanho ou massa. quanto maior a "massa" menos ele sofre a influencia gravitacional, logo se move menos*/
            
            //this.velX += (1/(distancia + .01))*Math.cos(angulo)* (1/Math.pow(this.size,2))*50;
            //this.velY += (1/(distancia + .01))*Math.sin(angulo)* (1/Math.pow(this.size,2))*50;

            /*o angulo do vetor velocidade, sendo seu deslocamento vetorial.*/
            var angulo_desloc = Math.atan2(this.velY, this.velX);

            /*detecta a colisao entre as duas bolas*/
            
        }
    }
    //################################  GRAVIDADE ENTRE AS BOLAS (INFLUENCIAM UMAS NAS OUTRAS)
}

function getMousePos(canvas, evt) {
    /*Retorna a posicao relativa do cursor*/
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas.addEventListener("mousedown", function (evt) {
    /*evento de clique do mouse*/
    var mousePos = getMousePos(canvas, evt);
    texto.textContent = 'x: ' + mousePos.x + 'y: ' + mousePos.y;
    //if (mousePos.x < 0 || mousePos.x == null){
    //    XX = 0;
    //}else{
        //XX = mousePos.x;
    //}

    //if (mousePos.y < 0 || mousePos.y == null){
    //    YY = 0;
    //}else{
        //YY = mousePos.y;

        /*em cada click na tela cria uma nova bola com tamanho aleatorio e adiciona na lista de bolas*/
        bolas.shift(); //remove o primeiro elemento da lista
        bolas.push(new Ball(mousePos.x, mousePos.y, 0, 0, 'yellow', getRndInteger(1, 40)));

    //}
    return mousePos;
}, false);

//Get Mouse Position


//let bola = new Ball(100, 10, 2, 2, 'blue', 5);

var bolas = [];

/*cria uma quantidade de bolas distribuidas em grade*/
var qtd = 6;
/*
for(let k = 1; k<qtd; k++){
    for(let l = 1; l<qtd; l++){
        bolas.push(new Ball((width/qtd)*k, (height/qtd)*l, 0, 0, 'white', 3));
    }
}
*/
/*ou cria aleatorio na tela*/
for(let i = 1; i<qtd*qtd; i++){
    bolas.push(new Ball(getRndInteger(10, width-10), getRndInteger(10, height-10), getRndInteger(-2, 2), getRndInteger(-2, 2), 'white', getRndInteger(1, 5)));
}



/*o loop em si limpa a tela e desenha cada uma das bolas da lista alem de atualizar cada uma com o update*/
function loop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    for (i=0; i<bolas.length; i++){
        bolas[i].draw();
        bolas[i].update();
    }
    requestAnimationFrame(loop);
}

loop();
