document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const winScreen = document.getElementById('win-screen');
    const winRestartBtn = document.getElementById('win-restart-btn');

    let score = 0;
    let ideas = [];
    let gameRunning = false;
    let animationId;

    // Idea class
    class Idea {
        constructor() {
            this.x = Math.random() * (canvas.width - 50);
            this.y = 0;
            this.radius = 25;
            this.speed = 2 + Math.random() * 2;
            this.text = ['💡', '🧠', '📚', '🚀', '🌍'][Math.floor(Math.random() * 5)];
        }

        update() {
            this.y += this.speed;
        }

        draw() {
            ctx.font = '30px Arial';
            ctx.fillText(this.text, this.x, this.y);
        }

        isClicked(mouseX, mouseY) {
            const dist = Math.sqrt((mouseX - this.x - 25)**2 + (mouseY - this.y + 15)**2);
            return dist < this.radius;
        }
    }

    function startGame() {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        // Set canvas size
        canvas.width = Math.min(window.innerWidth - 40, 800);
        canvas.height = Math.min(window.innerHeight - 150, 600);
        score = 0;
        ideas = [];
        gameRunning = true;
        scoreDisplay.textContent = 'Score: 0';
        restartBtn.style.display = 'none';
        winScreen.style.display = 'none';
        gameLoop();
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add new idea occasionally
        if (Math.random() < 0.02) {
            ideas.push(new Idea());
        }

        // Update and draw ideas
        ideas.forEach((idea, index) => {
            idea.update();
            idea.draw();

            // Remove if off screen
            if (idea.y > canvas.height) {
                ideas.splice(index, 1);
            }
        });

        // Check win condition
        if (score >= 10) {
            gameRunning = false;
            winScreen.style.display = 'block';
            return;
        }

        animationId = requestAnimationFrame(gameLoop);
    }

    function getEventPosition(event) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if (event.touches) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function handleInteraction(event) {
        event.preventDefault();
        if (!gameRunning) return;

        const pos = getEventPosition(event);

        ideas.forEach((idea, index) => {
            if (idea.isClicked(pos.x, pos.y)) {
                ideas.splice(index, 1);
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });
    }

    canvas.addEventListener('click', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    winRestartBtn.addEventListener('click', () => {
        winScreen.style.display = 'none';
        startGame();
    });

    window.addEventListener('resize', () => {
        if (gameRunning) {
            canvas.width = Math.min(window.innerWidth - 40, 800);
            canvas.height = Math.min(window.innerHeight - 150, 600);
        }
    });
});