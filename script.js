// Centralized configuration
const CONFIG = {
    colors: ["#ff00ff", "#00f3ff", "#39ff14", "#ff3131", "#ff7f00", "#ffff00", "#ff1493", "#9400d3", "#00ffff", "#ff69b4"],
    fonts: [
        "Lobster",
        "Monoton",
        "Pacifico",
        "Audiowide",
        "Bangers",
        "Creepster",
        "Faster One",
        "Nosifer",
        "Orbitron",
        "Press Start 2P",
        "Rubik Mono One",
    ],
    sizes: ["small", "medium", "large"],
    pricing: {
        small: 900,
        medium: 1350,
        large: 1550,
        perLetter: 500,
    },
};

const textInput = document.getElementById("textInput");
const neonText = document.getElementById("neonText");
const colorOptions = document.querySelector(".color-options");
const fontOptions = document.querySelector(".font-options");
const sizeButtons = document.querySelectorAll(".size-btn");
const priceDisplay = document.getElementById("price");
const addToCartBtn = document.getElementById("addToCart");

let activeColor = CONFIG.colors[0];
let activeFont = CONFIG.fonts[0];
let activeSize = "medium";

function createColorOptions() {
    CONFIG.colors.forEach((color) => {
        const div = document.createElement("div");
        div.className = "color-option";
        div.style.backgroundColor = color;
        div.addEventListener("click", () => setColor(color));
        colorOptions.appendChild(div);
    });
}

function createFontOptions() {
    CONFIG.fonts.forEach((font) => {
        const div = document.createElement("div");
        div.className = "font-option";
        div.style.fontFamily = font;
        div.textContent = "Aa";
        div.addEventListener("click", () => setFont(font));
        fontOptions.appendChild(div);
    });
}

function setColor(color) {
    activeColor = color;
    document.querySelectorAll(".color-option").forEach((option) => {
        option.classList.toggle("active", option.style.backgroundColor === color);
    });
    updateNeonText();
}

function setFont(font) {
    activeFont = font;
    document.querySelectorAll(".font-option").forEach((option) => {
        option.classList.toggle("active", option.style.fontFamily === font);
    });
    updateNeonText();
}

function setSize(size) {
    activeSize = size;
    sizeButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.size === size);
    });
    updateNeonText();
}

function updateNeonText() {
    const text = textInput.value || "Neon Light";
    neonText.textContent = text;
    neonText.style.fontFamily = activeFont;
    neonText.style.color = activeColor;
    neonText.className = activeSize;
    neonText.style.textShadow = `0 0 2px ${activeColor}, 0 0 4px ${activeColor}, 0 0 8px ${activeColor}, 0 0 12px ${activeColor}`;
    neonText.style.webkitTextStroke = `1px ${activeColor}`;
    neonText.style.textStroke = `1px ${activeColor}`;
    textInput.style.fontFamily = activeFont;
    updatePrice();
}

function updatePrice() {
    const text = textInput.value;
    if (text) {
        const basePrice = CONFIG.pricing[activeSize];
        const letterPrice = (text.length - 1) * CONFIG.pricing.perLetter;
        const totalPrice = basePrice + letterPrice;
        priceDisplay.textContent = totalPrice;
    } else {
        priceDisplay.textContent = "0";
    }
}

function addToCart() {
    const text = textInput.value;
    if (text) {
        const price = parseInt(priceDisplay.textContent);
        alert(`Added to cart: "${text}" - ₹${price}`);
    } else {
        alert("Please enter your custom text before adding to cart.");
    }
}

textInput.addEventListener("input", updateNeonText);
sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => setSize(btn.dataset.size));
});
addToCartBtn.addEventListener("click", addToCart);

createColorOptions();
createFontOptions();
setColor(CONFIG.colors[0]);
setFont(CONFIG.fonts[0]);
setSize("medium");
updateNeonText();
