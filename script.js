document.addEventListener("DOMContentLoaded", () => {
    const fechaBoda = new Date("August 16, 2025 14:30:00").getTime(); 

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

    function handleEntry() {
        body.classList.remove('no-scroll');
        overlay.classList.add("oculto");
        setTimeout(() => (overlay.style.display = "none"), 550);

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

    body.classList.add('no-scroll');
    btnEntrar.addEventListener("click", handleEntry);

    playerBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => setPlayerState(true));
        } else {
            audio.pause();
            setPlayerState(false);
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            audio.play().catch((e) => console.log("No se pudo reanudar la música."));
        } else {
            audio.pause();
        }
    });
});