const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();
const SOUND_ENGINE = new SoundEngine();
let interactionDone = false;
const sceneManager = new SceneManager();

// Menu Assets
ASSET_MANAGER.queueDownload("./Backgrounds/MainMenuBackgroundSnowing.png");
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/FrostArena.png");

// Audio Assets
ASSET_MANAGER.queueDownload("./UI_Assets/AudioOn.png");
ASSET_MANAGER.queueDownload("./UI_Assets/AudioOff.png");
ASSET_MANAGER.queueAudioDownload("./Sounds/menuMusic2.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/kaching.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/Pyke.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/woosh.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/splat.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/flame.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/cannon.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/sell.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/dice.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/crit.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/puff.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/wing.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/dust.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/sparkle.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/upgrade.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/charge.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/Puncture.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/Glass.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/Winner.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/Loss.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/wonround.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/anvil.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/frost.wav");

// Shop Buttons
ASSET_MANAGER.queueDownload("./UI_Assets/RollButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/RollButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/EndTurnButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/EndTurnButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/PurchaseButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/PurchaseButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/SellButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/SellButton2.png");

// Shop Info Display
ASSET_MANAGER.queueDownload("./Backgrounds/ShopMenuBackgroundSnowing.png");
ASSET_MANAGER.queueDownload("./UI_Assets/UnitPlatformSnow.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay20.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay19.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay18.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay17.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay16.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay15.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay14.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay13.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay12.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay11.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay10.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay9.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay8.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay7.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay6.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay5.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay4.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay3.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/CoinDisplay0.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthDisplay5.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthDisplay4.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthDisplay3.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthDisplay2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthDisplay1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay10.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay9.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay8.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay7.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay6.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay5.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay4.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay3.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinDisplay0.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay20.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay19.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay18.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay17.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay16.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay15.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay14.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay13.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay12.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay11.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay10.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay9.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay8.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay7.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay6.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay5.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay4.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay3.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TurnDisplay1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/SwapButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/SwapButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/UpgradeButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/UpgradeButton2.png");

// Battle Scene
ASSET_MANAGER.queueDownload("./Backgrounds/BattleBackgroundSnowing.png");
ASSET_MANAGER.queueDownload("./UI_Assets/AutoButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/AutoButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/AutoButtonPressed1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/AutoButtonPressed2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/FastButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/FastButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/FastButtonPressed1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/FastButtonPressed2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextButton2.png");

// Monster Sprites
ASSET_MANAGER.queueDownload("./UI_Assets/Select.png");
for (let i = 1; i < 41; i++) {
    ASSET_MANAGER.queueDownload("./Units/Unit" + i + ".png");
}


// Win, Lose, Draw round
ASSET_MANAGER.queueDownload("./UI_Assets/WinRound.png");
ASSET_MANAGER.queueDownload("./UI_Assets/LoseRound.png");
ASSET_MANAGER.queueDownload("./UI_Assets/DrawRound.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextTurnButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextTurnButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/HealthHeart.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Win.png");
ASSET_MANAGER.queueDownload("./UI_Assets/WinPlaceHolder.png");
ASSET_MANAGER.queueDownload("./UI_Assets/DrawDisplay.png");
ASSET_MANAGER.queueDownload("./Backgrounds/SolidBlack.png");
ASSET_MANAGER.queueDownload("./Backgrounds/SolidWhite.png");
ASSET_MANAGER.queueDownload("./Backgrounds/MountainBackground.png");

// Win, Lose game
ASSET_MANAGER.queueDownload("./UI_Assets/WinGame.png");
ASSET_MANAGER.queueDownload("./UI_Assets/LoseGame.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NewAdventure1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NewAdventure2.png");

// Upgrade shop
ASSET_MANAGER.queueDownload("./UI_Assets/UpgradeShop.png");

