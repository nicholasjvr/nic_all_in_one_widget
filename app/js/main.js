document.getElementById("recordCreationBtn").addEventListener("click", function () {
    alert("Destroy all the Glorbians");
    window.location.href = '/pages/createRecordPage.html'; 
  });

  // Initialize the game (start spawning enemies and enable player control)
document.addEventListener('DOMContentLoaded', () => {
    spawnEnemies(); // Start spawning enemies
});

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {  
        jump();
    }
    if (event.key === 'a') {  
        dodge(-1);
    }
    if (event.key === 'd') {  
        dodge(1);
    }

    if (event.key === onmousedown) {  
        shoot()
    }
});
