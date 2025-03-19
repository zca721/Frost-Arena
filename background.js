class Background {
    constructor(x, y, sprite) {
        // Position
        Object.assign(this, {x, y, sprite});

        // Animation properties
        this.alpha = 0;
        this.fadeIn = true;
        this.fadeSpeed = 0.05;
    }

    update() {
        // Handle fade in/out animation
        if (this.fadeIn) {
            this.alpha = Math.min(1, this.alpha + this.fadeSpeed);
        } else {
            this.alpha = Math.max(0, this.alpha - this.fadeSpeed);
        }
    }

    draw(ctx) {
        // Save context state
        ctx.save();
        
        // Set transparency
        ctx.globalAlpha = this.alpha;

        // Draw background image scaled to canvas size
        const image = ASSET_MANAGER.getAsset(this.sprite);
        ctx.drawImage(
            image,
            this.x,
            this.y,
            ctx.canvas.width,
            ctx.canvas.height
        );

        // if (scene === "LoadedBattle") {
        //     // Battle scene effects
        //     ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        //     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //     // Draw dividing line
        //     ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        //     ctx.lineWidth = 3;
        //     ctx.beginPath();
        //     ctx.moveTo(ctx.canvas.width / 2, 0);
        //     ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
        //     ctx.stroke();
        // }

        // Restore context state
        ctx.restore();

        // Draw scene-specific HUD elements
        // this.drawHUD(ctx);
    }

    // drawHUD(ctx) {

    //     if (scene === "LoadedBattle") {
    //         // Battle phase indicator
    //         ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    //         ctx.font = "bold 32px Arial";
    //         ctx.textAlign = "center";
    //         ctx.fillText("BATTLE PHASE", ctx.canvas.width / 2, 50);
            
    //         // VS text
    //         ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
    //         ctx.font = "bold 48px Arial";
    //         ctx.fillText("VS", ctx.canvas.width / 2, ctx.canvas.height / 2);
    //     }

    //     // Reset text alignment
    //     ctx.textAlign = "left";
    // }
}

class MainMenuBackground {
    constructor(game, x, y) {
        this.game = game;
        this.x = 0;
        this.y = 0;

        this.snowyMainMenu = new Animator(ASSET_MANAGER.getAsset("./Backgrounds/MainMenuBackgroundSnowing.png"), 0, 0, 1920, 1080, 12, 0.1);
        
    }

    update() {

    }

    draw(ctx) {
        this.snowyMainMenu.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}

class ShopMenuBackground {
    constructor(game, x, y) {
        this.game = game;
        this.x = 0;
        this.y = 0;

        this.snowyShopMenu = new Animator(ASSET_MANAGER.getAsset("./Backgrounds/ShopMenuBackgroundSnowing.png"), 0, 0, 1920, 1080, 14, 0.1);
        
    }

    update() {

    }

    draw(ctx) {
        this.snowyShopMenu.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}

class BattleBackground {
    constructor(game, x, y) {
        this.game = game;
        this.x = 0;
        this.y = 0;

        this.snowyBattle = new Animator(ASSET_MANAGER.getAsset("./Backgrounds/BattleBackgroundSnowing.png"), 0, 0, 1920, 1080, 18, 0.1);
        
    }

    update() {

    }

    draw(ctx) {
        this.snowyBattle.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}