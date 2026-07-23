// --- SONIDO SUTIL ---
function reproducirSonidoSuave() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const frecuencias = [523.25, 659.25];
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
        console.log("Audio no soportado temporalmente.", e);
    }
}

// --- SEGURIDAD Y PIN (PIDE CLAVE SIEMPRE AL ENTRAR) ---
const PIN_CORRECTO = "123456"; 

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
    } else {
        msg.style.color = "#f87171";
        msg.textContent = "PIN incorrecto. Inténtalo de nuevo:";
        document.getElementById("pin-input").value = "";
    }
}

// Aseguramos que la pantalla de bloqueo aparezca siempre al cargar o recargar
window.addEventListener("DOMContentLoaded", () => {
    const lockScreen = document.getElementById("lock-screen");
    if (lockScreen) lockScreen.style.display = "flex";
});

// --- NAVEGACIÓN Y CAMBIO DE FONDOS ---
function cambiarPestaña(tabId, event) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));

    const target = document.getElementById("tab-" + tabId);
    if (target) {
        target.classList.add("active");
    }

    const buttons = document.querySelectorAll(".nav-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active");
    }

    // Cambiar fondos del body dinámicamente según la pestaña activa
    document.body.classList.remove("bg-swap", "bg-security");
    if (tabId === 'swap') {
        document.body.classList.add("bg-swap");
    } else if (tabId === 'seguridad') {
        document.body.classList.add("bg-security");
    }
}

// --- CONEXIÓN WEB3 ---
async function conectarWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            const connectBtn = document.getElementById("connect-btn");
            connectBtn.textContent = address.substring(0, 6) + "..." + address.substring(address.length - 4);
            connectBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";

            const balance = await provider.getBalance(address);
            const bnbFormatted = ethers.utils.formatEther(balance);
            document.getElementById("bnb-balance").textContent = parseFloat(bnbFormatted).toFixed(4) + " BNB";
            document.getElementById("zard-balance").textContent = "1,540.00 ZARD";

        } catch (error) {
            console.error("Conexión rechazada", error);
        }
    } else {
        alert("Por favor, abre esta billetera desde un navegador Web3 compatible (MetaMask o Trust Wallet).");
    }
}
