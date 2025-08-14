document.addEventListener("DOMContentLoaded", () => {
  // === CONFIGURACIÓN ===
  const fechaBoda = new Date("August 16, 2025 14:30:00").getTime(); // Fecha y hora de la boda

  // === CONTADOR REGRESIVO ===
  const countdownEl = document.getElementById("countdown");
  function actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    if (distancia <= 0) {
      countdownEl.innerHTML = `
        <div class="contador-item"><span>0</span><small>Días</small></div>
        <div class="contador-item"><span>0</span><small>Horas</small></div>
        <div class="contador-item"><span>0</span><small>Minutos</small></div>
        <div class="contador-item"><span>0</span><small>Segundos</small></div>
      `;
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
        <div class="contador-item"><span>${dias}</span><small>Días</small></div>
        <div class="contador-item"><span>${horas}</span><small>Horas</small></div>
        <div class="contador-item"><span>${minutos}</span><small>Minutos</small></div>
        <div class="contador-item"><span>${segundos}</span><small>Segundos</small></div>
      `;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

  // === REPRODUCCIÓN DE MÚSICA Y OVERLAY ===
  const audio = document.getElementById("musicaFondo");
  const playerBtn = document.getElementById("playerBtn");
  const playerLabel = document.getElementById("playerLabel");
  const overlay = document.getElementById("overlayEntrada");
  const btnEntrar = document.getElementById("btnEntrar");
  const body = document.body;

  function setPlayerState(sonando) {
    playerLabel.textContent = sonando ? "Sonando…" : "Silencio";
    playerBtn.querySelector("i").className = sonando ? "fa-solid fa-music" : "fa-solid fa-pause";
    playerBtn.setAttribute("aria-pressed", sonando ? "true" : "false");
  }

  // Nueva función para manejar la entrada y la reproducción de música
  function handleEntry() {
    // Elimina la clase para permitir el scroll
    body.classList.remove('no-scroll');
    // Oculta el overlay
    overlay.classList.add("oculto");
    setTimeout(() => (overlay.style.display = "none"), 550);

    // Intenta reproducir el audio
    audio
      .play()
      .then(() => {
        setPlayerState(true);
      })
      .catch((e) => {
        console.log("No se pudo reproducir el audio: " + e);
        setPlayerState(false);
      });
  }

  // Al cargar la página, añade la clase para deshabilitar el scroll
  body.classList.add('no-scroll');
  btnEntrar.addEventListener("click", handleEntry);

  // Botón flotante Play/Pause
  playerBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => setPlayerState(true));
    } else {
      audio.pause();
      setPlayerState(false);
    }
  });

  // Reproducir/pausar con la visibilidad de la página
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      // Reanudar si la página vuelve a estar visible
      audio.play().catch((e) => console.log("No se pudo reanudar la música."));
    } else {
      // Pausar si la página se oculta
      audio.pause();
    }
  });

  // === CARRUSEL DE FOTOS ===
  const carrusel = document.querySelector(".carrusel-fotos");
  const prevBtn = document.querySelector(".carrusel-btn.prev");
  const nextBtn = document.querySelector(".carrusel-btn.next");
  let currentIndex = 0;

  if (carrusel && prevBtn && nextBtn) {
    // Calcula el número de fotos reales, asumiendo que no están duplicadas en el HTML
    const totalItems = carrusel.querySelectorAll('img').length;
    
    // Función para actualizar la posición del carrusel
    const updateCarrusel = () => {
      const itemWidth = carrusel.querySelector('img').offsetWidth;
      carrusel.scrollTo({
        left: itemWidth * currentIndex,
        behavior: "smooth"
      });
    };

    // Lógica para el botón Siguiente
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarrusel();
    });

    // Lógica para el botón Anterior
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarrusel();
    });
  }
});