function gameOver() {
    alert('Game Over!');
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    enemies.forEach(enemy => enemy.remove());
    enemies = [];
    bullets.forEach(bullet => bullet.remove());
    bullets = [];
}
