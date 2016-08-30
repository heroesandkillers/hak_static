//
//var mapCreator = {
//    canvas: document.createElement('canvas'),
//    stage: "",
//    castles: [],
//
//    show: function() {
//        var mapa = global.mapa;
//        var back = global.back;
//
//        if (typeof back == 'undefined' || back == "") {
//            if (typeof mapa == 'undefined' || mapa == "") {
//                mapa = this.randomize(global.liga);
//            }
//            back = this.camino2();
//            ajax.setMapa(mapa, back);
//        }
//
//        var res = this.compose(mapa, back);
//        $(res).attr("id", "mapaCanvas");
//
//        var w = $("body").width() / 2 + 50;
//        var h = $("body").height() - 150;
//
//        var size = Math.min(w, h);
//        $(res).width(size);
//        $(res).height(size);
//        $(res).css("margin-left", (w / 2 - 60) + "px");
//        $(res).css("margin-top", "10px");
//
//        var canvasInner = $("#mapaCanvasInner");
//        canvasInner.html(res);
//
//        $(res).draggable({
//            drag: function(event, ui) {
//                $("#handler").css('background-position-x', event.pageX);
//                $("#handler").css('background-position-y', event.pageY);
//            }
//        });
//
//    },
//    randomize: function(liga) {
//        var bases = [];
//        var contacto, x, y;
//
//        var contador = 0;
//        while (bases.length < liga.length) {
//            contacto = false;
//
//            x = parseInt(Math.random() * 850 + 50);
//            y = parseInt(Math.random() * 850 + 100);
//            for (var j = 0; j < bases.length; j++) {
//                if (Math.abs(bases[j].x - x) + Math.abs(bases[j].y - y) < (300 - contador)) {
//                    contacto = true;
//                }
//            }
//
//            if (contacto === false) {
//                var base = {
//                    x: x,
//                    y: y
//                };
//                bases[bases.length] = base;
//            }
//            if (contador < 100) {
//                contador++;
//            }
//        }
//        return bases;
//
//    },
//    compose: function(mapa, back) {
//        var ths = this;
//        var liga = global.liga;
//        var castillos = [];
//        var canvas = this.canvas;
//
//        canvas.width = 1000;
//        canvas.height = 1000;
//
//        var canvasInner = $("#mapaCanvasInner");
//        canvasInner.html(canvas);
//
//        var w = $("body").width() / 2 + 50;
//        var h = $("body").height() - 150;
//
//        var size = Math.min(w, h);
//        $("#mapaCanvas").width(size);
//        $("#mapaCanvas").height(size);
//        $("#mapaCanvas").css("margin-left", (w / 2 - 60) + "px");
//        $("#mapaCanvas").css("margin-top", "10px");
//
//        this.stage = stage = new createjs.Stage(canvas);
//        stage.enableMouseOver();
//        var container = new createjs.Container();
//
//        //container.addChild(back);
//
//        for (var i = 0; i < liga.length; i++) {
//            var lvl = 4;
//            var cons = {};
//            if (typeof liga[i].cons != 'undefined') {
//                cons = JSON.parse(liga[i].cons);
//                lvl = parseInt(cons.fort) + 1;
//            }
//
//            var h1 = new Image();
//            h1.src = org + 'img/construcciones/castillo' + lvl + '.png';
//
//            var castillo = new createjs.Bitmap(h1);
//            castillos[castillos.length] = castillo;
//
//            castillo.name = "castle";
//            castillo.i = i;
//            castillo.scaleX = 0.5;
//            castillo.scaleY = 0.5;
//            $(h1).load(ths.reg(h1, castillo));
//            this.castles[i] = castillo;
//
//            var grupo = new createjs.Container();
//            grupo.id = liga[i].id;
//            grupo.x = mapa[i].x;
//            grupo.y = mapa[i].y;
//
//            var text = new createjs.Text(liga[i].username, "20px Arial", "black");
//            text.textAlign = 'center';
//            text.y = 60;
//            text.textBaseline = "alphabetic";
//
//            var line = text.getMeasuredWidth() + 10;
//
//            var rect = new createjs.Shape();
//            rect.graphics.beginFill("rgba(255,255,255,0.5)").drawRect(0, 0, line, 20);
//            rect.y = 45;
//            rect.regX = line / 2;
//            grupo.addChild(castillo);
//            grupo.addChild(rect);
//            grupo.addChild(text);
//            this.mouseover(grupo, liga[i]);
//
//            container.addChild(grupo);
//        }
//
//        stage.addChild(container);
//        stage.update();
//
//        var imagenes = [org + 'img/construcciones/base.png'];
//        loadImagenes(imagenes, function() {
//            stage.update();
//        });
//        return canvas;
//
//    },
//    reg: function(img, castillo) {
//        castillo.regX = img.width / 2;
//        castillo.regY = img.height / 2;
//
//    },
//    camino: function() {
//        var recorrido = new createjs.Container();
//        var tira = new Image();
//        tira.src = 'img/canvas/mapa/camino.png';
//
//        var x = 0;
//        var y = 0;
//        var escala = 5;
//        var giro = 0;
//
//        var finX = 500;
//        var finY = 500;
//
//        for (var i = 0; i < 10000; i++) {
//
//            var camino = new createjs.Bitmap(tira);
//            camino.regY = 5;
//            var degree = giro * (Math.PI / 180);
//            x = camino.x = x + 1 * Math.cos(degree);
//            y = camino.y = y + 1 * Math.sin(degree);
//            camino.rotation = giro;
//            camino.scaleX = 3;
//            camino.scaleY = escala;
//            recorrido.addChild(camino);
//
//            var nom = Math.abs((finX - 0) * (x - 0) + (finY - 0) * (y - 0));
//            var den = Math.sqrt(Math.pow(finX, 2) + Math.pow(x - 0, 2)) * Math.sqrt(Math.pow(finY - 0, 2) + Math.pow(y - 0, 2));
//            var ang = nom / den;
//
//            var g = Math.random() * 2;
//            if (g < 1) {
//                if (Math.cos(ang) < 90) {
//                    giro = giro + 5;
//                }
//            } else {
//                if (Math.cos(ang) > -90) {
//                    giro = giro - 5;
//                }
//            }
//            var k = Math.random() * 2;
//            if (k < 1) {
//                if (escala < 10) {
//                    escala = escala * 1.05;
//                }
//            } else {
//                if (escala > 3) {
//                    escala = escala / 1.05;
//                }
//            }
//
//        }
//        return recorrido;
//
//    },
//    camino2: function() {
//
//        return "";
//
//        var capas = [];
//        capas[0] = {name: "marron", color: "rgba(250,200,150,0.4)", width: 20, range: 1.15};
//        capas[1] = {name: "negro", color: "rgba(80,40,0,0.6)", width: 20, range: 3};
//
//        var recorrido = new createjs.Container();
//        var giro = 0;
//        var x = 500;
//        var y = 500;
//
//        for (var r = 0; r < 2000; r++) {
//            for (var c = 0; c < capas.length; c++) {
//                var puntos = [];
//
//                for (var i = 0; i < 8; i++) {
//                    puntos[i] = new createjs.Shape();
//                    puntos[i].graphics.beginStroke(capas[c].color).dc(0, 0, 0.1);
//                    puntos[i].name = capas[c].name;
//                    recorrido.addChildAt(puntos[i], c);
//                }
//
//                puntos[0].x = x + 1, puntos[0].y = y + 1;
//                puntos[1].x = x + 1, puntos[1].y = y;
//                puntos[2].x = x + 1, puntos[2].y = y - 1;
//                puntos[3].x = x, puntos[3].y = y - 1;
//                puntos[4].x = x - 1, puntos[4].y = y - 1;
//                puntos[5].x = x - 1, puntos[5].y = y;
//                puntos[6].x = x - 1, puntos[6].y = y + 1;
//                puntos[7].x = x, puntos[7].y = y + 1;
//
//                for (var i = 0; i < recorrido.children.length; i++) {
//                    var child = recorrido.children[i];
//                    if (child.name == capas[c].name) {
//                        if ((Math.abs(child.x - x) + Math.abs(child.y - y)) < capas[c].width) {
//                            var rand = Math.random() * capas[c].range;
//                            var den = Math.abs(child.x - x) + Math.abs(child.y - y);
//                            var varX = (child.x - x) / den;
//                            child.x = child.x + (varX * rand);
//                            var varY = (child.y - y) / den;
//                            child.y = child.y + (varY * rand);
//                        }
//                    }
//                }
//
//                var g = Math.random() * 2;
//                if (g < 1) {
//                    giro = giro + 5;
//                } else {
//                    giro = giro - 5;
//                }
//
//                var degree = giro * (Math.PI / 180);
//                x = camino.x = x + 1 * Math.cos(degree);
//                y = camino.y = y + 1 * Math.sin(degree);
//            }
//        }
//        return recorrido;
//
//    },
//    mouseover: function(castillo, user) {
//        var ths = this;
//
//        var nw;
//        castillo.addEventListener("mouseover", function() {
//            nw = true;
//            if (castillo.select === true) {
//                $("body").css("cursor", "pointer");
//            }
//
//            $("#nombreGrupo").text(user.nombreId);
//            $("#nivelGrupo").text(user.edificioBase);
//            $("#posicionGrupo").text(user.posicion);
//
//            $(document).mousemove(function(e) {
//                if (e.toElement.parentNode.id === 'mapaCanvasInner') {
//                    $("#mapaOver").css("margin-left", e.pageX - $("body").css("margin-left").split("px")[0] + 10 + "px");
//                    $("#mapaOver").css("margin-top", e.pageY - $("header").height() + 10 + "px");
//                    if (nw === true) {
//                        $("#mapaOver").css("display", "inherit");
//                        nw = false;
//                    }
//                }
//            });
//        });
//        castillo.addEventListener("mouseout", function() {
//            $("body").css("cursor", "auto");
//            $("#mapaOver").css("display", "none");
//            $(document).unbind('mousemove');
//        });
//
//        castillo.addEventListener("mousedown", function(e) {
//            $("body").css("cursor", "pointer");
//            ths.select(castillo);
//        });
//
//        castillo.onDoubleClick = function() {
//            mapaJs.contacto(castillo.id);
//        };
//
//    },
//    select: function(castillo) {
//        if (castillo.select === true) {
//            mapaJs.contacto(castillo.id);
//            
//        } else {
//            var castle = castillo.getChildByName("castle");
//            var redFilter = new createjs.ColorFilter(1, 0.7, 0.7, 1);
//            var castles = this.castles;
//            for (var i = 0; i < castles.length; i++) {
//                castles[i].parent.select = false;
//                castles[i].filters = [];
//                castles[i].cache(0, 0, castles[i].image.width, castles[i].image.height);
//            }
//            castillo.select = true;
//            castle.filters = [redFilter];
//            castle.cache(0, 0, castle.image.width, castle.image.height);
//            this.stage.update();
//        }
//
//    },
//    disable: function() {
//        if (this.stage !== "") {
//            this.stage.enableMouseOver(0);
//            for (var i = 0; i < this.castles.length; i++) {
//                this.castles[i].mouseEnabled = false;
//            }
//        }
//    }
//
//};