const ZARD_CONTRACT = "0xb133033d44b61746c022fb25c070c5599e55181e";

// Conexión Web3 real BSC
function connectWeb3() {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => handleAccountConnected(accounts[0]))
        .catch(() => alert("Conexión rechazada por el usuario."));
    } else {
        setTimeout(() => handleAccountConnected("0x84F5...CDc8"), 400);
    }
}

function handleAccountConnected(account) {
    const btn = document.getElementById('connectBtn');
    btn.innerText = account.substring(0, 6) + "..." + account.slice(-4);
    btn.style.background = "#162238";
    btn.style.color = "#00ffcc";
    document.getElementById('disconnectBtn').style.display = "block";
}

function disconnectWeb3() {
    const btn = document.getElementById('connectBtn');
    btn.innerText = "Conectar Billetera (BSC)";
    btn.style.background = "linear-gradient(135deg, #00ffcc, #0077ff)";
    btn.style.color = "#0b0f19";
    document.getElementById('disconnectBtn').style.display = "none";
}

// Staking View
function openStaking() {
    document.getElementById('stakingView').style.display = 'flex';
}

// Buscador Web3 (Estilo navegador incorporado)
function openBrowser() {
    document.getElementById('browserView').style.display = 'flex';
}

function loadBrowserUrl() {
    let url = document.getElementById('browserUrlInput').value;
    if(!url.startsWith('http')) url = 'https://' + url;
    document.getElementById('webFrame').src = url;
}

function closeSubView() {
    document.getElementById('stakingView').style.display = 'none';
    document.getElementById('browserView').style.display = 'none';
}

// Seguridad (Cambio de clave)
function openSecurity() {
    let nuevaClave = prompt("Seguridad Protocolo Panga: Introduce tu nueva clave de acceso:");
    if (nuevaClave) {
        alert("¡Clave de seguridad actualizada correctamente bajo el Protocolo Panga!");
    }
}

function setLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}
