window.addEventListener('message', function (event) {
    const data = event.data;

    if (data.action === "updateStatus") {
        document.getElementById('hunger-fill').style.width = data.hunger + "%";
        document.getElementById('thirst-fill').style.width = data.thirst + "%";

        const hungerFill = document.getElementById('hunger-fill');
        const thirstFill = document.getElementById('thirst-fill');

        hungerFill.classList.toggle('low', data.hunger < 15);
        thirstFill.classList.toggle('low', data.thirst < 15);
    }

    if (data.action === "showHud") {
        document.getElementById('hud').style.display = "flex";
    }

    if (data.action === "animate") {
        if (data.type === "hunger") {
            const icon = document.querySelector('.hunger .icon');
            icon.classList.add('animate');
            setTimeout(() => icon.classList.remove('animate'), 500);
        }

        if (data.type === "thirst") {
            const icon = document.querySelector('.thirst .icon');
            icon.classList.add('animate');
            setTimeout(() => icon.classList.remove('animate'), 500);
        }
    }

    if (data.action === "applySettings") {
        document.querySelector('.hunger').style.display = data.hungerVisible ? "flex" : "none";
        document.querySelector('.thirst').style.display = data.thirstVisible ? "flex" : "none";

        document.getElementById('hunger-fill').style.backgroundColor = data.colorHunger;
        document.getElementById('thirst-fill').style.backgroundColor = data.colorThirst;
    }

    if (data.action === "openMenu") {
        document.getElementById("hud-menu").style.display = "block";
        document.getElementById("hud").style.display = "none";
    }

    if (data.action === "closeMenu") {
        document.getElementById("hud-menu").style.display = "none";
        document.getElementById("hud").style.display = "flex";
    }
});
