// Update tariff value display when slider moves
document.getElementById('tariff').addEventListener('input', function() {
    document.getElementById('tariffValue').textContent = this.value + '%';
});

function formatNumber(value, isPrice = true) {
    // For prices under $10, show cents
    if (isPrice && Math.abs(value) < 10) {
        return `$${value.toFixed(2)}`;
    }
    
    // For prices $10 and over, round to whole dollars
    if (isPrice && Math.abs(value) >= 10) {
        value = Math.round(value);
        return `$${value.toLocaleString()}`;
    }
    
    // For non-price numbers (like units), just add commas
    return value.toLocaleString();
}

function calculateImpact() {
    // Get input values
    const price = parseFloat(document.getElementById('price').value);
    const units = parseInt(document.getElementById('units').value);
    const cogs = parseFloat(document.getElementById('cogs').value);
    const tariffRate = parseFloat(document.getElementById('tariff').value);

    // Validate inputs
    if (!price || !units || !cogs || !tariffRate) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate current metrics
    const currentRevenue = price * units;
    const currentTotalCOGS = cogs * units;
    const currentMargin = price - cogs; // Keep this for calculations
    const currentGrossProfit = currentMargin * units;

    // Calculate impact with tariffs
    const tariffAmount = cogs * (tariffRate / 100);
    const newCogs = cogs + tariffAmount;
    const newTotalCOGS = newCogs * units;
    const newRevenue = currentRevenue; // Revenue stays the same initially
    const newMargin = price - newCogs; // Keep this for calculations
    const newGrossProfit = newMargin * units;

    // Calculate percent changes
    const profitChangePercent = ((newGrossProfit - currentGrossProfit) / currentGrossProfit) * 100;
    const cogsChangePercent = ((newTotalCOGS - currentTotalCOGS) / currentTotalCOGS) * 100;

    // Calculate solutions
    const priceIncrease = tariffAmount;
    const lostMarginDollars = currentGrossProfit - newGrossProfit;
    const marginPerUnitWithTariff = price - (cogs + (cogs * tariffRate/100));
    const volumeIncrease = Math.ceil(lostMarginDollars / marginPerUnitWithTariff);
    const costReduction = currentGrossProfit - newGrossProfit;

    // Update display
    document.getElementById('currentRevenue').textContent = formatNumber(currentRevenue);
    document.getElementById('currentCOGS').textContent = formatNumber(currentTotalCOGS);
    document.getElementById('currentGrossProfit').textContent = formatNumber(currentGrossProfit);
    
    document.getElementById('newRevenue').textContent = formatNumber(newRevenue);
    document.getElementById('newCOGS').textContent = formatNumber(newTotalCOGS);
    document.getElementById('cogsChangePercent').textContent = 
        `(+${cogsChangePercent.toFixed(1)}%)`;
    document.getElementById('cogsChangePercent').className = 'change-indicator negative';

    document.getElementById('newGrossProfit').textContent = formatNumber(newGrossProfit);
    document.getElementById('profitChange').textContent = 
        `(${profitChangePercent >= 0 ? '+' : ''}${profitChangePercent.toFixed(1)}%)`;
    document.getElementById('profitChange').className = 
        `change-indicator ${profitChangePercent >= 0 ? 'positive' : 'negative'}`;
    
    // Update solutions
    document.getElementById('priceIncrease').textContent = `${formatNumber(priceIncrease)} per unit`;
    document.getElementById('volumeIncrease').textContent = `${formatNumber(volumeIncrease, false)} units`;
    document.getElementById('costReduction').textContent = `${formatNumber(costReduction)} total`;
}