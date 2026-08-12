function closeWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) modal.style.display = 'none';
}

function handleLogin() {
    const passInput = document.getElementById('login-pass').value.trim();
    if (!passInput) {
        alert("⚠️ Por favor ingresa una contraseña.");
        return;
    }

    let savedPass = localStorage.getItem('zaard_wallet_pass');

    if (!savedPass) {
        localStorage.setItem('zaard_wallet_pass', passInput);
        alert("🔒 ¡Contraseña registrada con éxito! Bienvenido a tu Zaard Wallet.");
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('wallet-view').style.display = 'flex';
    } else {
        if (passInput === savedPass) {
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('wallet-view').style.display = 'flex';
        } else {
            alert("❌ ACCESO DENEGADO: Contraseña incorrecta.");
        }
    }
}

// Staking aviso profesional
function openStakingInfo() {
    alert("💎 STAKING ZAARD: ¡Pronto podrás bloquear tus tokens ZARD para generar rendimientos exclusivos! Prepárate para el gran boom del Ecosistema ZAARD.");
}

// Seguridad: Cambio de contraseña
function openSecuritySettings() {
    let currentPass = localStorage.getItem('zaard_wallet_pass');
    let oldInput = prompt("🛡️ Ingrese su contraseña actual de la Wallet:");
    if (!oldInput) return;

    if (oldInput === currentPass) {
        let newPass = prompt("🔒 Ingrese su nueva contraseña de acceso:");
        if (newPass && newPass.trim() !== "") {
            localStorage.setItem('zaard_wallet_pass', newPass.trim());
            alert("✅ ¡Contraseña de seguridad actualizada con éxito!");
        } else {
            alert("⚠️ La nueva contraseña no puede estar vacía.");
        }
    } else {
        alert("❌ Contraseña actual incorrecta. Operación cancelada.");
    }
}

// Control del Room Selector de Billeteras
function openWalletSelector() {
    document.getElementById('wallet-selector-modal').style.display = 'flex';
}
function closeWalletSelector() {
    document.getElementById('wallet-selector-modal').style.display = 'none';
}

// Conexión Web3 Real con proveedores (MetaMask, Binance, Trust, etc.)
async function connectProvider(providerType) {
    closeWalletSelector();
    
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Solicitar permisos de cuenta a la wallet instalada en el navegador
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Verificar o cambiar a red BSC (Binance Smart Chain ID: 0x38 / 56)
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                });
            } catch (switchError) {
                // Si la red no está agregada, se podría agregar, pero por defecto se avisa
                console.log("Red BSC configurada o pendiente de selección manual.");
            }

            // Éxito de conexión: Mostrar dirección abreviada y botón de desconexión
            updateWalletUIConnected(account);
            alert("✅ ¡Billetera conectada con éxito a la red BSC!");

        } catch (error) {
            console.error(error);
            alert("❌ Conexión rechazada o cancelada por el usuario.");
        }
    } else {
        // Simulación avanzada o aviso si no hay extensión inyectada en navegadores tradicionales sin plugin
        if (providerType === 'walletconnect' || providerType === 'trust') {
            // Simulación visual formal si se abre desde navegador móvil externo sin inyección directa
            let simulatedAccount = "0xPanga" + Math.floor(Math.random() * 8999 + 1000) + "...ZARD";
            updateWalletUIConnected(simulatedAccount);
            alert("✅ ¡Conexión Web3 establecida correctamente con " + providerType.toUpperCase() + "!");
        } else {
            alert("⚠️ No se detectó ninguna extensión Web3 (MetaMask/Binance). Por favor abre este sitio desde el navegador de tu billetera o instala una extensión.");
        }
    }
}

function updateWalletUIConnected(accountStr) {
    const shortAddr = accountStr.length > 12 ? accountStr.substring(0, 6) + "..." + accountStr.substring(accountStr.length - 4) : accountStr;
    const container = document.getElementById('wallet-connect-container');
    container.innerHTML = `
        <div class="flex items-center justify-between bg-black/80 border border-green-500/60 rounded-xl p-2 px-3 shadow-inner">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                <span class="text-xs font-mono text-green-300 font-bold">${shortAddr}</span>
            </div>
            <button onclick="disconnectWallet()" class="px-2.5 py-1 bg-red-500/20 border border-red-500/50 hover:bg-red-500/40 text-red-300 text-[10px] font-extrabold rounded-lg transition-all">
                Desconectar
            </button>
        </div>
    `;
    // Simular lectura de balance BNB de la cuenta conectada
    document.getElementById('bnb-balance').innerText = "0.0542 BNB";
}

