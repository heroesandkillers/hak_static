var mapaArray = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];
var mapaEquipos = mapaArray;
               
var imagenes = ['img/canvas/hexagonos/tierra.png', 'img/canvas/hexagonos/arena.png', 'img/canvas/hexagonos/montana.png'];
loadImagenes(imagenes, function(){ 

    for(var i = 0; i < mapaArray.length; i++){
        var arriba = true;
        var abajo = true;
        var derecha = true;
        var izquierda = true;
        j = 0;
        while(arriba){
            if(Math.random()* (j - Math.abs((i - mapaArray.length/2)/5)) > 1){
                arriba = false;
            }else{
                mapaArray[i][j] = 0;
            }
            j++;
        }
        j = mapaArray.length -1;
        while(abajo){
            if(Math.random() * ((mapaArray.length -1 - j) - Math.abs((i - mapaArray.length/2)/5)) > 1){
                abajo = false;
            }else{
                mapaArray[i][j] = 0;
            }
            j--;
        }
        j = 0;
        while(izquierda){
            if(Math.random() * (j - Math.abs((i - mapaArray.length/2)/5)) > 1){
                izquierda = false;
            }else{
                mapaArray[j][i] = 0;
            }
            j++;
        }
        j = mapaArray.length -1;
        while(derecha){
            if(Math.random() * ((mapaArray.length -1 - j) - Math.abs((i - mapaArray.length/2)/5)) > 1){
                derecha = false;
            }else{
                mapaArray[j][i] = 0;
            }
            j--;
        }
    };
            
    var suma = 0
    for(var i = 0; i < mapaArray.length; i++){
        for(var j = 0; j < mapaArray[0].length; j++){ 
            if(mapaArray[i][j] == 1) suma++;
        }
    }
        
    if(suma > 182){
        var busqueda = true;
        var origenX;
        var origenY;
        var x;
        var y;
                
        while(busqueda){
                                    
            x = parseInt(Math.random() * mapaArray.length);
            y = parseInt(Math.random() * mapaArray.length);
                            
            if(mapaArray[x][y] == 1){
                busqueda = false;
                mapaArray[x][y] = 0;
                suma--;
                origenX = x;
                origenY = y;
            }
        }
                
        var radio = 1;
        var pruebaX;
        var pruebaY;
        while (suma > 182){
            pruebaX = x;
            pruebaY = y;
                
            var random = parseInt(Math.random() * 4);
            if(random == 0)pruebaX++;
            if(random == 1)pruebaX--;
            if(random == 2)pruebaY++;
            if(random == 3)pruebaY--;
                    
            if(pruebaX > 0 && pruebaX < mapaArray.length && pruebaY > 0 && pruebaY < mapaArray.length){
                if(Math.abs(x - origenX) + Math.abs(y - origenY) < radio){
                    if(mapaArray[x][y] == 1){
                        mapaArray[x][y] = 0;
                        suma--;
                    }   
                    x = pruebaX;
                    y = pruebaY;
                }
            }
            radio = radio + 0.5;
        }
    }else if(suma < 182){
        var recorrido = 1;
                
        while(suma < 182){
            list:
            {
                j = mapaArray.length/2 + recorrido;
                for(var i = mapaArray.length/2 - recorrido; i < mapaArray.length/2 + recorrido; i++){
                    if(mapaArray[i][j] == 0 && Math.random()*2 > 1){
                        mapaArray[i][j] = 1;
                        suma++;
                        if(suma == 182)break list;
                    }
                }
                i = mapaArray.length/2 - recorrido;
                for(var j = mapaArray.length/2 - recorrido; j < mapaArray.length/2 + recorrido; j++){
                    if(mapaArray[i][j] == 0 && Math.random()*2 > 1){
                        mapaArray[i][j] = 1;
                        suma++;
                        if(suma == 182)break list;
                    }
                }
                j = mapaArray.length/2 + recorrido;
                for(var i = mapaArray.length/2 - recorrido; i < mapaArray.length/2 + recorrido; i++){
                    if(mapaArray[i][j] == 0 && Math.random()*2 > 1){
                        mapaArray[i][j] = 1;
                        suma++;
                        if(suma == 182)break list;
                    }
                }
                j = mapaArray.length/2 - recorrido;
                for(var j = mapaArray.length/2 - recorrido; j < mapaArray.length/2 + recorrido; j++){
                    if(mapaArray[i][j] == 0 && Math.random()*2 > 1){
                        mapaArray[i][j] = 1;
                        suma++;
                        if(suma == 182)break list;
                    }
                }                    
                recorrido++;
            }
        }
    }
    //ya son 182
    var arena = 0;
    for(var i = 1; i < mapaArray.length -1; i++){
        for(var j = 1; j < mapaArray.length -1; j++){                    
            if(mapaArray[i][j] == 1 && cercano(i, j, 0)){                        
                mapaArray[i][j] = 2;    
                arena++;
            }                    
        }
    }
    //arena puesta
            
    var busqueda = true;
    var origenX;
    var origenY;
    var x;
    var y;
                
    while(busqueda){
                                    
        x = parseInt(Math.random() * mapaArray.length);
        y = parseInt(Math.random() * mapaArray.length);
                            
        if(mapaArray[x][y] == 1){
            busqueda = false;
            mapaArray[x][y] = 3;
            origenX = x;
            origenY = y;
        }
    }
                
    var radio = 1;            
    var montana = 0;
            
    while (montana < 50){
        pruebaX = x;
        pruebaY = y;
                
        var random = parseInt(Math.random() * 4);
        if(random == 0)pruebaX++;
        if(random == 1)pruebaX--;
        if(random == 2)pruebaY++;
        if(random == 3)pruebaY--;
                    
        if(pruebaX > 0 && pruebaX < mapaArray.length && pruebaY > 0 && pruebaY < mapaArray.length){
            if(Math.abs(x - origenX) + Math.abs(y - origenY) < radio){
                if(mapaArray[x][y] == 1){
                    mapaArray[x][y] = 3;
                    montana++;
                }   
                x = pruebaX;
                y = pruebaY;
            }
        }
        radio = radio + 0.5;
    }
                
    function cercano(i, j, terreno){
                
        if(mapaArray[i+1][j] == terreno)return true;
        if(mapaArray[i-1][j] == terreno)return true;
        if(mapaArray[i][j+1] == terreno)return true;
        if(mapaArray[i][j-1] == terreno)return true;
                
        if(j%2 == 0){                    
            if(mapaArray[i+1][j-1] == terreno)return true;
            if(mapaArray[i+1][j+1] == terreno)return true;
        }else{
            if(mapaArray[i-1][j-1] == terreno)return true;
            if(mapaArray[i-1][j+1] == terreno)return true;
        }                
    }
            
        
    var canvas1 = $("#mapaCanvas");
                
    var canvasInner = $("#mapaCanvasInner");
                        
    canvas1.height("100%");
    canvas1.height(canvas1.height()-25);
    canvas1.width("100%");
    canvas1.width(canvas1.width()-20);
                
    var tamano;
    if(canvas1.height() >= canvas1.width()*1.2){
        tamano = canvas1.width();
    }else{
        tamano = canvas1.height();
    }
                
    canvasInner.height(tamano);
    canvasInner.width(tamano*1.2);
                
    tamano = tamano*1.2;
    canvas1.height(tamano);
    canvas1.width(tamano*1.2);
                
    canvas1.css("margin-top","-9%");
    canvas1.css("margin-left","-11.5%");
                
    //                canvasInner.css("margin-top","10px");
    canvasInner.css("margin-left","10px");
               
    var canvas2 = document.getElementById('mapaCanvas');
            
    var stage = new createjs.Stage(canvas2);
    var grupo = new createjs.Container();
        
    for(var i = 0; i < mapaArray.length; i++){
        for(var j = 0; j < mapaArray[i].length; j++){
                    
            if(mapaArray[i][j] != 0){
                        
                var h1 = new Image();
                        
                if(mapaArray[i][j] == 1){
                    h1.src = 'img/canvas/hexagonos/tierra.png';      
                }else if(mapaArray[i][j] == 2){
                    h1.src = 'img/canvas/hexagonos/arena.png';
                }else if(mapaArray[i][j] == 3){
                    h1.src = 'img/canvas/hexagonos/montana.png';
                }
                var tierra =  new createjs.Bitmap(h1);
                if(j%2 == 0){
                    tierra.x = i*30 + 15;
                }else{
                    tierra.x = i*30;
                }
                tierra.y = j*25;
                        
                grupo.addChild(tierra); 
            }         
        }
    }
             
    stage.addChild(grupo);           
    stage.update();
                
    colocarEquipos(stage);            
});
            
