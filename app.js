function closeWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Lógica de contraseña flexible: guarda la primera que escribes y te deja entrar siempre con esa
function handleLogin() {
    const passInput = document.getElementById('login-pass').value.trim();
    
    if (!passInput) {
        alert("⚠️ Por favor ingresa una contraseña.");
        return;
    }

    let savedPass = localStorage.getItem('zaard_wallet_pass');

    if (!savedPass) {
        // Registra automáticamente la primera clave introducida
        localStorage.setItem('zaard_wallet_pass', passInput);
        alert("🔒 ¡Contraseña registrada con éxito! Bienvenido a tu Zaard Wallet.");
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('wallet-view').style.display = 'flex';
    } else {
        // Valida contra la clave guardada previamente
        if (passInput === savedPass) {
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('wallet-view').style.display = 'flex';
        } else {
            alert("❌ ACCESO DENEGADO: Contraseña incorrecta.");
        }
    }
}

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
}
