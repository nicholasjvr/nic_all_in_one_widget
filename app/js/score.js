let score = 0;
function increaseScore() {
    score += 10;
    document.getElementById('score').textContent = `Score: ${score}`;
}
document.body.innerHTML += '<div id="score">Score: 0</div>';
