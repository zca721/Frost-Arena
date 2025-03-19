class Button {
    constructor(x, y, sprite, width, height, hoversprite, method) {
        Object.assign(this, {x, y, sprite, width, height, hoversprite, method});
        this.truesprite = sprite;

        // Visual state
        this.hovering = false;
        this.clicking = false;
        this.scale = 1;
        this.baseY = y;
        
        // Animation properties
        this.hoverScale = 1.05;
        this.clickScale = 0.95;
        this.scaleSpeed = 0.1;
        this.bobAmount = 3;
        this.bobSpeed = 0.003;
        
        // Particle effects
        this.particles = [];
        this.particleLimit = 20;
    }

    update() {
        // Check mouse interaction
        this.hovering = this.checkOverlap(gameEngine.mouse?.x, gameEngine.mouse?.y);
        this.truesprite = this.hovering ? this.hoversprite : this.sprite;

        // Handle click
        if (this.checkOverlap(gameEngine.click?.x, gameEngine.click?.y) && gameEngine.clickProcessed && this.hovering) {
            gameEngine.clickProcessed = false;
            this.clicking = true;
            this.method();
            
            // Add click particles
            this.addClickParticles();
            
            // Reset clicking state after animation
            setTimeout(() => this.clicking = false, 100);
        }

        // Update scale animation
        const targetScale = this.clicking ? this.clickScale : (this.hovering ? this.hoverScale : 1);
        this.scale += (targetScale - this.scale) * this.scaleSpeed;

        // Update floating animation
        this.y = this.baseY + Math.sin(Date.now() * this.bobSpeed) * this.bobAmount;

        // Update particles
        this.updateParticles();
    }

    draw(ctx) {
        ctx.save();

        // Apply scale transform
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-centerX, -centerY);

        // Draw button shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;

        // Draw the button
        ctx.drawImage(
            ASSET_MANAGER.getAsset(this.truesprite),
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Draw hover effect
        // if (this.hovering) {
        //     ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        //     ctx.lineWidth = 2;
        //     ctx.strokeRect(this.x, this.y, this.width, this.height);
        // }

        // Draw particles
        this.drawParticles(ctx);

        ctx.restore();
    }

    checkOverlap(x, y) {
        if (!x || !y) return false;
        
        const scaledWidth = this.width * this.scale;
        const scaledHeight = this.height * this.scale;
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        return x >= centerX - scaledWidth/2 && 
               x <= centerX + scaledWidth/2 && 
               y >= centerY - scaledHeight/2 && 
               y <= centerY + scaledHeight/2;
    }

    addClickParticles() {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 * i) / 10;
            const speed = 2 + Math.random() * 2;
            
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                size: 3 + Math.random() * 3,
                color: `hsl(${Math.random() * 360}, 70%, 70%)`
            });
        }
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles(ctx) {
        this.particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }
}