// Projectiles
ASSET_MANAGER.queueDownload("./Projectiles/SnowBall.png");
ASSET_MANAGER.queueDownload("./Projectiles/IceShard.png");
ASSET_MANAGER.queueDownload("./Projectiles/Dagger.png");
ASSET_MANAGER.queueDownload("./Projectiles/FireBall.png");
ASSET_MANAGER.queueDownload("./Projectiles/Poison.png");
ASSET_MANAGER.queueDownload("./Projectiles/Arrow.png");
ASSET_MANAGER.queueDownload("./Projectiles/Magic.png");
ASSET_MANAGER.queueDownload("./Projectiles/HealOrb.png");
ASSET_MANAGER.queueDownload("./Projectiles/FrostBolt.png");
ASSET_MANAGER.queueDownload("./Projectiles/Star.png");
ASSET_MANAGER.queueDownload("./Projectiles/Snowflake.png");

// Tutorial assets
ASSET_MANAGER.queueDownload("./UI_Assets/TutorialButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/TutorialButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/MainMenuButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/MainMenuButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextSlideButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NextSlideButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/PrevSlideButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/PrevSlideButton2.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel1.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel2.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel3.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel4.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel5.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel6.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel7.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel8.png");
ASSET_MANAGER.queueDownload("./Tutorial/Panel9.png");


class GameState {
    constructor() {
        this.inGame = false;
        this.paused = false;
        this.gameOver = false;
    }
}

const gameState = new GameState();

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // Initialize scene and sound AFTER assets are loaded
    scene = "MainMenu";
    SOUND_ENGINE.updateScene("MainMenu");

    document.addEventListener('click', function onClick() {
        if (!interactionDone) {
            // Only run once when the user clicks
            //SOUND_ENGINE.audioEnabled = true;
            SOUND_ENGINE.toggleAudio();
    
            // Optionally, if you want the event listener to be removed after the first interaction
            document.removeEventListener('click', onClick);
        }
    });
   
    // Add UI elements
    gameEngine.addEntity(new MainMenuBackground(gameEngine));
    gameEngine.addEntity(new Display(580, 200, "./UI_Assets/FrostArena.png", 800, 200))
    gameEngine.addEntity(new Button(687, 800, "./UI_Assets/StartButton1.png", 546, 100, "./UI_Assets/StartButton2.png", () => { 
        scene = "Shop";
        gameState.inGame = true;
        // Trigger music on user interaction
        SOUND_ENGINE.updateScene("MainMenu");
    }));

    // Add tutorial button
    gameEngine.addEntity(new Button(809.5, 920, "./UI_Assets/TutorialButton1.png", 301, 100, "./UI_Assets/TutorialButton2.png", () => { 
        scene = "Tutorial";
    }));

    // Add audio button
    const audioButton = new Button(1750, 50, "./UI_Assets/AudioOn.png", 100, 100, "./UI_Assets/AudioOff.png", () => {
        SOUND_ENGINE.toggleAudio();
        if (audioButton.sprite === "./UI_Assets/AudioOff.png") {
            audioButton.sprite = "./UI_Assets/AudioOn.png";
            audioButton.hoversprite = "./UI_Assets/AudioOn.png";
        } else {
            audioButton.sprite = "./UI_Assets/AudioOff.png";
            audioButton.hoversprite = "./UI_Assets/AudioOff.png";
        }
        audioButton.truesprite = audioButton.sprite;
    });

    gameEngine.addEntity(audioButton);

    // Make sure audio starts muted
    // SOUND_ENGINE.toggleAudio();

    // Stats display
    class StatsDisplay {
        constructor() {
            this.x = 10;
            this.y = 30;
        }

        update() {}

        draw(ctx) {
            if (gameState.inGame) {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
                ctx.font = '24px Arial';

                // Draw stats with outline
                const stats = [
                    `Lives: ${sceneManager.lives}`,
                    `Gold: ${sceneManager.gold}`,
                    `Wins: ${sceneManager.wins}`,
                    `Round: ${sceneManager.currentRound}`
                ];

                stats.forEach((stat, i) => {
                    ctx.strokeText(stat, this.x, this.y + (i * 30));
                    ctx.fillText(stat, this.x, this.y + (i * 30));
                });
            }
        }
    }

    gameEngine.addEntity(new StatsDisplay());

    // Initialize game
    gameEngine.init(ctx);
    gameEngine.start();
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        gameState.paused = !gameState.paused;
    }
});

// Prevent right-click context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
