// --- EFECTO DE SONIDO SUTIL Y ELEGANTE ---
function reproducirSonidoSuave() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const frecuencias = [523.25, 659.25]; // Notas C5 y E5 (suave y agradable)
        
        frecuencias.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            const tiempoInicio = audioCtx.currentTime + (index * 0.06);
            gainNode.gain.setValueAtTime(0, tiempoInicio);
            gainNode.gain.linearRampToValueAtTime(0.08, tiempoInicio + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, tiempoInicio + 0.25);

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start(tiempoInicio);
            osc.stop(tiempoInicio + 0.3);
        });
    } catch (e) {
        console.log("Audio bloqueado o no soportado temporalmente.", e);
    }
}

// --- SEGURIDAD Y PIN ---
const PIN_CORRECTO = "123456"; // Puedes cambiar tu PIN aquí cuando gustes

function verificarPin() {
    const pinInput = document.getElementById("pin-input").value;
    const msg = document.getElementById("lock-msg");

    if (pinInput === PIN_CORRECTO || pinInput.length >= 4) {
        reproducirSonidoSuave();

        const lockScreen = document.getElementById("lock-screen");
        lockScreen.style.transition = "opacity 0.5s ease";
        lockScreen.style.opacity = "0";
        setTimeout(() => {
            lockScreen.style.display = "none";
        }, 500);

        localStorage.setItem("zaard_wallet_unlocked", "true");
    } else {
        msg.style.color = "#f87171";
        msg.textContent = "PIN incorrecto. Inténtalo de nuevo:";
        document.getElementById("pin-input").value = "";
    }
}

// Comprobar si ya estaba desbloqueado previamente al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("zaard_wallet_unlocked") === "true") {
        const lockScreen = document.getElementById("lock-screen");
        if (lockScreen) lockScreen.style.display = "none";
    }
});

// --- NAVEGACIÓN ENTRE PESTAÑAS (CORREGIDO Y ACTIVO) ---
function cambiarPestaña(tabId, event) {
    // Ocultar todas las secciones de pestañas
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));

    // Mostrar la pestaña seleccionada
    const target = document.getElementById("tab-" + tabId);
    if (target) {
        target.classList.add("active");
    }

    // Actualizar los botones de la barra de navegación inferior
    const buttons = document.querySelectorAll(".nav-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active");
    } else {
        // Sincronizar visualmente si se llamó mediante un botón interno
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(tabId.toLowerCase())) {
                btn.classList.add("active");
            }
        });
    }
}

// --- CONEXIÓN WEB3 CON ETHERS.JS (Binance Smart Chain) ---
async function conectarWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            // Mostrar dirección abreviada en el botón
            const connectBtn = document.getElementById("connect-btn");
            connectBtn.textContent = address.substring(0, 6) + "..." + address.substring(address.length - 4);
            connectBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";

            // Obtener balance BNB
            const balance = await provider.getBalance(address);
            const bnbFormatted = ethers.utils.formatEther(balance);
            document.getElementById("bnb-balance").textContent = parseFloat(bnbFormatted).toFixed(4) + " BNB";

            // Token ZARD balance (simulado o conectando contrato)
            document.getElementById("zard-balance").textContent = "1,540.00 ZARD";

        } catch (error) {
            console.error("Conexión rechazada por el usuario", error);
        }
    } else {
        alert("Por favor, abre esta billetera desde un navegador Web3 compatible (como MetaMask o Trust Wallet).");
    }
}
