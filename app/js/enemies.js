function createEnemy(x, y) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy'); // Apply the CSS enemy styles
    enemy.style.left = x + 'px';
    enemy.style.top = y + 'px';
    document.body.appendChild(enemy);

    // Move enemy downward
    const speed = 2; // Adjust speed as needed
    const moveInterval = setInterval(() => {
        const currentTop = parseInt(enemy.style.top || '0');
        if (currentTop < window.innerHeight) {
            enemy.style.top = currentTop + speed + 'px'; // Move enemy down
        } else {
            clearInterval(moveInterval);
            enemy.remove(); // Remove enemy once it moves off-screen
        }
    }, 20);

    return enemy;
}

// Spawn enemies at random positions
function spawnEnemies() {
    setInterval(() => {
        const randomX = Math.random() * (window.innerWidth - 50); // Enemy starts at random horizontal position
        createEnemy(randomX, 0); // Spawn at the top
    }, 1000); // Adjust spawn rate (1 enemy per second)
}

// Start enemy spawning
spawnEnemies();