function colocarEquipos(stage){
                
    var grupoEquipos = new createjs.Container();
                
    for(var i = 0; i < mapaEquipos.length; i++){                
        for(var j = 0; j < mapaEquipos[i].length; j++){
                        
            if(mapaEquipos[i][j] != 0){
                           
                var num = parseInt(Math.random()*14) +1;
                           
                mapaEquipos[i][j] = num;
            }                        
        }
    } 
                
    for(var i = 0; i < mapaEquipos.length; i++){
        for(var j = 0; j < mapaEquipos[i].length; j++){
                    
            if(mapaEquipos[i][j] != 0){
                        
                var hex = new createjs.Shape();                            
                var fill, stroke;
                            
                if(mapaEquipos[i][j] == 1){
                    fill = 'rgba(255,0,0,0.2)';
                    dibujarLimites(i, j, 1, 'red');
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 2){
                    fill = 'rgba(255,255,0,0.2)';   
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 3){
                    fill = 'rgba(255,0,255,0.2)';  
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 4){
                    stroke = 'rgba(255,255,255,1)';
                }else if(mapaEquipos[i][j] == 5){
                    fill = 'rgba(0,255,0,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 6){
                    fill = 'rgba(0,255,255,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 7){
                    fill = 'rgba(0,0,255,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 8){
                    fill = 'rgba(122,0,0,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 9){
                    fill = 'rgba(122,122,0,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 10){
                    fill = 'rgba(122,122,122,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 11){
                    fill = 'rgba(0,122,0,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 12){
                    fill = 'rgba(0,122,122,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 13){
                    fill = 'rgba(0,0,122,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }else if(mapaEquipos[i][j] == 14){
                    fill = 'rgba(0,0,0,0.2)';
                    stroke = 'rgba(255,0,0,1)';
                }
                            
                //beginStroke(stroke).
                hex.graphics.beginFill(fill).drawPolyStar(17, 17, 17, 6, 2, 30);
                            
                if(j%2 == 0){
                    hex.x = i*30 + 15;
                }else{
                    hex.x = i*30;
                }
                hex.y = j*25;
                        
                grupoEquipos.addChild(hex); 
            }         
        }
    }
    stage.addChild(grupoEquipos);           
    stage.update();
                
    function dibujarLimites(i, j, equipo, color){
                    
        if(j%2 == 0){
                      
            if(mapaEquipos[i-1][j] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +16, j*25 + 8).lineTo(i*30 +16, j*25 + 24);
                stage.addChild(d);
            }
            if(mapaEquipos[i+1][j] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +45, j*25 + 8).lineTo(i*30 +45, j*25 + 24);
                stage.addChild(d);
            }
            if(mapaEquipos[i][j-1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +16, j*25 + 8).lineTo(i*30 +30, j*25);
                stage.addChild(d);
            }
            if(mapaEquipos[i][j+1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +16, j*25 + 24).lineTo(i*30 +30, j*25 +32);
                stage.addChild(d);
            }
            if(mapaEquipos[i+1][j-1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +45, j*25 + 8).lineTo(i*30 +30, j*25);
                stage.addChild(d);
            }
            if(mapaEquipos[i+1][j+1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +45, j*25 + 24).lineTo(i*30 +30, j*25 +32);
                stage.addChild(d);
            }
                    
        }else{
                        
            if(mapaEquipos[i-1][j] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +1, j*25 + 8).lineTo(i*30 +1, j*25 + 24);
                stage.addChild(d);
            } 
            if(mapaEquipos[i+1][j] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +30, j*25 + 8).lineTo(i*30 +30, j*25 + 24);
                stage.addChild(d);
            }
            if(mapaEquipos[i][j-1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +30, j*25 + 8).lineTo(i*30 +15, j*25);
                stage.addChild(d);
            }
            if(mapaEquipos[i][j+1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30 +30, j*25 + 24).lineTo(i*30 +15, j*25 + 32);
                stage.addChild(d);
            }
            if(mapaEquipos[i-1][j-1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30, j*25 + 8).lineTo(i*30 +15, j*25);
                stage.addChild(d);
            }
            if(mapaEquipos[i-1][j+1] != equipo){
                var d = new createjs.Shape(); 
                d.graphics.beginStroke(color).moveTo(i*30, j*25 + 24).lineTo(i*30 +15, j*25 +32);
                stage.addChild(d);
            }
        }
               
    }
}


