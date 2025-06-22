function reconocerVoz() {
  const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  reconocimiento.lang = 'es-CO';
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;

  reconocimiento.start();

  reconocimiento.onresult = function(event) {
    const resultadoTexto = event.results[0][0].transcript;
    const numero = parseInt(resultadoTexto);

    if (!isNaN(numero)) {
      document.getElementById("equipo").value = numero;
      obtenerEquipo(numero);
    } else {
      reproducirAudio("invalido");
    }
  }

  reconocimiento.onerror = function(event) {
    console.error("Error de Reconocimiento", event.error);
    reproducirAudio("invalido");
  }
}

function obtenerEquipo(equipo) {
  const resultado = document.getElementById("resultado");

  if (isNaN(equipo)) {
    resultado.value = "Valor no válido";
    return;
  }

  const zonas = {
    "ZONA 100": [8, 19, 37, 39, 40, 58, 59, 72, 71, 115, 128, 130, 155, 194, 214, 215, 217, 106],
    "ZONA 200": [1, 13, 16, 22, 41, 42, 57, 73, 123, 129, 148, 188, 327, 177, 146],
    "ZONA 300": [2, 6, 7, 9, 25, 30, 31, 33, 35, 50, 64, 66, 70, 74, 48, 98, 105, 127, 144, 159, 193, 197, 65, 210]
  };

  for (let zona in zonas) {
    if (zonas[zona].includes(equipo)) {
      reproducirAudio(zona);
      return;
    }
  }

  reproducirAudio("invalido");
}

function reproducirAudio(nombre) {
  let audio = new Audio(`audios/${nombre}.mp3`);
  audio.play();
}
