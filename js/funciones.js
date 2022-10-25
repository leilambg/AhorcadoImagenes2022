function SeleccionImagenes(evt) {
    //   alert("eVENTO")
    var files = evt.target.files; // FileList object
     // alert(files.length)
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    var columnas = 0;
    for (var i = 0, f; f = files[i]; i++) {


        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Function(Clousure) que obtiene la información de cada archivo. la funcion 
        // se ejecuta al cargar (load) cada unop de los archivos seleccionadso

        reader.onload = (function (ElFichero) {
            return function (e) {
                         
                let cadena = escape(ElFichero.name);
                let ppunto = cadena.indexOf(".");
                let nimagen = cadena.substring(0, ppunto)
                //  alert(nimagen)
 
                let imm = document.createElement("img");
                //alert(e.target.result)
                imm.src = e.target.result;// LA IMAGEN EN FORMATO BASE64
                imm.alt = ElFichero.name;//escape(ElFichero.name);
                imm.title = nimagen;
                imm.onclick = copiaPalabra;
                document.getElementById('contenedor').insertBefore(imm, null);
               
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', SeleccionImagenes, false);

let palabra; let guiones;
function copiaPalabra(){
    guiones = this.title;
    palabra=this.title;
    guiones = guiones.replace(/[a-z]/gi, "-");
    Aciertos.value = guiones;
}

caracter.addEventListener("keyup", buscaCaracter, false);

function buscaCaracter()
    {
        if (caracter.value == "") {
            return
        }
        ;
        var carcaterbuscar = caracter.value.toUpperCase();
        var palabraA = palabra.toUpperCase();

        var posicion = palabraA.indexOf(carcaterbuscar);
        var es_acierto = false;
        while (posicion > -1) {

            guiones = guiones.substring(0, posicion) + carcaterbuscar + guiones.substr(posicion + 1, guiones.length);

            Aciertos.value = guiones;

            posicion = palabraA.indexOf(carcaterbuscar, posicion + 1);
            es_acierto = true;
        }
        if (!es_acierto) {
            fallos.innerHTML = fallos.innerHTML + carcaterbuscar;
        }
        caracter.value = "";

    }