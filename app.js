// --- CONTROL DE PESTAÑAS ---
function cambiarPestaña(tabName) {
    // Ocultar todas las pestañas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Desactivar todos los botones del menú
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Activar la pestaña seleccionada
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Resaltar botón correspondiente
    event.currentTarget.classList.add('active');
}

// --- LOGICA WEB3 Y CONEXIÓN BSC ---
const BSC_CHAIN_ID = "0x38"; // 56 en decimal
const RPC_URL = "https://bsc-dataseed.binance.org/";

// Contratos del ecosistema ZAARD INNOVATION
const TOKENS = {
    ZARD: "0x3468ea4e6ce13ec4c7f8651f7efc6aa6046f4d65" 
};

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

let provider;
let signer;
let userAddress;

async function conectarWallet() {
    if (typeof window.ethereum === "undefined") {
        alert("¡No se detectó ninguna billetera Web3! Instala MetaMask o Trust Wallet.");
        return;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        
        // Cambiar texto del botón con parte de la dirección
        document.getElementById("connect-btn").innerText = userAddress.substring(0, 6) + "..." + userAddress.substring(38);

        // Verificar red BSC
        const network = await provider.getNetwork();
        if (network.chainId !== 56) {
            await cambiarARedBSC();
        }

        await obtenerBalances();

    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

async function cambiarARedBSC() {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_CHAIN_ID }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: BSC_CHAIN_ID,
                        chainName: "Binance Smart Chain Mainnet",
                        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                        rpcUrls: [RPC_URL],
                        blockExplorerUrls: ["https://bscscan.com/"]
                    }],
                });
            } catch (addError) {
                console.error("No se pudo agregar la red:", addError);
            }
        }
    }
}

async function obtenerBalances() {
    if (!userAddress) return;

    try {
        // Balance BNB
        const bnbWei = await provider.getBalance(userAddress);
        const bnbFormatted = parseFloat(ethers.utils.formatEther(bnbWei)).toFixed(4);
        document.getElementById('bnb-balance').innerText = `${bnbFormatted} BNB`;

        // Balance ZARD
        if (TOKENS.ZARD !== "0x0000000000000000000000000000000000000000") {
            const zardContract = new ethers.Contract(TOKENS.ZARD, ERC20_ABI, provider);
            const zardBal = await zardContract.balanceOf(userAddress);
            const zardDec = await zardContract.decimals();
            
            // Si en tu HTML usas el id 'zaard-balance' o 'zard-balance', lo adaptamos. 
            // Aquí apuntamos al identificador principal de tu token ZARD:
            const element = document.getElementById('zaard-balance');
            if (element) {
                element.innerText = parseFloat(ethers.utils.formatUnits(zardBal, zardDec)).toFixed(2);
            }
        }

    } catch (e) {
        console.error("Error al leer balances:", e);
    }
}
