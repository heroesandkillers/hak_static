
//disable map:
//documentLoad();

var equipoJs = {
    equipo: global.equipo,
    canvas: document.createElement('canvas'),
    stage: {},
//    visual: function () {
//        if ($("#detalleCriatura").width() > 1000) {
//            $("#graficoCriatInner").css("display", "table-cell");
//        }
//    },
    iniciarCanvas: function () {
        var ths = this;
        ths.canvas.width = 100;
        ths.canvas.height = 150;
        if (window.isMobile) {
            ths.canvas.width = 90;
            ths.canvas.height = 135;
        }
        $("#aspectoDiv").append(ths.canvas);
        $(ths.canvas).attr("id", "aspecto");
        ths.stage = new createjs.Stage(ths.canvas);
    }
    ,
    mostrarEquipo: function () {
        var equipo = this.equipo;
        $("#numCriaturas").html(" (" + equipo.length + " <small>/20</small>)");
        var table = $("#tableEquipo tbody");
        table.html("");
        var cell;
        var max = {fu: 0, ma: 0, ag: 0, rf: 0, co: 0, df: 0, rc: 0, xp: 0, media: 0};
        var min = {fu: 100, ma: 100, ag: 100, rf: 100, co: 100, df: 100, rc: 100, xp: 100, media: 100};

        for (var i = 0; i < equipo.length; i++) {


            var media = 0;
            var evo;
            try {
                evo = JSON.parse(equipo[i].evolucion);
            } catch (e) {
                console.log(e);
                return;
            }
            var criat = evo[evo.length - 1];
            var atributos = ["fu", "ma", "ag", "rf", "co", "df", "rc"];

            //valores máximos
            for (var j = 0; j < atributos.length; j++) {
                media = media + evo[evo.length - 1][atributos[j]];
                if (criat[atributos[j]] > max[atributos[j]]) {
                    max[atributos[j]] = criat[atributos[j]];
                }
                if (criat[atributos[j]] < min[atributos[j]]) {
                    min[atributos[j]] = criat[atributos[j]];
                }
            }
            media = getMedia(media);
            if (media > max["media"]) {
                max["media"] = media;
            }
            if (media < min["media"]) {
                min["media"] = media;
            }
        }

        //criaturas
        var mediaDif = max["media"] - min["media"];
        for (var i = 0; i < equipo.length; i++) {

            var evo;
            try {
                evo = JSON.parse(equipo[i].evolucion);
            } catch (e) {
                console.log(e);
                return;
            }

            var criat = evo[evo.length - 1];
            var row = $("<tr>");
            table.append(row);

            $(row).attr("id", equipo[i].id);
            $(row).attr("i", i);
            $(row).attr("class", "UnHighLight");
            if (!window.isMobile) {
                $(row).attr("onMouseOver", "if(window.HighLight){HighLight(this)}");
                $(row).attr("onMouseOut", "if(window.UnHighLight){UnHighLight(this)}");
                $(row).attr("ondblclick", "detalles()");
            }
            $(row).attr("onclick", 'Select(this), equipoJs.detalle(' + i + ')');

            cell = $("<td>");
            $(row).append(cell);
            var nombre = getApodo(equipo[i]);
            cell.html("<div class='nombre'>" + nombre + "<div>");

            $(row).append(cell = $("<td>"));
            setRazaImg(cell, equipo[i].raza);
            $(row).append(cell = $("<td>"));
            setClaseImg(cell, equipo[i].clases);
            $(row).append(cell = $("<td>"));
            setElemImg(cell, equipo[i].elemento);
            $(row).append(cell = $("<td>"));
            setMutaImg(cell, equipo[i].mutacion);

            var cellMedia = $("<td>");
            var divMedia = $("<div>");
            $(row).append(cellMedia);
            cellMedia.append(divMedia);
            $(cellMedia).css("font-weight", "bold");
            var atributos = ["fu", "ma", "ag", "rf", "co", "df", "rc"];
            var sum = 0, mediaOld = 0;

            for (var j = 0; j < atributos.length; j++) {
                if (!window.isMobile) {
                    var atributo = atributos[j];
                    var div = $("<div>");
                    cell = $("<td>");
                    cell.append(div);
                    $(row).append(cell);
                    var atr = criat[atributo];
                    var old = evo[evo.length - 2][atributo];
                    this.setDif(div, atr, old);
                }

                //calc media
                var color = Math.round((criat[atributos[j]] - min[atributos[j]]) / (max[atributos[j]] - min[atributos[j]]) * 80) + 175;
                $(cell).css("color", "rgba(" + color + "," + color + "," + color + ",1)");
                sum = sum + evo[evo.length - 1][atributos[j]];
                mediaOld = mediaOld + evo[evo.length - 2][atributos[j]];
            }

            media = getMedia(sum);
            mediaOld = getMedia(mediaOld);
            this.setDif(divMedia, media, mediaOld);

            var color1 = Math.round((media - min.media) / mediaDif * 100) + 155;
            var color2 = Math.round((media - min.media) / mediaDif * 100) + 100;
            $(cellMedia).css("color", "rgba(" + color1 + "," + color2 + ",0,1)");

            var nivelCell = $("<td>");
            var nivelDiv = $("<div>");
            nivelCell.append(nivelDiv);
            $(row).append(nivelCell);
            setNivel(nivelDiv, evo[evo.length - 1]["xp"], evo[evo.length - 2]["xp"]);

            var edadCell = $("<td>");
            var edadDiv = $("<div>");
            edadCell.append(edadDiv);
            $(row).append(edadCell);
            edadDiv.html(getEdad(equipo[i].edad));

        }
        reloadTablas();
        //helpers();
    }
    ,
    setDif: function (cell, atr, old) {
        cell.html("<norm>" + atr + "</norm>");
        if (old > -1) {
            var dif = parseInt(atr - old);
            if (dif > 0) {
                $(cell).append("<dif> +" + dif + "</dif>");
            }
        }
    }
    ,
    detalle: function (i) {
        global.criatura = this.equipo[i];
        detalleCriatura(global.criatura, this.stage, "#paginaEquipo");
        if (window.isMobile) {
            $(".none").removeClass("none");
            //$("#detalleCriatura > div").removeClass("none");
            $("#" + global.criatura.id).append($("#detalleCriatura"));
            $("#" + global.criatura.id + " > td").addClass("none");
        }
    }
    ,
    botonVender: function () {
        var i = $("#tableEquipo .selected").attr("i");
        var criat = this.equipo[i];

        this.precioVenta = numero(criat.precio);
        $("#precioVenta").text(this.precioVenta);
        $('#divVender').dialog({
            resizable: false,
            closeOnEscape: false,
            height: 150,
            width: 300,
            title: criat.nombre,
            modal: true,
            draggable: true,
            close: function () {
                $(this).dialog("destroy");
            }
        });
    }
    ,
    vender: function (elem) {
        var ths = this;
        var id = global.criatura.id;

        $(elem).closest(".dialog").dialog('close');
        if (this.equipo.length === 1) {
            aviso('no puedes quedarte sin criaturas!');
            return;
        }
        $.ajax({
            type: "GET",
            url: "vender",
            data: {
                id: id
            },
            success: function (response) {
                if (response === "") {
                    global.perfil.oro -= ths.precioVenta;
                    cargarPerfil();

                    var index = getIndexById(id, global.equipo);
                    global.equipo.splice(index, 1);
                    ths.mostrarEquipo();

                    confirmacion("criatura vendida");
                } else {
                    error(response);
                }
            }
        });
    }
    ,
    events: function () {
        var ths = this;
        $("#apodoDetalles").focus(function () {
            if ($("#apodoDetalles").hasClass("sinApodo")) {
                $("#apodoDetalles").text("");
            } else {
                $("#apodoDetalles").text($("#apodoDetalles").text());
            }
        });
        $("#apodoDetalles").blur(function () {
            var i = $("#tableEquipo .selected").attr("i");
            var criat = ths.equipo[i];
            if (!window.apodo || $("#apodoDetalles").text() !== criat.apodo) {
                $.ajax({
                    type: "GET",
                    url: "asignarApodo",
                    data: {
                        id: criat.id,
                        apodo: $("#apodoDetalles").text()
                    }
                });
            }
            criat.apodo = $("#apodoDetalles").text();
            if ($("#apodoDetalles").text() !== "") {
                $("#equipo_" + ths.i).find(".nombre").html("<b>" + $("#apodoDetalles").text() + "</b> (" + criat.nombre + ")");
            } else {
                $("#equipo_" + ths.i).find(".nombre").text(criat.nombre);
            }
        });

        $('#botonFinalVender').keydown(function (e) {
            if (e.keyCode === 13) {
                return false;
            }
        });
    }
};

equipoJs.mostrarEquipo();
equipoJs.events();
//equipoJs.visual();
equipoJs.iniciarCanvas();

//permitir ordenar tabla

ordenarTablas();
