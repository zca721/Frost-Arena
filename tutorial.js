class TutorialPanels {
    constructor() {
        this.currentPanel = 1;
        this.totalPanels = 9;
        this.width = 1920;
        this.height = 1080;
        this.x = (1920 - this.width) / 2;
        this.y = 0;
    }
    
    update() {
        // No click handling needed here
    }
    
    draw(ctx) {
        // Just draw the current panel
        const panel = ASSET_MANAGER.getAsset(`./Tutorial/Panel${this.currentPanel}.png`);
        if (panel) {
            ctx.drawImage(panel, this.x, this.y, this.width, this.height);
            
            // Draw page number as text instead of using sprites
            ctx.font = "40px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(`Page ${this.currentPanel}/${this.totalPanels}`, this.x + this.width - 150, this.y + this.height + 50);
        }
    }
    
    nextPanel() {
        this.currentPanel = (this.currentPanel % this.totalPanels) + 1;
    }
    
    prevPanel() {
        this.currentPanel = this.currentPanel > 1 ? this.currentPanel - 1 : this.totalPanels;
    }
}
