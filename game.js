// Parallel Dimensions - Retro Game
// A split-screen platformer where you control two characters simultaneously

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = 'start'; // start, playing, gameOver, victory, transitioning

        // Game settings
        this.currentLevel = 1;
        this.lives = 3;
        this.gravity = 0.5;
        this.jumpPower = -12;
        this.moveSpeed = 4;

        // Canvas setup
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.worldHeight = this.canvasHeight / 2;

        // Transition animation properties
        this.transitionState = {
            active: false,
            progress: 0,
            duration: 2000, // 2 seconds
            startTime: 0,
            portalParticles: [],
            screenFlash: 0
        };

        // Initialize game objects
        this.initPlayers();
        this.initLevels();
        this.initControls();
        this.initUI();

        // Start game loop
        this.gameLoop();
    }

    initPlayers() {
        this.player1 = {
            x: 50,
            y: this.worldHeight - 100,
            width: 16,
            height: 16,
            vx: 0,
            vy: 0,
            onGround: false,
            color: '#00ff00'
        };

        this.player2 = {
            x: 50,
            y: this.worldHeight * 2 - 100,
            width: 16,
            height: 16,
            vx: 0,
            vy: 0,
            onGround: false,
            color: '#ff00ff'
        };
    }

    initLevels() {
        this.levels = [
            // Level 1 - Tutorial
            {
                platforms: [
                    // Top world platforms
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 200, y: this.worldHeight - 80, width: 100, height: 20, color: '#444' },
                    { x: 400, y: this.worldHeight - 120, width: 100, height: 20, color: '#444' },
                    { x: 600, y: this.worldHeight - 60, width: 100, height: 20, color: '#444' },

                    // Bottom world platforms (different layout)
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 150, y: this.canvasHeight - 100, width: 100, height: 20, color: '#800080' },
                    { x: 350, y: this.canvasHeight - 140, width: 100, height: 20, color: '#800080' },
                    { x: 550, y: this.canvasHeight - 80, width: 100, height: 20, color: '#800080' },
                ],
                obstacles: [
                    // Top world obstacles
                    { x: 300, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },

                    // Bottom world obstacles
                    { x: 250, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            },

            // Level 2 - More challenging
            {
                platforms: [
                    // Top world
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 100, y: this.worldHeight - 60, width: 80, height: 20, color: '#444' },
                    { x: 250, y: this.worldHeight - 100, width: 80, height: 20, color: '#444' },
                    { x: 400, y: this.worldHeight - 140, width: 80, height: 20, color: '#444' },
                    { x: 550, y: this.worldHeight - 80, width: 80, height: 20, color: '#444' },
                    { x: 700, y: this.worldHeight - 120, width: 80, height: 20, color: '#444' },

                    // Bottom world
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 150, y: this.canvasHeight - 80, width: 80, height: 20, color: '#800080' },
                    { x: 300, y: this.canvasHeight - 120, width: 80, height: 20, color: '#800080' },
                    { x: 450, y: this.canvasHeight - 60, width: 80, height: 20, color: '#800080' },
                    { x: 600, y: this.canvasHeight - 100, width: 80, height: 20, color: '#800080' },
                ],
                obstacles: [
                    { x: 200, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 500, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 350, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            },

            // Level 3 - Expert
            {
                platforms: [
                    // Top world
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 50, y: this.worldHeight - 60, width: 60, height: 20, color: '#444' },
                    { x: 180, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },
                    { x: 310, y: this.worldHeight - 140, width: 60, height: 20, color: '#444' },
                    { x: 440, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },
                    { x: 570, y: this.worldHeight - 60, width: 60, height: 20, color: '#444' },
                    { x: 700, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },

                    // Bottom world
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 120, y: this.canvasHeight - 80, width: 60, height: 20, color: '#800080' },
                    { x: 250, y: this.canvasHeight - 120, width: 60, height: 20, color: '#800080' },
                    { x: 380, y: this.canvasHeight - 60, width: 60, height: 20, color: '#800080' },
                    { x: 510, y: this.canvasHeight - 100, width: 60, height: 20, color: '#800080' },
                    { x: 640, y: this.canvasHeight - 80, width: 60, height: 20, color: '#800080' },
                ],
                obstacles: [
                    { x: 150, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 400, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 650, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 200, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 450, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            }
        ];

        this.currentLevelData = this.levels[this.currentLevel - 1];

        // Initialize particles
        this.particles = [];
        this.stars = [];
        this.initParticles();
    }

    initParticles() {
        // Create background stars
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1,
                twinkle: Math.random() * Math.PI * 2
            });
        }

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                life: Math.random() * 100 + 50,
                color: ['#00ffff', '#ff00ff', '#ffff00', '#ff8800'][Math.floor(Math.random() * 4)]
            });
        }
    }

    initControls() {
        // Keyboard controls
        this.keys = {};
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;

            // Swipe detection
            if (Math.abs(deltaX) > 30) {
                if (deltaX > 0) {
                    this.keys['ArrowRight'] = true;
                    setTimeout(() => this.keys['ArrowRight'] = false, 100);
                } else {
                    this.keys['ArrowLeft'] = true;
                    setTimeout(() => this.keys['ArrowLeft'] = false, 100);
                }
            }

            if (deltaY < -30) {
                this.keys['ArrowUp'] = true;
                setTimeout(() => this.keys['ArrowUp'] = false, 100);
            }
        });
    }

    initUI() {
        // Button event listeners
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.nextLevel();
        });
    }

    startGame() {
        this.gameState = 'playing';
        this.hideAllScreens();
        this.resetLevel();
    }

    restartGame() {
        this.lives = 3;
        this.currentLevel = 1;
        this.currentLevelData = this.levels[this.currentLevel - 1];
        this.gameState = 'playing';
        this.hideAllScreens();
        this.resetLevel();
        this.updateUI();
    }

    nextLevel() {
        if (this.currentLevel < this.levels.length) {
            this.currentLevel++;
            this.currentLevelData = this.levels[this.currentLevel - 1];
            this.gameState = 'playing';
            this.hideAllScreens();
            this.resetLevel();
            this.updateUI();
        } else {
            // Game completed
            this.gameState = 'start';
            this.hideAllScreens();
            document.getElementById('startScreen').classList.remove('hidden');
        }
    }

    resetLevel() {
        this.player1.x = 50;
        this.player1.y = this.worldHeight - 100;
        this.player1.vx = 0;
        this.player1.vy = 0;
        this.player1.onGround = false;

        this.player2.x = 50;
        this.player2.y = this.worldHeight * 2 - 100;
        this.player2.vx = 0;
        this.player2.vy = 0;
        this.player2.onGround = false;
    }

    hideAllScreens() {
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('victoryScreen').classList.add('hidden');
    }

    updateUI() {
        document.getElementById('levelNum').textContent = this.currentLevel;
        document.getElementById('livesNum').textContent = this.lives;
    }

    update() {
        if (this.gameState !== 'playing') return;

        this.handleInput();
        this.updatePlayers();
        this.checkCollisions();
        this.checkWinCondition();
        this.updateTransition();
    }

    updateTransition() {
        if (!this.transitionState.active) return;

        const currentTime = Date.now();
        const elapsed = currentTime - this.transitionState.startTime;
        this.transitionState.progress = Math.min(elapsed / this.transitionState.duration, 1);

        // Update portal particles
        for (let i = this.transitionState.portalParticles.length - 1; i >= 0; i--) {
            const particle = this.transitionState.portalParticles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            if (particle.life <= 0) {
                this.transitionState.portalParticles.splice(i, 1);
            }
        }

        // Update screen flash
        if (this.transitionState.progress < 0.3) {
            this.transitionState.screenFlash = this.transitionState.progress / 0.3;
        } else if (this.transitionState.progress > 0.7) {
            this.transitionState.screenFlash = (1 - this.transitionState.progress) / 0.3;
        } else {
            this.transitionState.screenFlash = 1;
        }

        // Complete transition
        if (this.transitionState.progress >= 1) {
            this.completeLevelTransition();
        }
    }

    completeLevelTransition() {
        this.transitionState.active = false;

        if (this.currentLevel < this.levels.length) {
            this.currentLevel++;
            this.currentLevelData = this.levels[this.currentLevel - 1];
            this.resetLevel();
            this.updateUI();
        } else {
            // Game completed
            this.victory();
        }
    }

    handleInput() {
        // Player 1 and 2 move together
        if (this.keys['ArrowLeft']) {
            this.player1.vx = -this.moveSpeed;
            this.player2.vx = -this.moveSpeed;
        } else if (this.keys['ArrowRight']) {
            this.player1.vx = this.moveSpeed;
            this.player2.vx = this.moveSpeed;
        } else {
            this.player1.vx = 0;
            this.player2.vx = 0;
        }

        if (this.keys['ArrowUp'] && this.player1.onGround) {
            this.player1.vy = this.jumpPower;
            this.player1.onGround = false;
        }

        if (this.keys['ArrowUp'] && this.player2.onGround) {
            this.player2.vy = this.jumpPower;
            this.player2.onGround = false;
        }
    }

    updatePlayers() {
        // Update player 1 (top world)
        this.player1.vy += this.gravity;
        this.player1.x += this.player1.vx;
        this.player1.y += this.player1.vy;

        // Update player 2 (bottom world)
        this.player2.vy += this.gravity;
        this.player2.x += this.player2.vx;
        this.player2.y += this.player2.vy;

        // Keep players in bounds
        this.player1.x = Math.max(0, Math.min(this.canvasWidth - this.player1.width, this.player1.x));
        this.player2.x = Math.max(0, Math.min(this.canvasWidth - this.player2.width, this.player2.x));

        // Check platform collisions for player 1
        this.player1.onGround = false;
        for (let platform of this.currentLevelData.platforms) {
            if (platform.y < this.worldHeight) { // Top world platforms
                if (this.checkCollision(this.player1, platform)) {
                    if (this.player1.vy > 0 && this.player1.y < platform.y) {
                        this.player1.y = platform.y - this.player1.height;
                        this.player1.vy = 0;
                        this.player1.onGround = true;
                    }
                }
            }
        }

        // Check platform collisions for player 2
        this.player2.onGround = false;
        for (let platform of this.currentLevelData.platforms) {
            if (platform.y >= this.worldHeight) { // Bottom world platforms
                if (this.checkCollision(this.player2, platform)) {
                    if (this.player2.vy > 0 && this.player2.y < platform.y) {
                        this.player2.y = platform.y - this.player2.height;
                        this.player2.vy = 0;
                        this.player2.onGround = true;
                    }
                }
            }
        }
    }

    checkCollisions() {
        // Check obstacle collisions
        for (let obstacle of this.currentLevelData.obstacles) {
            if (obstacle.y < this.worldHeight) { // Top world obstacles
                if (this.checkCollision(this.player1, obstacle)) {
                    this.gameOver();
                    return;
                }
            } else { // Bottom world obstacles
                if (this.checkCollision(this.player2, obstacle)) {
                    this.gameOver();
                    return;
                }
            }
        }

        // Check if players fell off the world
        if (this.player1.y > this.worldHeight || this.player2.y > this.canvasHeight) {
            this.gameOver();
            return;
        }
    }

    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

    checkWinCondition() {
        const exit1 = this.currentLevelData.exit1;
        const exit2 = this.currentLevelData.exit2;

        // Player 1 must reach exit1 (top world), Player 2 must reach exit2 (bottom world)
        const player1AtExit = this.checkCollision(this.player1, exit1);
        const player2AtExit = this.checkCollision(this.player2, exit2);

        if (player1AtExit && player2AtExit && !this.transitionState.active) {
            this.startLevelTransition();
        }
    }

    startLevelTransition() {
        this.transitionState.active = true;
        this.transitionState.startTime = Date.now();
        this.transitionState.progress = 0;
        this.transitionState.portalParticles = [];
        this.transitionState.screenFlash = 0;

        // Create explosion of portal particles
        for (let i = 0; i < 50; i++) {
            this.transitionState.portalParticles.push({
                x: this.player1.x + this.player1.width / 2,
                y: this.player1.y + this.player1.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: Math.random() * 100 + 50,
                color: ['#ffff00', '#ff00ff', '#00ffff', '#ffffff'][Math.floor(Math.random() * 4)],
                size: Math.random() * 4 + 2
            });
        }

        for (let i = 0; i < 50; i++) {
            this.transitionState.portalParticles.push({
                x: this.player2.x + this.player2.width / 2,
                y: this.player2.y + this.player2.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: Math.random() * 100 + 50,
                color: ['#ffff00', '#ff00ff', '#00ffff', '#ffffff'][Math.floor(Math.random() * 4)],
                size: Math.random() * 4 + 2
            });
        }
    }

    gameOver() {
        this.lives--;
        this.updateUI();

        if (this.lives <= 0) {
            this.gameState = 'gameOver';
            this.hideAllScreens();
            document.getElementById('gameOverScreen').classList.remove('hidden');
        } else {
            this.resetLevel();
        }
    }

    victory() {
        this.gameState = 'victory';
        this.hideAllScreens();
        document.getElementById('victoryLevel').textContent = this.currentLevel;
        document.getElementById('victoryScreen').classList.remove('hidden');
    }

    render() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, '#0a0a2a');   // Dark blue at top
        gradient.addColorStop(0.5, '#1a1a3a'); // Mid blue at center
        gradient.addColorStop(1, '#2a0a2a');   // Dark purple at bottom
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw animated background stars
        this.drawBackgroundStars();

        // Draw world separator with glow effect
        this.ctx.shadowColor = '#00ff00';
        this.ctx.shadowBlur = 10;
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.worldHeight);
        this.ctx.lineTo(this.canvasWidth, this.worldHeight);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Draw platforms with enhanced visuals
        for (let platform of this.currentLevelData.platforms) {
            if (platform.y >= this.worldHeight) {
                // Bottom world platforms (glitched)
                const glitchOffset = Math.random() > 0.9 ? (Math.random() - 0.5) * 4 : 0;

                // Draw platform with gradient
                const platformGradient = this.ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
                platformGradient.addColorStop(0, '#ff00ff');
                platformGradient.addColorStop(1, '#800080');
                this.ctx.fillStyle = platformGradient;
                this.ctx.fillRect(
                    platform.x + glitchOffset,
                    platform.y,
                    platform.width,
                    platform.height
                );

                // Add glow effect
                this.ctx.shadowColor = '#ff00ff';
                this.ctx.shadowBlur = 5;
                this.ctx.fillRect(
                    platform.x + glitchOffset,
                    platform.y,
                    platform.width,
                    platform.height
                );
                this.ctx.shadowBlur = 0;

                // Add glitch scanlines
                if (Math.random() > 0.8) {
                    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
                    this.ctx.fillRect(
                        platform.x,
                        platform.y + Math.random() * platform.height,
                        platform.width,
                        2
                    );
                }
            } else {
                // Top world platforms (normal)
                const platformGradient = this.ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
                platformGradient.addColorStop(0, '#00ff88');
                platformGradient.addColorStop(1, '#008844');
                this.ctx.fillStyle = platformGradient;
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

                // Add glow effect
                this.ctx.shadowColor = '#00ff88';
                this.ctx.shadowBlur = 5;
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                this.ctx.shadowBlur = 0;

                // Add highlight
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.fillRect(platform.x, platform.y, platform.width, 3);
            }
        }

        // Draw obstacles with enhanced visuals
        for (let obstacle of this.currentLevelData.obstacles) {
            if (obstacle.y >= this.worldHeight) {
                // Bottom world obstacles (glitched)
                const glitchOffset = Math.random() > 0.85 ? (Math.random() - 0.5) * 6 : 0;

                // Draw obstacle with gradient
                const obstacleGradient = this.ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
                obstacleGradient.addColorStop(0, '#ff4444');
                obstacleGradient.addColorStop(1, '#880000');
                this.ctx.fillStyle = obstacleGradient;
                this.ctx.fillRect(
                    obstacle.x + glitchOffset,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );

                // Add glow effect
                this.ctx.shadowColor = '#ff4444';
                this.ctx.shadowBlur = 8;
                this.ctx.fillRect(
                    obstacle.x + glitchOffset,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );
                this.ctx.shadowBlur = 0;

                // Add glitch color flicker
                if (Math.random() > 0.9) {
                    this.ctx.fillStyle = '#00ffff';
                    this.ctx.fillRect(
                        obstacle.x,
                        obstacle.y,
                        obstacle.width,
                        obstacle.height
                    );
                }
            } else {
                // Top world obstacles (normal)
                const obstacleGradient = this.ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
                obstacleGradient.addColorStop(0, '#ff6666');
                obstacleGradient.addColorStop(1, '#cc0000');
                this.ctx.fillStyle = obstacleGradient;
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                // Add glow effect
                this.ctx.shadowColor = '#ff6666';
                this.ctx.shadowBlur = 8;
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                this.ctx.shadowBlur = 0;

                // Add pulsing effect
                const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
                this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.5})`;
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        }

        // Draw exits with enhanced visuals
        const exit1 = this.currentLevelData.exit1;
        const exit2 = this.currentLevelData.exit2;
        const time = Date.now() * 0.001;

        // Top world exit (majestic portal)
        this.drawMajesticExit(exit1, time, false);

        // Bottom world exit (glitched portal)
        this.drawMajesticExit(exit2, time, true);

        // Add portal particles around exits
        this.drawPortalParticles(exit1, '#ffff00', false);
        this.drawPortalParticles(exit2, '#ff00ff', true);

        // Draw players with enhanced visuals
        this.drawEnhancedPlayer1();
        this.drawGlitchedPlayer();

        // Draw world labels with glow effects
        this.ctx.shadowColor = '#00ff00';
        this.ctx.shadowBlur = 8;
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '18px "Press Start 2P"';
        this.ctx.fillText('NORMAL WORLD', 10, 35);
        this.ctx.fillText('GLITCHED WORLD', 10, this.worldHeight + 35);
        this.ctx.shadowBlur = 0;

        // Add particle effects
        this.drawParticleEffects();

        // Add glitch effects to bottom world
        this.drawGlitchEffects();

        // Draw transition effects
        this.drawTransitionEffects();
    }

    drawTransitionEffects() {
        if (!this.transitionState.active) return;

        // Draw portal particles
        for (let particle of this.transitionState.portalParticles) {
            const alpha = particle.life / 150;
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = alpha;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
            this.ctx.shadowBlur = 0;
        }
        this.ctx.globalAlpha = 1;

        // Draw screen flash overlay
        if (this.transitionState.screenFlash > 0) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.transitionState.screenFlash * 0.8})`;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }

        // Draw dimensional rift effect
        const riftProgress = this.transitionState.progress;
        if (riftProgress > 0.2 && riftProgress < 0.8) {
            const riftIntensity = Math.sin(riftProgress * Math.PI * 4) * 0.5 + 0.5;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${riftIntensity * 0.6})`;
            this.ctx.lineWidth = 3;

            // Draw multiple rift lines
            for (let i = 0; i < 5; i++) {
                const y = this.canvasHeight * (0.2 + i * 0.15);
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvasWidth, y);
                this.ctx.stroke();
            }
        }

        // Draw level transition text
        if (riftProgress > 0.4 && riftProgress < 0.6) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 24px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = '#000000';
            this.ctx.shadowBlur = 10;
            this.ctx.fillText('DIMENSIONAL SHIFT', this.canvasWidth / 2, this.canvasHeight / 2 - 20);
            this.ctx.fillText(`LEVEL ${this.currentLevel + 1}`, this.canvasWidth / 2, this.canvasHeight / 2 + 20);
            this.ctx.shadowBlur = 0;
            this.ctx.textAlign = 'left';
        }
    }

    drawBackgroundStars() {
        const time = Date.now() * 0.001;

        for (let star of this.stars) {
            // Update star position
            star.y += star.speed;
            if (star.y > this.canvasHeight) {
                star.y = 0;
                star.x = Math.random() * this.canvasWidth;
            }

            // Calculate twinkle effect
            const twinkle = Math.sin(time + star.twinkle) * 0.5 + 0.5;
            const alpha = twinkle * 0.8 + 0.2;

            // Draw star
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);

            // Add glow for brighter stars
            if (star.size > 1.5) {
                this.ctx.shadowColor = '#ffffff';
                this.ctx.shadowBlur = 3;
                this.ctx.fillRect(star.x, star.y, star.size, star.size);
                this.ctx.shadowBlur = 0;
            }
        }
    }

    drawParticleEffects() {
        const time = Date.now() * 0.001;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Remove dead particles
            if (particle.life <= 0 || particle.x < 0 || particle.x > this.canvasWidth ||
                particle.y < 0 || particle.y > this.canvasHeight) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle with glow
            const alpha = particle.life / 150;
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 5;
            this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1;
        }

        // Add new particles occasionally
        if (Math.random() > 0.95 && this.particles.length < 30) {
            this.particles.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                life: Math.random() * 100 + 50,
                color: ['#00ffff', '#ff00ff', '#ffff00', '#ff8800'][Math.floor(Math.random() * 4)]
            });
        }
    }

    drawEnhancedPlayer1() {
        // Draw player 1 with gradient and glow
        const player1Gradient = this.ctx.createLinearGradient(
            this.player1.x, this.player1.y,
            this.player1.x + this.player1.width, this.player1.y + this.player1.height
        );
        player1Gradient.addColorStop(0, '#00ff88');
        player1Gradient.addColorStop(1, '#008844');
        this.ctx.fillStyle = player1Gradient;
        this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);

        // Add glow effect
        this.ctx.shadowColor = '#00ff88';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
        this.ctx.shadowBlur = 0;

        // Add highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fillRect(this.player1.x + 2, this.player1.y + 2, this.player1.width - 4, 3);

        // Add eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.player1.x + 4, this.player1.y + 4, 2, 2);
        this.ctx.fillRect(this.player1.x + 10, this.player1.y + 4, 2, 2);
    }

    drawGlitchedPlayer() {
        // Add glitch offset based on time
        const glitchOffset = Math.sin(Date.now() * 0.01) * 2;
        const glitchIntensity = Math.random() > 0.8 ? 3 : 0;

        // Draw main player with gradient
        const player2Gradient = this.ctx.createLinearGradient(
            this.player2.x, this.player2.y,
            this.player2.x + this.player2.width, this.player2.y + this.player2.height
        );
        player2Gradient.addColorStop(0, '#ff00ff');
        player2Gradient.addColorStop(1, '#800080');
        this.ctx.fillStyle = player2Gradient;
        this.ctx.fillRect(
            this.player2.x + glitchOffset,
            this.player2.y,
            this.player2.width,
            this.player2.height
        );

        // Add glow effect
        this.ctx.shadowColor = '#ff00ff';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(
            this.player2.x + glitchOffset,
            this.player2.y,
            this.player2.width,
            this.player2.height
        );
        this.ctx.shadowBlur = 0;

        // Add glitch scanlines
        if (Math.random() > 0.9) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(
                this.player2.x,
                this.player2.y + Math.random() * this.player2.height,
                this.player2.width,
                2
            );
        }

        // Add color glitch
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillRect(
                this.player2.x + glitchIntensity,
                this.player2.y,
                this.player2.width,
                this.player2.height
            );
        }

        // Add glitch eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.player2.x + 4, this.player2.y + 4, 2, 2);
        this.ctx.fillRect(this.player2.x + 10, this.player2.y + 4, 2, 2);
    }

    drawGlitchEffects() {
        const time = Date.now();

        // Add glitch scanlines to bottom world
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            if (Math.random() > 0.8) {
                const y = this.worldHeight + Math.random() * this.worldHeight;
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvasWidth, y);
                this.ctx.stroke();
            }
        }

        // Add random glitch rectangles
        if (Math.random() > 0.9) {
            this.ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
            this.ctx.fillRect(
                Math.random() * this.canvasWidth,
                this.worldHeight + Math.random() * this.worldHeight,
                Math.random() * 100 + 20,
                Math.random() * 20 + 5
            );
        }

        // Add glitch noise
        if (Math.random() > 0.85) {
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
            for (let i = 0; i < 10; i++) {
                this.ctx.fillRect(
                    Math.random() * this.canvasWidth,
                    this.worldHeight + Math.random() * this.worldHeight,
                    Math.random() * 5 + 1,
                    Math.random() * 5 + 1
                );
            }
        }

        // Add glitch text corruption
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = '#ff00ff';
            this.ctx.font = '12px "Press Start 2P"';
            this.ctx.fillText('ERROR', Math.random() * this.canvasWidth, this.worldHeight + Math.random() * 100 + 50);
        }

        // Add screen tearing effect
        if (Math.random() > 0.92) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            const tearY = this.worldHeight + Math.random() * this.worldHeight;
            const tearHeight = Math.random() * 10 + 5;
            this.ctx.fillRect(0, tearY, this.canvasWidth, tearHeight);
        }

        // Add color channel separation
        if (Math.random() > 0.88) {
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            this.ctx.fillRect(
                Math.random() * 10 - 5,
                this.worldHeight,
                this.canvasWidth,
                this.worldHeight
            );
        }

        // Add glitch border corruption
        if (Math.random() > 0.96) {
            this.ctx.strokeStyle = '#ff00ff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.worldHeight);
            this.ctx.lineTo(this.canvasWidth, this.worldHeight);
            this.ctx.stroke();
        }
    }

    drawMajesticExit(exit, time, isGlitched) {
        const centerX = exit.x + exit.width / 2;
        const centerY = exit.y + exit.height / 2;
        const radius = Math.max(exit.width, exit.height) / 2;

        // Draw outer glow ring
        this.ctx.shadowColor = isGlitched ? '#ff00ff' : '#ffff00';
        this.ctx.shadowBlur = 20;
        this.ctx.strokeStyle = isGlitched ? '#ff00ff' : '#ffff00';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Draw rotating inner ring
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(time * 2);
        this.ctx.strokeStyle = isGlitched ? '#00ffff' : '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius + 5, 0, Math.PI * 1.5);
        this.ctx.stroke();
        this.ctx.restore();

        // Draw counter-rotating ring
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(-time * 1.5);
        this.ctx.strokeStyle = isGlitched ? '#ff8800' : '#ffaa00';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius + 8, Math.PI * 0.5, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();

        // Draw main portal body with gradient
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        if (isGlitched) {
            gradient.addColorStop(0, '#ffff00');
            gradient.addColorStop(0.3, '#ff00ff');
            gradient.addColorStop(0.7, '#00ffff');
            gradient.addColorStop(1, '#800080');
        } else {
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#ffff00');
            gradient.addColorStop(0.7, '#ffaa00');
            gradient.addColorStop(1, '#ff6600');
        }
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(exit.x, exit.y, exit.width, exit.height);

        // Add pulsing center
        const pulse = Math.sin(time * 8) * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.9})`;
        this.ctx.fillRect(exit.x + 4, exit.y + 4, exit.width - 8, exit.height - 8);

        // Add glitch effects for bottom world
        if (isGlitched) {
            if (Math.random() > 0.85) {
                this.ctx.fillStyle = '#00ffff';
                this.ctx.fillRect(exit.x, exit.y, exit.width, exit.height);
            }
            if (Math.random() > 0.9) {
                this.ctx.fillStyle = '#ff00ff';
                this.ctx.fillRect(exit.x + 2, exit.y + 2, exit.width - 4, exit.height - 4);
            }
        }

        // Draw portal symbol
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('⚡', centerX, centerY + 6);
        this.ctx.textAlign = 'left';

        // Add floating energy orbs
        for (let i = 0; i < 3; i++) {
            const angle = time * 2 + (i * Math.PI * 2 / 3);
            const orbX = centerX + Math.cos(angle) * (radius + 15);
            const orbY = centerY + Math.sin(angle) * (radius + 15);
            const orbSize = Math.sin(time * 4 + i) * 2 + 4;

            this.ctx.fillStyle = isGlitched ? '#00ffff' : '#ffff00';
            this.ctx.shadowColor = isGlitched ? '#00ffff' : '#ffff00';
            this.ctx.shadowBlur = 8;
            this.ctx.beginPath();
            this.ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }

        // Add portal label with enhanced styling
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 8;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 14px "Press Start 2P"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PORTAL', centerX, exit.y - 15);
        this.ctx.shadowBlur = 0;
        this.ctx.textAlign = 'left';
    }

    drawPortalParticles(exit, color, isGlitched) {
        const centerX = exit.x + exit.width / 2;
        const centerY = exit.y + exit.height / 2;
        const time = Date.now() * 0.001;

        // Draw swirling particles
        for (let i = 0; i < 8; i++) {
            const angle = time * 3 + (i * Math.PI * 2 / 8);
            const distance = 25 + Math.sin(time * 5 + i) * 5;
            const particleX = centerX + Math.cos(angle) * distance;
            const particleY = centerY + Math.sin(angle) * distance;
            const size = Math.sin(time * 4 + i) * 1 + 2;

            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = Math.sin(time * 2 + i) * 0.5 + 0.5;
            this.ctx.fillRect(particleX - size / 2, particleY - size / 2, size, size);
        }
        this.ctx.globalAlpha = 1;

        // Add energy waves
        const waveCount = 3;
        for (let i = 0; i < waveCount; i++) {
            const waveRadius = 20 + Math.sin(time * 2 + i) * 10;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = Math.sin(time * 2 + i) * 0.3 + 0.1;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;

        // Add glitch particles for bottom world
        if (isGlitched && Math.random() > 0.8) {
            for (let i = 0; i < 5; i++) {
                const glitchX = centerX + (Math.random() - 0.5) * 40;
                const glitchY = centerY + (Math.random() - 0.5) * 40;
                this.ctx.fillStyle = '#00ffff';
                this.ctx.fillRect(glitchX, glitchY, 2, 2);
            }
        }
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});
