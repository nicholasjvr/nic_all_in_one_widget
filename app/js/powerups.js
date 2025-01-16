function createPowerUp() {
    const powerUp = document.createElement('div');
    powerUp.style.width = '20px';
    powerUp.style.height = '20px';
    powerUp.style.backgroundColor = 'green';
    powerUp.style.position = 'absolute';
    powerUp.style.top = Math.random() * window.innerHeight + 'px';
    powerUp.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(powerUp);

    let checkPowerUpCollision = setInterval(() => {
        if (parseInt(box.style.left) < parseInt(powerUp.style.left) + 20 &&
            parseInt(box.style.left) + 50 > parseInt(powerUp.style.left) &&
            parseInt(box.style.top) < parseInt(powerUp.style.top) + 20 &&
            parseInt(box.style.top) + 50 > parseInt(powerUp.style.top)) {
            powerUp.remove();
            clearInterval(checkPowerUpCollision);
        }
    }, 10);
}

// Periodically spawn power-ups
setInterval(createPowerUp, 5000);
