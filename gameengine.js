class GameEngine {
    constructor(options) {
        // Core properties
        this.ctx = null;
        this.entities = [];
        this.takenIDS = [];
        this.SelectedUnitGlobal = null;
        this.running = false;
        this.timestamp = 0;
        this.theTime = 0;
        
        // Input state
        this.click = null;
        this.clickProcessed = false;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.lastKey = null;
        
        // Performance optimizations
        this.frameTime = 0;
        this.minimumStepTime = 1000/60; // Cap at 60 FPS
        this.pauseWhenUnfocused = true;
        
        // Debug options
        this.options = options || {
            debugging: false,
            showFPS: false,
            showBounds: false
        };
        
        // Statistics
        this.fps = 0;
        this.frameCount = 0;
        this.lastFPSUpdate = 0;
    }

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.timestamp = 0;
    }

    start() {
        this.running = true;
        this.timestamp = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        // Mouse move handler
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        // Click handler
        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.clickProcessed = true;
            this.click = getXandY(e);
            e.preventDefault();
        });

        // Mouse wheel handler
        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault();
            this.wheel = e;
        });

        // Right click handler
        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault();
            this.rightclick = getXandY(e);
        });

        // Keyboard handlers
        document.addEventListener("keydown", e => {
            this.keys[e.key] = true;
            this.lastKey = e.key;
            if (this.options.debugging) console.log(`Key Down: ${e.key}`);
        });

        document.addEventListener("keyup", e => {
            this.keys[e.key] = false;
            if (this.options.debugging) console.log(`Key Up: ${e.key}`);
        });

        // Focus handlers
        if (this.pauseWhenUnfocused) {
            window.addEventListener('blur', () => {
                this.running = false;
            });

            window.addEventListener('focus', () => {
                this.running = true;
                this.timestamp = performance.now();
                this.loop();
            });
        }
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Sort entities by layer (if they have one)
        this.entities.sort((a, b) => (a.layer || 0) - (b.layer || 0));

        // Draw entities
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx, this);
        }

        // Draw debug info if enabled
        if (this.options.debugging) {
            this.drawDebugInfo();
        }
    }

    update() {
        // Update each entity
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
    
        // Update scene manager
        sceneManager.update();
    
        // Remove marked entities
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);
    
        // Update FPS counter
        this.frameCount++;
        if (performance.now() - this.lastFPSUpdate > 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFPSUpdate = performance.now();
        }
        
        // Check and cleanup dead units
        sceneManager.checkAndCleanupDeadUnits();
    }

    loop() {
        if (!this.running) return;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.timestamp;

        if (deltaTime >= this.minimumStepTime) {
            this.clockTick = this.timer.tick();
            this.theTime += this.timer.tick();
            this.update();
            this.draw();
            this.timestamp = currentTime;
        }

        requestAnimationFrame(this.loop.bind(this));
    }

    drawDebugInfo() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.font = '16px Arial';

        // Draw FPS
        const fps = `FPS: ${this.fps}`;
        this.ctx.strokeText(fps, 10, 20);
        this.ctx.fillText(fps, 10, 20);

        // Draw entity count
        const entityCount = `Entities: ${this.entities.length}`;
        this.ctx.strokeText(entityCount, 10, 40);
        this.ctx.fillText(entityCount, 10, 40);

        // Draw current scene
        const sceneText = `Scene: ${scene}`;
        this.ctx.strokeText(sceneText, 10, 60);
        this.ctx.fillText(sceneText, 10, 60);

        this.ctx.restore();
    }

    clearEntities() {
        this.entities = [];
    }
}
