# ⚡ ZARD Token Web3 DApp & Financial Tracker

[![Network](https://img.shields.io/badge/Network-BNB%20Smart%20Chain%20(BSC)-F3BA2F?style=for-the-badge&logo=binance)](https://bscscan.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Live%20v1.2.0-brightgreen?style=for-the-badge)]()

**ZARD Token DApp** es una plataforma descentralizada, responsiva y de alto rendimiento diseñada para la gestión financiera, monitoreo en tiempo real e intercambio del token **ZARD** en la red **BNB Smart Chain (BSC)**.

El panel ofrece herramientas analíticas avanzadas, métricas en vivo mediante agregadores DEX, visualización de balances Web3 y accesos directos a los liquidity pools más importantes de la red.

---

## 📌 Datos Técnicos del Smart Contract

* **Token Symbol:** ZARD
* **Network:** BNB Smart Chain (BSC Mainnet)
* **Chain ID:** `56` (Decimal) / `0x38` (Hexadecimal)
* **Contract Address (CA):** `0x973ba2c1dccd0820f1e026d6b1f01c55c4085d38`
* **Token Standard:** BEP-20
* **Decimales:** 18
* **Explorador Oficial:** [Ver en BscScan](https://bscscan.com/token/0x973ba2c1dccd0820f1e026d6b1f01c55c4085d38)

---

## ✨ Características Detalladas

### 1. 📊 Tracker de Mercados & Velas en Vivo
* Integración fluida mediante iFrame interactivo de **DexScreener** optimizado para modo oscuro.
* Lectura dinámica de precios, volumen de 24h, liquidez del pool y gráficos intradía.
* Mapeo de pares de mercado principales (`ZARD/BNB`, `ZARD/USDT`, `ZARD/BTC`).

### 2. ⚡ Libro de Órdenes & Spread en Tiempo Real
* Tablas de monitoreo visual para órdenes rápidas de compra (*BUY*) y venta (*SELL*).
* Visualizador de Spread estimado para análisis rápido de liquidez.

### 3. 👛 Panel de Billetera & Saldos Web3
* Conexión fluida con proveedores inyectados EVM (**MetaMask**, **Trust Wallet**, **Binance Web3 Wallet**, **Coinbase Wallet**).
* Consulta bajo demanda y en vivo del saldo nativo (`BNB`) y tokens BEP-20 (`ZARD`).
* Gestión de estados para manejo de cuentas desconectadas o cambios de red automáticos.

### 4. 🔄 Enrutamiento Directo a DEX
* Enlace encriptado e integración directa hacia **PancakeSwap V2/V3**.
* Deep link compatible con el ecosistema de **Binance Web3 Wallet App**.

---

## 📂 Arquitectura del Proyecto

```text
zard-wallet-dapp/
├── 📄 index.html              # Estructura principal, modales y pestañas
├── 🎨 css/
│   ├── styles.css            # Estilos globales y variables de tema (Neon Theme)
│   └── components.css        # Estilos modulares (Tarjetas, Tablas de Órdenes, Botones)
├── 📜 js/
│   ├── web3-provider.js      # Inicialización de Ethers.js/Web3.js y conexión de billeteras
│   ├── contract-abi.js       # ABI estándar BE