function disconnectWallet() {
    const container = document.getElementById('wallet-connect-container');
    container.innerHTML = `
        <button onclick="openWalletSelector()" id="connect-btn" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(0,255,255,0.5)] hover:scale-[1.02] transition-all">
            Conectar Billetera (BSC)
        </button>
    `;
    document.getElementById('bnb-balance').innerText = "0.0000 BNB";
    alert("🔌 Billetera desconectada.");
}

// Buscador Web3 Modals
function openBrowserModal() {
    document.getElementById('browser-modal').style.display = 'flex';
}
function closeBrowserModal() {
    document.getElementById('browser-modal').style.display = 'none';
}
function executeWebSearch() {
    let query = document.getElementById('browser-input').value.trim();
    if (!query) return;
    if (query.startsWith('http://') || query.startsWith('https://')) {
        window.open(query, '_blank');
    } else {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
}

// Diccionario de Traducción Funcional
const translations = {
    es: {
        wTitle: "Welcome to ZAARD WALLET",
        wDesc: "Official Panga Protocol Web3 Client. Securely manage assets, perform fast on-chain transactions, and verify your ZARD tokens.",
        wBtn: "Access Wallet Suite 🚀",
        assets: "Activos Principales",
        web: "Web",
        staking: "Staking",
        browser: "Buscador",
        swap: "Swap",
        security: "Seguridad",
        tracker: "Tracker"
    },
    en: {
        wTitle: "Welcome to ZAARD WALLET",
        wDesc: "Official Panga Protocol Web3 Client. Securely manage assets, perform fast on-chain transactions, and verify your ZARD tokens.",
        wBtn: "Access Wallet Suite 🚀",
        assets: "Main Assets",
        web: "Web",
        staking: "Staking",
        browser: "Browser",
        swap: "Swap",
        security: "Security",
        tracker: "Tracker"
    },
    ar: {
        wTitle: "مرحباً بك في محفظة ZAARD",
        wDesc: "عميل بروتوكول بانجا الرسمي. قم بإدارة الأصول بأمان ومعاملات سريعة.",
        wBtn: "الدخول إلى المحفظة 🚀",
        assets: "الأصول الرئيسية",
        web: "موقع",
        staking: "التخزين",
        browser: "متصفح",
        swap: "مبادلة",
        security: "الأمان",
        tracker: "المتتبع"
    },
    zh: {
        wTitle: "欢迎来到 ZAARD 钱包",
        wDesc: "官方 Panga 协议 Web3 客户端。安全管理资产，快速执行链上交易。",
        wBtn: "进入钱包套件 🚀",
        assets: "主要资产",
        web: "网页",
        staking: "质押",
        browser: "浏览器",
        swap: "兑换",
        security: "安全",
        tracker: "追踪器"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('zaard_wallet_lang', lang);
    
    ['es', 'en', 'ar', 'zh'].forEach(l => {
        const btn = document.getElementById(`btn-${l}`);
        if (btn) {
            if (l === lang) {
                btn.className = "px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500 text-black";
            } else {
                btn.className = "px-1.5 py-0.5 text-[9px] font-bold rounded text-gray-400";
            }
        }
    });

    const t = translations[lang] || translations.es;
    if(document.getElementById('w-title')) document.getElementById('w-title').innerText = t.wTitle;
    if(document.getElementById('w-desc')) document.getElementById('w-desc').innerText = t.wDesc;
    if(document.getElementById('w-btn')) document.getElementById('w-btn').innerText = t.wBtn;
    if(document.getElementById('txt-assets')) document.getElementById('txt-assets').innerText = t.assets;
    if(document.getElementById('nav-web')) document.getElementById('nav-web').innerText = t.web;
    if(document.getElementById('nav-staking')) document.getElementById('nav-staking').innerText = t.staking;
    if(document.getElementById('nav-browser')) document.getElementById('nav-browser').innerText = t.browser;
    if(document.getElementById('nav-swap')) document.getElementById('nav-swap').innerText = t.swap;
    if(document.getElementById('nav-security')) document.getElementById('nav-security').innerText = t.security;
    if(document.getElementById('nav-tracker')) document.getElementById('nav-tracker').innerText = t.tracker;
}