//2ª OPCION

//..................................................................................................................
                      
                      
var mapaArray = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];
            
var imagenes = ['img/canvas/hexagonos/tierra.png', 'img/canvas/hexagonos/arena.png', 'img/canvas/hexagonos/montana.png'];
loadImagenes(imagenes, function(){ 
            
    //LAGO            
    var suma = 0
    for(var i = 0; i < mapaArray.length; i++){
        for(var j = 0; j < mapaArray[0].length; j++){ 
            if(mapaArray[i][j] == 1) suma++;
        }
    }
        
    if(suma > 300){
        var busqueda = true;
        var origenX;
        var origenY;
        var x;
        var y;
                
        while(busqueda){
                                    
            x = parseInt(Math.random() * mapaArray.length);
            y = parseInt(Math.random() * mapaArray.length);
                            
            if(mapaArray[x][y] == 1){
                busqueda = false;
                mapaArray[x][y] = 0;
                suma--;
                origenX = x;
                origenY = y;
            }
        }
                
        var radio = 1;
        var pruebaX;
        var pruebaY;
        while (suma > 300){
            pruebaX = x;
            pruebaY = y;
                
            var random = parseInt(Math.random() * 4);
            if(random == 0)pruebaX++;
            if(random == 1)pruebaX--;
            if(random == 2)pruebaY++;
            if(random == 3)pruebaY--;
                    
            if(pruebaX > 0 && pruebaX < mapaArray.length && pruebaY > 0 && pruebaY < mapaArray.length){
                if(Math.abs(x - origenX) + Math.abs(y - origenY) < radio){
                    if(mapaArray[x][y] == 1){
                        mapaArray[x][y] = 0;
                        suma--;
                    }   
                    x = pruebaX;
                    y = pruebaY;
                }
            }
            radio = radio + 0.5;
        }
    }

                
    var castillosArray = mapaArray;
                
    //ya son 182
    var arena = 0;
    for(var i = 0; i < mapaArray.length; i++){
        for(var j = 0; j < mapaArray.length; j++){                    
            if(mapaArray[i][j] == 1 && cercano(i, j, 0)){                        
                mapaArray[i][j] = 2;    
                arena++;
            }                    
        }
    }
    //arena puesta
            
    var busqueda = true;
    var origenX;
    var origenY;
    var x;
    var y;
                
    while(busqueda){
                                    
        x = parseInt(Math.random() * mapaArray.length);
        y = parseInt(Math.random() * mapaArray.length);
                            
        if(mapaArray[x][y] == 1){
            busqueda = false;
            mapaArray[x][y] = 3;
            origenX = x;
            origenY = y;
        }
    }
                
    var radio = 1;            
    var montana = 0;
            
    while (montana < 50){
        pruebaX = x;
        pruebaY = y;
                
        var random = parseInt(Math.random() * 4);
        if(random == 0)pruebaX++;
        if(random == 1)pruebaX--;
        if(random == 2)pruebaY++;
        if(random == 3)pruebaY--;
                    
        if(pruebaX > 0 && pruebaX < mapaArray.length && pruebaY > 0 && pruebaY < mapaArray.length){
            if(Math.abs(x - origenX) + Math.abs(y - origenY) < radio){
                if(mapaArray[x][y] == 1){
                    mapaArray[x][y] = 3;
                    montana++;
                }   
                x = pruebaX;
                y = pruebaY;
            }
        }
        radio = radio + 0.5;
    }
                
    function cercano(i, j, terreno){
                    
        if(i+1 < mapaArray.length)if(mapaArray[i+1][j] == terreno)return true;
        if(i-1 > -1)if(mapaArray[i-1][j] == terreno)return true;
        if(j+1 < mapaArray[0].length)if(mapaArray[i][j+1] == terreno)return true;
        if(j-1 > -1)if(mapaArray[i][j-1] == terreno)return true;
                
        if(j%2 == 0){                    
            if(i+1 < mapaArray.length && j-1 > -1)if(mapaArray[i+1][j-1] == terreno)return true;
            if(i+1 < mapaArray.length && j+1 < mapaArray[0].length)if(mapaArray[i+1][j+1] == terreno)return true;
        }else{
            if(i-1 > -1 && j-1 > -1)if(mapaArray[i-1][j-1] == terreno)return true;
            if(i-1 > -1 && j+1 < mapaArray[0].length)if(mapaArray[i-1][j+1] == terreno)return true;
        }
        return false;
    }            
        
    for(var i = 0; i < mapaArray.length; i++){
        for(var j = 0; j < mapaArray[i].length; j++){
                    
            if(mapaArray[i][j] != 0){
                        
                var h1 = new Image();
                        
                if(mapaArray[i][j] == 1){
                    h1.src = 'img/canvas/hexagonos/tierra.png';      
                }else if(mapaArray[i][j] == 2){
                    h1.src = 'img/canvas/hexagonos/arena.png';
                }else if(mapaArray[i][j] == 3){
                    h1.src = 'img/canvas/hexagonos/montana.png';
                }
                var tierra =  new createjs.Bitmap(h1);
                if(j%2 == 0){
                    tierra.x = i*35 +20;
                }else{
                    tierra.x = i*35;
                }
                tierra.y = j*29;
                            
                tierra.regX = 17.5;
                tierra.regY = 14.5;
                        
                grupo.addChild(tierra); 
            }         
        }
    }
             
    stage.addChildAt(grupo,0);           
    stage.update();
                
    colocarCastillos(castillosArray);
//colocarEquipos(stage);            
});
            
//...........................................................................................................................................................
            
