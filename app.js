const BSC_CHAIN_ID = "0x38"; // 56 Decimal (BSC)
const ZARD_CONTRACT_ADDRESS = "0x3468ea4e6ce13ec4c7f8651f7efc6aa6046f4d65";

let provider, signer, userAddress;

window.addEventListener('DOMContentLoaded', () => {
    const savedPin = localStorage.getItem('zaard_wallet_pin');
    if (!savedPin) {
        document.getElementById('lock-msg').innerHTML = "Cartera principal de ZAARD INNOVATION.<br><b>Crea tu PIN de seguridad:</b>";
    }
});

function verificarPin() {
    const input = document.getElementById('pin-input').value;
    if (!input || input.length < 4) {
        alert("Por favor ingresa al menos 4 dígitos.");
        return;
    }
    let savedPin = localStorage.getItem('zaard_wallet_pin');
    if (!savedPin) {
        localStorage.setItem('zaard_wallet_pin', input);
        alert("¡PIN guardado con éxito!");
        document.getElementById('lock-screen').style.display = 'none';
    } else {
        if (input === savedPin) {
            document.getElementById('lock-screen').style.display = 'none';
        } else {
            alert("Contraseña incorrecta.");
        }
    }
}

async function conectarWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const network = await provider.getNetwork();
            if (network.chainId !== 56) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: BSC_CHAIN_ID }],
                    });
                } catch (switchError) {
                    alert("Cambia tu red a Binance Smart Chain (BSC) para continuar.");
                    return;
                }
            }

            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            
            const btn = document.getElementById('connect-btn');
            btn.innerText = userAddress.substring(0, 4) + "..." + userAddress.substring(userAddress.length - 4);

            await actualizarSaldos();
        } catch (error) {
            console.error("Error al conectar wallet:", error);
        }
    } else {
        alert("Instala MetaMask, Trust Wallet o abre el navegador Web3.");
    }
}

async function actualizarSaldos() {
    if (!userAddress) return;
    try {
        const balanceBnbWei = await provider.getBalance(userAddress);
        const balanceBnbEth = ethers.utils.formatEther(balanceBnbWei);
        document.getElementById('bnb-balance').innerText = parseFloat(balanceBnbEth).toFixed(4) + " BNB";

        const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
        const zardContract = new ethers.Contract(ZARD_CONTRACT_ADDRESS, erc20Abi, provider);
        const balanceZardWei = await zardContract.balanceOf(userAddress);
        const balanceZard = ethers.utils.formatUnits(balanceZardWei, 18);

        document.getElementById('zard-balance').innerText = parseFloat(balanceZard).toFixed(2);
    } catch (e) {
        console.error("Error al leer balances:", e);
    }
}

function cambiarPestaña(tabName, event) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    if (tabName === 'main') {
        document.getElementById('tab-main').classList.add('active');
    } else if (tabName === 'browser') {
        document.getElementById('tab-browser').classList.add('active');
    } else if (tabName === 'swap') {
        document.getElementById('tab-swap').classList.add('active');
    } else if (tabName === 'settings') {
        document.getElementById('tab-settings').classList.add('active');
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}
