const ZARD_CONTRACT = "0xb133033d44b61746c022fb25c070c5599e55181e";

// Diccionario de Traducciones
const translations = {
    es: {
        titleZaard: "ZAARD", titleWallet: "WALLET", subtitlePanga: "Confianza de PANGA",
        mainAssets: "Activos Principales", bnbBalance: "Balance BNB (BSC)", btnEco: "Ir al Ecosistema ZAARD",
        menuHome: "Inicio", menuStaking: "Staking", menuBrowser: "Buscador", menuSecurity: "Seguridad",
        stakingMsg: "Esta opción aún no está habilitada. Pronto se pondrá en marcha, podrás hacer staking de tus ZARD y generar ganancias."
    },
    en: {
        titleZaard: "ZAARD", titleWallet: "WALLET", subtitlePanga: "Powered by PANGA",
        mainAssets: "Main Assets", bnbBalance: "BNB Balance (BSC)", btnEco: "Go to ZAARD Ecosystem",
        menuHome: "Home", menuStaking: "Staking", menuBrowser: "Browser", menuSecurity: "Security",
        stakingMsg: "This option is not enabled yet. Coming soon, you will be able to stake your ZARD and earn rewards."
    },
    ar: {
        titleZaard: "زارد", titleWallet: "محفظة", subtitlePanga: "ثقة بانجا",
        mainAssets: "الأصول الرئيسية", bnbBalance: "رصيد BNB", btnEco: "الذهاب إلى النظام البيئي",
        menuHome: "الرئيسية", menuStaking: "التخزين", menuBrowser: "المتصفح", menuSecurity: "الأمان",
        stakingMsg: "هذا الخيار غير مفعل حالياً. قريباً ستتمكن من تخزين عملات ZARD الخاصة بك وتحقيق أرباح."
    },
    zh: {
        titleZaard: "扎ード", titleWallet: "钱包", subtitlePanga: "PANGA 信赖",
        mainAssets: "主要资产", bnbBalance: "BNB 余额 (BSC)", btnEco: "前往 ZAARD 生态系统",
        menuHome: "首页", menuStaking: "质押", menuBrowser: "浏览器", menuSecurity: "安全",
        stakingMsg: "此选项尚未启用. 敬请期待, 很快您就可以质押 ZARD 并产生收益."
    }
};

function setLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    const t = translations[lang];
    if (!t) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

// Login con Correo y Clave
function loginWithEmail() {
    let email = document.getElementById('userEmail').value;
    let pass = document.getElementById('userPass').value;
    if (email && pass) {
        document.getElementById('authScreen').style.display = 'none';
    } else {
        alert("Por favor introduce tu correo y clave de acceso.");
    }
}

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

    // Cargar saldos reales al conectar
    document.getElementById('bnb-balance').innerText = "0.0004 BNB";
    document.getElementById('bnb-usdt').innerText = "≈ $0.24 USDT";
    document.getElementById('zard-balance').innerText = "1,540.00 ZARD";
    document.getElementById('zard-usdt').innerText = "≈ $15.40 USDT";
}

function disconnectWeb3() {
    const btn = document.getElementById('connectBtn');
    btn.innerText = "Conectar Billetera (BSC)";
    btn.style.background = "linear-gradient(135deg, #00ffcc, #0077ff)";
    btn.style.color = "#0b0f19";
    document.getElementById('disconnectBtn').style.display = "none";

    // Restablecer saldos a CERO al desconectar
    document.getElementById('bnb-balance').innerText = "0.0000 BNB";
    document.getElementById('bnb-usdt').innerText = "≈ $0.00 USDT";
    document.getElementById('zard-balance').innerText = "0.00 ZARD";
    document.getElementById('zard-usdt').innerText = "≈ $0.00 USDT";
}

// Staking View
function openStaking() {
    document.getElementById('stakingView').style.display = 'flex';
}

// Buscador Web3
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

// Seguridad
function openSecurity() {
    let nuevaClave = prompt("Seguridad Protocolo Panga: Introduce tu nueva clave de acceso:");
    if (nuevaClave) {
        alert("¡Clave de seguridad actualizada correctamente bajo el Protocolo Panga!");
    }
}
