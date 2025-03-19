class UnitAnimator {
    constructor(unit) {
        this.unit = unit;
    
        // Movement animation
        this.isAnimating = false;
        this.targetX = unit.x;
        this.targetY = unit.y;
        this.animationSpeed = 5;
        this.originalX = unit.x;
        this.originalY = unit.y;
    
        // Combat animation
        this.isAttacking = false;
        this.attackTime = 0;
        this.attackStartX = unit.x;
        this.hasDealtDamage = false;
        this.rotation = 0;
        this.battleAnimationSpeed = 1;
    
        // Shake effect properties
        this.shakeIntensity = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
    
        // Shop animations
        this.scale = 1;
        this.isDragging = false;
    
        // Death animation properties
        this.isDying = false;
        this.deathTime = 0;
        this.deathX = 0;
        this.deathY = 0;
        this.deathVelocityX = 0;
        this.deathVelocityY = 0;
        this.deathRotation = 0;
        this.gravity = 1;  // Controls arc trajectory steepness
        this.hasTriggeredStars = false;
    }


    update(clockTick) {
        // Handle death animation - needs to be first to override other animations
        if (this.isDying) {
            this.deathTime += (clockTick * this.battleAnimationSpeed);
            
            // Update velocity and position using physics
            this.deathVelocityY += this.gravity;  // Apply gravity
            this.deathX += this.deathVelocityX;   // Move horizontally
            this.deathY += this.deathVelocityY;   // Move vertically
            
            // Spin 720 degrees over 0.6 seconds (1200 degrees per second)
            this.deathRotation += (1200 * clockTick);
            
            // Update unit's actual position
            this.unit.x = this.deathX;
            this.unit.y = this.deathY;
            
            return; // Skip other animations when dying
        }
    
        // Handle shop movement and positioning
        if (this.isAnimating) {
            const dx = (this.targetX - this.unit.x) / this.animationSpeed;
            const dy = (this.targetY - this.unit.y) / this.animationSpeed;
            
            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                this.unit.x = this.targetX;
                this.unit.y = this.targetY;
                this.originalX = this.unit.x;
                this.originalY = this.unit.y;
                this.isAnimating = false;
                this.isDragging = false;
            } else {
                this.unit.x += dx;
                this.unit.y += dy;
                this.isDragging = true;
            }
        }
    
        // Handle attack animation
        if (this.isAttacking) {
            this.attackTime += (clockTick * this.battleAnimationSpeed);
    
            if (this.attackTime < 0.75) {
                const shakeProgress = Math.min(1, this.attackTime / 0.3);
                this.shakeIntensity = 4 * shakeProgress;
                this.shakeOffsetX = (Math.random() * 2 - 1) * this.shakeIntensity;
                this.shakeOffsetY = (Math.random() * 2 - 1) * this.shakeIntensity;
            } else {
                this.shakeIntensity = 0;
                this.shakeOffsetX = 0;
                this.shakeOffsetY = 0;
            }
    
            if (this.attackTime < 0.6) {
                const chargeProgress = this.attackTime / 0.6;
                const easeInRotation = chargeProgress < 0.2 ? 
                    Math.pow(chargeProgress * 5, 2) : 1;
                this.rotation = this.unit.facingLeft ? 
                    -30 * easeInRotation : 
                    30 * easeInRotation;
                this.unit.x = this.attackStartX;
            } 
            else if (this.attackTime < 0.75) {
                const lungeProgress = (this.attackTime - 0.6) / 0.15;
                const easeInOutLunge = lungeProgress < 0.5 ? 
                    4 * lungeProgress * lungeProgress * lungeProgress : 
                    1 - Math.pow(-2 * lungeProgress + 2, 3) / 2;
                
                const ATTACK_DISTANCE = 61;
                if (this.unit.facingLeft) {
                    this.unit.x = this.attackStartX - (ATTACK_DISTANCE * easeInOutLunge);
                    this.rotation = -30;
                } else {
                    this.unit.x = this.attackStartX + (ATTACK_DISTANCE * easeInOutLunge);
                    this.rotation = 30;
                }
            }
            else if (this.attackTime < 1.0) {
                const returnProgress = (this.attackTime - 0.75) / 0.25;
                const easeOutReturn = 1 - Math.pow(1 - returnProgress, 4);
                
                const ATTACK_DISTANCE = 61;
                if (this.unit.facingLeft) {
                    this.unit.x = (this.attackStartX - ATTACK_DISTANCE) + (ATTACK_DISTANCE * easeOutReturn);
                    this.rotation = -30 * (1 - easeOutReturn);
                } else {
                    this.unit.x = (this.attackStartX + ATTACK_DISTANCE) - (ATTACK_DISTANCE * easeOutReturn);
                    this.rotation = 30 * (1 - easeOutReturn);
                }
            }
        }
    
        // Handle hover/selection scaling
        if (this.unit.isHovered && this.scale < 1.1) {
            this.scale += 0.01;
        }
    
        if (this.unit.Selected && this.scale < 1.3) {
            this.scale += 0.03;
        }
    
        if ((!this.unit.isHovered && !this.unit.Selected) && this.scale > 1) {
            this.scale -= 0.01;
        }
    
        // Apply floating animation
        if (!this.isDragging) {
            this.unit.y = this.originalY + Math.sin(Date.now() / 500) * 5;
        }
    }

    startAttack() {
        this.isAttacking = true;
        this.attackTime = 0;
        this.attackStartX = this.unit.x;
        this.hasDealtDamage = false;
    }

    startDeath() {
        this.isDying = true;
        this.deathTime = 0;
        
        // Set initial position
        this.deathX = this.unit.x;
        this.deathY = this.unit.y;
        this.deathRotation = 0;
        
        // Set launch velocities - more dramatic for better effect
        this.deathVelocityY = -30;  // Initial upward velocity
        
        // Direction based on team with more force
        this.deathVelocityX = this.unit.facingLeft ? 30 : -30;
        
        // Add slight random variation to make deaths look unique
        this.deathVelocityX += (Math.random() - 0.5) * 10;
        this.deathVelocityY += (Math.random() - 0.5) * 10;
        
        // Higher gravity for faster arc
        this.gravity = 1.5;
    }

    moveTo(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.isAnimating = true;
    }

    getDrawPosition() {
        if (this.isDying) {
            return {
                x: this.unit.x,
                y: this.unit.y,
                rotation: this.deathRotation,
                scale: 1  // Maintain full size until star explosion
            };
        }
        
        return {
            x: this.unit.x + this.shakeOffsetX,
            y: this.unit.y + this.shakeOffsetY,
            rotation: this.rotation,
            scale: this.scale
        };
    }
    triggerStarExplosion() {
        // Create star explosion at the unit's current position
        const starEffect = new StarParticleManager(
            this.unit.x + this.unit.width / 2, 
            this.unit.y + this.unit.height / 2
        );
        gameEngine.addEntity(starEffect);
        
        // Mark the unit for removal
        this.unit.removeFromWorld = true;
    }
}
