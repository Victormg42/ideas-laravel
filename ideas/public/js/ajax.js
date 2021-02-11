window.onload = function() {
    modal = document.getElementById('myModal');
    read();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/* Muestra todos los registros de la base de datos (sin filtrar y filtrados) */
function read() {
    var section = document.getElementById('customers');
    var token = document.getElementById('token').getAttribute('content');
    var ajax = new objetoAjax();
    ajax.open('GET', 'read', true);
    var datasend = new FormData();
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            var tabla = '';
            tabla += '<thead>';
            tabla += '<tr>';
            tabla += '<th>Título</th>';
            tabla += '<th>Descripción</th>';
            tabla += '<th>Opciones</th>';
            tabla += '</tr>';
            tabla += '</thead>';
            for (let i = 0; i < respuesta.length; i++) {
                //const element = array[index];
                tabla += '<tbody>';
                tabla += '<tr>';
                tabla += '<td>' + respuesta[i].Title + '</td>';
                tabla += '<td>' + respuesta[i].Description + '</td>';
                tabla += '<td><button style="float: left; margin-right: 10px;" onclick="openModal(' + respuesta[i].id + ',&#039;' + respuesta[i].Title + '&#039;,&#039;' + respuesta[i].Description + '&#039;)">Editar</button>';
                tabla += '<button onclick="borrar(' + respuesta[i].id + ')">Borrar</button>';
                tabla += '</td>';
                tabla += '</tr>';
                tabla += '</tbody>';
            }
            section.innerHTML = tabla;
        }
    }
    ajax.send(datasend);
}

function crear() {
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var mensaje = document.getElementById('mensaje');
    ajax.open('POST', 'crear', true);
    var datasend = new FormData();
    datasend.append('title', title);
    datasend.append('description', description);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Nota agregada correctamente';
            } else {
                mensaje.innerHTML = 'Error al agregar nueva nota';
            }
            read();
        }
    }
    ajax.send(datasend);
}

function borrar(id) {
    var ajax = new objetoAjax();
    var mensaje = document.getElementById('mensaje');
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'borrar', true);
    var datasend = new FormData();
    datasend.append('id', id);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Nota eliminada correctamente';
            } else {
                mensaje.innerHTML = 'Error al eliminar la nota';
            }
            read();
        }
    }
    ajax.send(datasend);
}

function editar() {
    var ajax = new objetoAjax();
    var id = document.getElementById('id').value;
    var title = document.getElementById('title_m').value;
    var description = document.getElementById('description_m').value;
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('mensaje');
    ajax.open('POST', 'editar', true);
    var datasend = new FormData();
    datasend.append('id', id);
    datasend.append('title', title);
    datasend.append('description', description);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Nota actualizada correctamente';
            } else {
                mensaje.innerHTML = 'Error al actualizar la nota';
            }
            closeModal();
            read();
        }
    }
    ajax.send(datasend);
}

function openModal(id, title, desc) {
    modal.style.display = "block";
    document.getElementById('id').value = id;
    document.getElementById('title_m').value = title;
    document.getElementById('description_m').value = desc;
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}