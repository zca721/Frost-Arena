class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
        this.timeScale = 1;
        
        // Animation timing
        this.animations = new Map();
        this.scheduledEvents = [];
        
        // Time controls
        this.paused = false;
        this.slowMotion = false;
        this.slowMotionScale = 0.5;
    }

    tick() {
        // Get current timestamp
        const current = performance.now();
        
        // Skip if paused
        if (this.paused) {
            this.lastTimestamp = current;
            return 0;
        }

        // Calculate delta time
        let delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        // Clamp maximum step
        if (delta > this.maxStep) {
            delta = this.maxStep;
        }

        // Apply time scale
        let scaledDelta = delta * this.timeScale;
        if (this.slowMotion) {
            scaledDelta *= this.slowMotionScale;
        }

        // Update game time
        this.gameTime += scaledDelta;

        // Process scheduled events
        this.processScheduledEvents();

        return scaledDelta;
    }

    schedule(callback, delay) {
        const event = {
            callback,
            triggerTime: this.gameTime + delay,
            executed: false
        };
        this.scheduledEvents.push(event);
        return event;
    }

    processScheduledEvents() {
        for (let i = this.scheduledEvents.length - 1; i >= 0; i--) {
            const event = this.scheduledEvents[i];
            if (!event.executed && this.gameTime >= event.triggerTime) {
                event.callback();
                event.executed = true;
                this.scheduledEvents.splice(i, 1);
            }
        }
    }

    startAnimation(name, duration, updateFn, completeFn = null) {
        const animation = {
            startTime: this.gameTime,
            duration: duration,
            update: updateFn,
            complete: completeFn,
            progress: 0
        };
        
        this.animations.set(name, animation);
    }

    updateAnimations() {
        this.animations.forEach((animation, name) => {
            const elapsed = this.gameTime - animation.startTime;
            animation.progress = Math.min(elapsed / animation.duration, 1);
            
            animation.update(animation.progress);
            
            if (animation.progress >= 1) {
                if (animation.complete) {
                    animation.complete();
                }
                this.animations.delete(name);
            }
        });
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this.lastTimestamp = performance.now();
    }

    toggleSlowMotion() {
        this.slowMotion = !this.slowMotion;
    }

    setTimeScale(scale) {
        this.timeScale = scale;
    }

    reset() {
        this.gameTime = 0;
        this.lastTimestamp = performance.now();
        this.animations.clear();
        this.scheduledEvents = [];
        this.paused = false;
        this.slowMotion = false;
        this.timeScale = 1;
    }

    getGameTime() {
        return this.gameTime;
    }
}