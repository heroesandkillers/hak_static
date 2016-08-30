
function detalles() {

    var criatura = global.criatura;

    if ($("#detalles_" + criatura.id).length === 0) {

        var table, row, cell;
        var dialog = document.createElement('div');
        $(dialog).attr('id', "detalles_" + criatura.id);
        $(dialog).attr('class', "dialog");
        $(dialog).css("display: none");

        var tableDialog = document.createElement('table');
        var row0 = tableDialog.insertRow(0);
        var cell0 = row0.insertCell(0);
        $(cell0).attr('class', "dialogSuperior aspecto alturaCanvas");
        var cell1 = row0.insertCell(1);
        cell1.setAttribute('class', "dialogSuperior");

        if (typeof criatura.evolucion !== 'undefined') {
            var evo = JSON.parse(criatura.evolucion);
            var atrs = evo[evo.length - 1];
            table = document.createElement('table');
            table.setAttribute('class', "tablaIn");
            row = table.insertRow(0);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'fuerza';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["fu"]);
            row = table.insertRow(1);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'magia';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["ma"]);
            row = table.insertRow(2);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'agilidad';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["ag"]);
            row = table.insertRow(3);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'reflejos';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["rf"]);
            row = table.insertRow(4);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'constitucion';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["co"]);
            row = table.insertRow(5);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'defensa';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["df"]);
            row = table.insertRow(6);
            row.setAttribute("class", "UnHighLight");
            cell = row.insertCell(0);
            cell.innerHTML = 'reacción';
            cell = row.insertCell(1);
            cell.innerHTML = atributo(atrs["rc"]);
            cell1.appendChild(table);
        }

        var row1 = tableDialog.insertRow(1);
        var cell2 = row1.insertCell(0);
        cell2.setAttribute('class', "dialogInferior");
        table = document.createElement('table');
        table.setAttribute('class', "tablaIn");
        row = table.insertRow(0);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'país origen';
        cell = row.insertCell(1);
        cell.innerHTML = 'España';
        row = table.insertRow(1);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'raza';
        cell = row.insertCell(1);
        cell.innerHTML = criatura.raza;
        row = table.insertRow(2);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'clase';
        cell = row.insertCell(1);
        cell.innerHTML = getClaseName(criatura.clases);
        row = table.insertRow(3);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'elemento';
        cell = row.insertCell(1);
        if(!criatura.elemento){
            criatura.elemento = "";
        }
        cell.innerHTML = criatura.elemento;
        row = table.insertRow(4);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'mutación';
        cell = row.insertCell(1);
        if(!criatura.mutacion){
            criatura.mutacion = "";
        }
        cell.innerHTML = criatura.mutacion;
        row = table.insertRow(5);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'media';
        cell = row.insertCell(1);
        cell.innerHTML = getMedia(criatura.media);
        var precio = '-';
        if (criatura.usuarioId === global.perfil.id) { //==
            precio = getPrecio(criatura.pujas);
        }

        row = table.insertRow(6);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'valor';
        cell = row.insertCell(1);
        cell.innerHTML = numero(precio + "");
        cell2.appendChild(table);
        var cell3 = row1.insertCell(1);
        cell3.setAttribute('class', "dialogInferior");
        table = document.createElement('table');
        table.setAttribute('class', "tablaIn");
        row = table.insertRow(0);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell = row.insertCell(1);
        cell.innerHTML = 'temp.';
        cell = row.insertCell(2);
        cell.innerHTML = 'total';
        row = table.insertRow(1);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'batallas';
        cell = row.insertCell(1);
        cell.innerHTML = criatura.batallas;
        cell = row.insertCell(2);
        cell.innerHTML = criatura.batallas;
        row = table.insertRow(2);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'bajas';
        cell = row.insertCell(1);
        cell.innerHTML = criatura.bajas;
        cell = row.insertCell(2);
        cell.innerHTML = criatura.bajas;
        row = table.insertRow(3);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'muertes';
        cell = row.insertCell(1);
        cell.innerHTML = criatura.muertes;
        cell = row.insertCell(2);
        cell.innerHTML = criatura.muertes;
        row = table.insertRow(4);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.innerHTML = 'ratio';
        cell = row.insertCell(1);
        cell.innerHTML = getRatio(criatura.bajas, criatura.muertes);
        cell = row.insertCell(2);
        cell.innerHTML = getRatio(criatura.bajas, criatura.muertes);
        row = table.insertRow(5);
        row.setAttribute("class", "UnHighLight");
        cell = row.insertCell(0);
        cell.setAttribute('colspan', 3);
        cell.innerHTML = "<button style='float:right' onclick='contacto(" + criatura.usuarioId + ")'>Equipo</button>";
        cell3.appendChild(table);
        dialog.appendChild(tableDialog);
        document.body.appendChild(dialog);
        popDetalles(criatura);
    }

    $(".tablaIn td:nth-child(2)").addClass("value");
    $(".tablaIn td:nth-child(3)").addClass("value");

}