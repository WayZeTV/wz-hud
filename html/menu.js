document.getElementById('save-btn').addEventListener('click', function () {
    const hunger = document.getElementById('toggle-hunger').checked;
    const thirst = document.getElementById('toggle-thirst').checked;
    const colorHunger = document.getElementById('color-hunger').value;
    const colorThirst = document.getElementById('color-thirst').value;

    fetch(`https://hud_status/saveSettings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            hunger: hunger,
            thirst: thirst,
            colorHunger: colorHunger,
            colorThirst: colorThirst
        })
    }).then(() => {
        document.getElementById("hud-menu").style.display = "none";
        document.getElementById("hud").style.display = "flex";
        document.body.style.background = "transparent";
    });
});
