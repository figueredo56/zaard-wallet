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

// Diccionario de Traducción Funcional (ES, EN, AR, ZH)
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
    
    // Actualizar botones visuales
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

    // Aplicar textos traducidos
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
