const box = document.getElementById('box');
let isJumping = false;
let isDodging = false;
let mouseX = 0;
let mouseY = 0;

// Ensure the box starts at a specific position
box.style.position = 'absolute';
box.style.top = '50px'; // Initial vertical position
box.style.left = '50px'; // Initial horizontal position

// Track mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

// Smoothly move the player (box) toward the mouse position
function updatePlayerPosition() {
    const currentX = parseFloat(box.style.left) || 0;
    const currentY = parseFloat(box.style.top) || 0;

    const speed = 5; // Adjust speed as needed

    // Gradual movement toward the target (mouse position)
    box.style.left = currentX + (mouseX - currentX) / speed + 'px';
    box.style.top = currentY + (mouseY - currentY) / speed + 'px';

    createTrail(currentX, currentY); // Add a trail effect
    requestAnimationFrame(updatePlayerPosition);
}

// Trail creation
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.width = '20px';
    trail.style.height = '20px';
    trail.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    trail.style.borderRadius = '50%';
    trail.style.position = 'absolute';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.pointerEvents = 'none'; // Prevent the trail from interfering with the mouse
    trail.style.transition = 'opacity 0.5s, transform 0.5s';
    trail.style.zIndex = -1;  // Set z-index to place the trail behind the player
    document.body.appendChild(trail);

    // Make the trail fade and shrink
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);

    // Remove the trail from the DOM after animation
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Initialize player movement
updatePlayerPosition();

// Shooting functionality
function shoot() {
    const projectile = document.createElement('div');
    projectile.style.width = '10px';
    projectile.style.height = '10px';
    projectile.style.backgroundColor = 'yellow';
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';

    // Start the projectile at the center of the player
    const startX = parseFloat(box.style.left) + box.offsetWidth / 2;
    const startY = parseFloat(box.style.top) + box.offsetHeight / 2;
    projectile.style.left = `${startX}px`;
    projectile.style.top = `${startY}px`;

    document.body.appendChild(projectile);

    // Move the projectile upward
    const projectileSpeed = 10; // Adjust speed as needed
    const moveProjectile = setInterval(() => {
        const currentTop = parseFloat(projectile.style.top) || 0;
        if (currentTop > 0) {
            projectile.style.top = `${currentTop - projectileSpeed}px`;
        } else {
            clearInterval(moveProjectile);
            projectile.remove(); // Remove the projectile when it leaves the screen
        }
    }, 20);
}

// Jump functionality
function jump() {
    if (!isJumping) {
        isJumping = true;
        let currentTop = parseFloat(box.style.top) || 0;
        const targetHeight = currentTop - 100; // Jump height
        const gravity = 2; // Speed of the jump

        // Move up
        const jumpUp = () => {
            if (currentTop > targetHeight) {
                currentTop -= gravity;
                box.style.top = `${currentTop}px`;
                requestAnimationFrame(jumpUp);
            } else {
                // Move down
                const jumpDown = () => {
                    if (currentTop < parseFloat(box.style.top) || 0) {
                        currentTop += gravity;
                        box.style.top = `${currentTop}px`;
                        requestAnimationFrame(jumpDown);
                    } else {
                        isJumping = false;
                    }
                };
                requestAnimationFrame(jumpDown);
            }
        };
        requestAnimationFrame(jumpUp);
    }
}

// Dodge functionality
function dodge(direction) {
    if (!isDodging) {
        isDodging = true;
        let currentLeft = parseFloat(box.style.left) || 0;
        const dodgeSpeed = 10;
        const dodgeDistance = 100 * direction;

        const dodgeMovement = setInterval(() => {
            if (Math.abs(currentLeft - (parseFloat(box.style.left) + dodgeDistance)) < dodgeDistance) {
                currentLeft += dodgeSpeed * direction;
                box.style.left = `${currentLeft}px`;
            } else {
                clearInterval(dodgeMovement);
                isDodging = false;
            }
        }, 10);
    }
}

// Event listeners for jump, dodge, and shoot
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
    if (event.key === 's') {
        shoot();
    }
});
