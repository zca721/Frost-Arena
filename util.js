/** Global Constants */
const PARAMS = {
    DEBUG: false,
    SCALE: 1,
    BITWIDTH: 16,
    FRICTION: 0.9,
    GRAVITY: 0.5,
    CANVAS_DIMENSION: { WIDTH: 1920, HEIGHT: 1080 }
};

/** Utility Functions */
class Util {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static lerp(start, end, amt) {
        return start * (1 - amt) + end * amt;
    }

    static distance(point1, point2) {
        return Math.sqrt(
            Math.pow(point2.x - point1.x, 2) + 
            Math.pow(point2.y - point1.y, 2)
        );
    }

    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }

    static getMouseWorldPosition(gameEngine) {
        if (!gameEngine.mouse) return null;
        return {
            x: gameEngine.mouse.x / PARAMS.SCALE,
            y: gameEngine.mouse.y / PARAMS.SCALE
        };
    }

    static createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static drawHealthBar(ctx, x, y, width, height, percentage, color = 'red') {
        const border = 2;
        // Draw border
        ctx.fillStyle = 'black';
        ctx.fillRect(x - border, y - border, width + border * 2, height + border * 2);
        
        // Draw background
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, width, height);
        
        // Draw health
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width * Math.max(0, Math.min(percentage, 1)), height);
    }

    static drawText(ctx, text, x, y, options = {}) {
        const {
            fontSize = '16px',
            fontFamily = 'Arial',
            color = 'white',
            align = 'left',
            baseline = 'top',
            stroke = true,
            strokeColor = 'black',
            strokeWidth = 3
        } = options;

        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;

        if (stroke) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.strokeText(text, x, y);
        }

        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    static createGradient(ctx, x, y, width, height, colorStops) {
        const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
        colorStops.forEach(stop => {
            gradient.addColorStop(stop.offset, stop.color);
        });
        return gradient;
    }

    static pointInRect(point, rect) {
        return point.x >= rect.x && 
               point.x <= rect.x + rect.width && 
               point.y >= rect.y && 
               point.y <= rect.y + rect.height;
    }

    static rectIntersect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static async preloadImages(sources) {
        const promises = sources.map(src => Util.loadImage(src));
        return Promise.all(promises);
    }
}

/** Animation Helper Class */
class AnimationGroup {
    constructor() {
        this.animations = new Map();
    }

    add(name, frames, frameDuration = 0.1, loop = true) {
        this.animations.set(name, {
            frames,
            frameDuration,
            loop,
            currentFrame: 0,
            timer: 0
        });
    }

    update(deltaTime, animationName) {
        const anim = this.animations.get(animationName);
        if (!anim) return;

        anim.timer += deltaTime;
        if (anim.timer >= anim.frameDuration) {
            anim.timer = 0;
            anim.currentFrame++;
            if (anim.currentFrame >= anim.frames.length) {
                if (anim.loop) {
                    anim.currentFrame = 0;
                } else {
                    anim.currentFrame = anim.frames.length - 1;
                }
            }
        }
    }

    getCurrentFrame(animationName) {
        const anim = this.animations.get(animationName);
        return anim ? anim.frames[anim.currentFrame] : null;
    }

    reset(animationName) {
        const anim = this.animations.get(animationName);
        if (anim) {
            anim.currentFrame = 0;
            anim.timer = 0;
        }
    }
}