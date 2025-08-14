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
    const horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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

  function setPlayerState(sonando) {
    playerLabel.textContent = sonando ? "Sonando…" : "Silencio";
    playerBtn.querySelector("i").className = sonando
      ? "fa-solid fa-music"
      : "fa-solid fa-pause";
    playerBtn.setAttribute("aria-pressed", sonando ? "true" : "false");
  }

  // Nueva función para manejar la entrada y la reproducción de música
  function handleEntry() {
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

  // Evento para el botón de entrada del overlay
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

if (carrusel && prevBtn && nextBtn) {
    let scrollPosition = 0;
    const scrollWidth = carrusel.scrollWidth;
    const itemWidth = carrusel.querySelector('img').offsetWidth;

    nextBtn.addEventListener("click", () => {
        scrollPosition += itemWidth;
        if (scrollPosition >= scrollWidth) {
            scrollPosition = 0;
        }
        carrusel.scrollTo({
            left: scrollPosition,
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        scrollPosition -= itemWidth;
        if (scrollPosition < 0) {
            scrollPosition = scrollWidth - itemWidth;
        }
        carrusel.scrollTo({
            left: scrollPosition,
            behavior: "smooth"
        });
    });
}

});
