<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ideas</title>
        <link rel="stylesheet" href="{{asset('css/style.css')}}">
        <script src="js/ajax.js"></script>
        <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    </head>
    <body>
        <p style="text-align: center; margin-bottom: 5%;" id="mensaje">
        </p>
    <div>
        <form method="POST" onsubmit="crear(); return false;">
        @csrf
        <label for="title">Título</label><br>
        <input type="text" id="title" name="title" placeholder="Título.."><br>

        <label for="description">Descripción</label><br>
        <input type="text" id="description" name="description" placeholder="Descripcion.."><br>
  
        <input type="submit" value="Crear" name="enviar">
        </form>
    </div>
    <table id="customers">

    </table>

    <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close" onclick="closeModal();">&times;</span>
                        <form method="POST" onsubmit="editar(); return false;">
                        <label for="title">Título</label><br>
                        <input type="text" id="title_m" name="title" placeholder="Título.."><br>
                        <label for="description">Descripción</label><br>
                        <input type="text" id="description_m" name="description" placeholder="Descripcion.."><br>
                        <input type="hidden" name="id" id="id">
                        <input type="submit" value="Modificar" name="enviar">
                        </form>
                    </div>
                </div>
</body>
</html>
