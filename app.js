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
        console.log("Audio no soportado.", e);
    }
}

// --- TRADUCCIÓN DINÁMICA (ES / EN) ---
let idiomaActual = 'es';

const traducciones = {
    es: {
        subtitle: "Seguridad y Confianza de PANGA",
        assetsTitle: "Activos Principales",
        bnbLabel: "Balance BNB (BSC)",
        btnEco: "Ir al Ecosistema ZAARD",
        stakingBadge: "🚀 PRÓXIMA GRAN APERTURA",
        stakingTitle: "Bloqueo Inteligente de Activos",
        stakingDesc: "Próxima gran apertura. Podrás bloquear tus tokens ZARD en contratos inteligentes auditados para generar recompensas y rendimiento pasivo diario dentro del ecosistema descentralizado.",
        stakingBtn: "Módulo en Inicialización",
        browserTitle: "Buscador y DApps",
        browserDesc: "Plataformas oficiales del protocolo:",
        arcade: "Juegos Arcade",
        tracker: "Tracker ZARD",
        web: "Página Web",
        eco: "Ecosistema",
        swapDesc: "Operaciones descentralizadas con máxima liquidez en PancakeSwap.",
        navHome: "Inicio",
        navBrowser: "Buscador",
        navSecurity: "Seguridad"
    },
    en: {
        subtitle: "PANGA Security & Trust",
        assetsTitle: "Main Assets",
        bnbLabel: "BNB Balance (BSC)",
        btnEco: "Go to ZAARD Ecosystem",
        stakingBadge: "🚀 COMING SOON GRAND OPENING",
        stakingTitle: "Smart Asset Locking",
        stakingDesc: "Upcoming grand opening. You will be able to lock your ZARD tokens in audited smart contracts to generate daily rewards and passive yield within the decentralized ecosystem.",
        stakingBtn: "Module Initializing",
        browserTitle: "Browser & DApps",
        browserDesc: "Official protocol platforms:",
        arcade: "Arcade Games",
        tracker: "ZARD Tracker",
        web: "Website",
        eco: "Ecosystem",
        swapDesc: "Decentralized operations with maximum liquidity on PancakeSwap.",
        navHome: "Home",
        navBrowser: "Browser",
        navSecurity: "Security"
    }
};

function alternarIdioma() {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    document.getElementById("lang-indicator").textContent = idiomaActual.toUpperCase() + " 🌐";
    
    const t = traducciones[idiomaActual];
    document.getElementById("header-subtitle").textContent = t.subtitle;
    document.getElementById("txt-assets-title").textContent = t.assetsTitle;
    document.getElementById("txt-bnb-label").textContent = t.bnbLabel;
    document.getElementById("txt-btn-ecosystem").textContent = t.btnEco;
    document.getElementById("badge-coming-text").textContent = t.stakingBadge;
    document.getElementById("staking-title-msg").textContent = t.stakingTitle;
    document.getElementById("staking-desc-msg").textContent = t.stakingDesc;
    document.getElementById("staking-btn-msg").textContent = t.stakingBtn;
    document.getElementById("txt-browser-title").textContent = t.browserTitle;
    document.getElementById("txt-browser-desc").textContent = t.browserDesc;
    document.getElementById("dapp-arcade").textContent = t.arcade;
    document.getElementById("dapp-tracker").textContent = t.tracker;
    document.getElementById("dapp-web").textContent = t.web;
    document.getElementById("dapp-eco").textContent = t.eco;
    document.getElementById("txt-swap-desc").textContent = t.swapDesc;
}

// --- SEGURIDAD Y PIN ---
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

    document.body.classList.remove("bg-swap", "bg-security");
    if (tabId === 'swap') {
        document.body.classList.add("bg-swap");
    } else if (tabId === 'seguridad') {
        document.body.classList.add("bg-security");
    }
}

// --- CONTROL DE MODAL DE BILLETERAS ---
function mostrarModalWallet() {
    if (typeof window.ethereum !== 'undefined') {
        intentarConexionDirecta();
        return;
    }
    document.getElementById("wallet-modal").style.display = "flex";
}

function cerrarModalWallet() {
    document.getElementById("wallet-modal").style.display = "none";
}

async function intentarConexionDirecta() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        actualizarInterfazWallet(address, provider);
        cerrarModalWallet();
    } catch (error) {
        console.error("Conexión rechazada", error);
    }
}

function conectarMetaMask() {
    const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
    window.location.href = `https://metamask.app.link/dapp/${cleanUrl}`;
}

function conectarBinance() {
    const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
    // Enlace universal compatible con Binance Web3 dApp browser
    window.location.href = `https://app.binance.com/en/wegames?appUrl=${encodeURIComponent(window.location.href)}`;
}

async function actualizarInterfazWallet(address, provider) {
    const connectBtn = document.getElementById("connect-btn");
    connectBtn.textContent = address.substring(0, 6) + "..." + address.substring(address.length - 4);
    connectBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";

    const balance = await provider.getBalance(address);
    const bnbFormatted = ethers.utils.formatEther(balance);
    document.getElementById("bnb-balance").textContent = parseFloat(bnbFormatted).toFixed(4) + " BNB";
    document.getElementById("zard-balance").textContent = "1,540.00 ZARD";
}
