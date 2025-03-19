const WINS_THRESHOLD = 10;
const STARTING_GOLD = 11;
const STARTING_LIVES = 5;
const BUY_COST = 3;
const UPGRADE_COST = 5;
const ROLL_COST = 1;
const SELL_PRICE = 1;
const BUTTON_TOGGLE = ["", "Pressed"];
class SceneManager {
    constructor() {

        // Game state
        this.lives = STARTING_LIVES;
        this.gold = STARTING_GOLD;
        this.roundsPassed = 0;
        this.index = 0;
        this.wins = 0;
        this.shopLevel = 1;
        this.currentRound = 1;
        this.activeTeam = [null, null, null, null, null];
        this.enemyTeam = [null, null, null, null, null];

        this.eventQueue = [];
        this.actionQueue = [];
        this.abilityQueue = [];
        this.sortingList = [];
        this.battleAnimationSpeed = 1;
        this.fastToggle = 0;
        this.autoToggle = 1;
        this.isNextApproved = true;
        this.activeProjectiles = 0;

        // Shop state
        this.goldDisplayer = new Display(20, 20, "./UI_Assets/CoinDisplay10.png", 131, 61);
        this.livesDisplayer = new Display(170, 20, "./UI_Assets/HealthDisplay5.png", 131, 61);
        this.winsDisplayer = new Display(320, 20, "./UI_Assets/WinDisplay0.png", 131, 61);
        this.currentRoundDisplayer = new Display(470, 20, "./UI_Assets/TurnDisplay1.png", 131, 61);
        this.shopSlots = [null, null, null];
        this.frozenSlots = [false, false, false];
        this.teamSlots = [null, null, null, null, null];
        this.selectedUnit = null;
        
        // Available monsters in pool
        this.monsterTypes = [
            "./Units/Unit1.png",
            "./Units/Unit2.png",
            "./Units/Unit3.png",
            "./Units/Unit4.png",
            "./Units/Unit5.png",
            "./Units/Unit6.png",
            "./Units/Unit7.png",
            "./Units/Unit8.png",
            "./Units/Unit9.png",
            "./Units/Unit10.png",
        ];

        this.uncommonMonsterTypes = [
            "./Units/Unit11.png",
            "./Units/Unit12.png",
            "./Units/Unit13.png",
            "./Units/Unit14.png",
            "./Units/Unit15.png",
            "./Units/Unit16.png",
            "./Units/Unit17.png",
            "./Units/Unit18.png",
            "./Units/Unit19.png",
            "./Units/Unit20.png",
        ];

        this.rareMonsterTypes = [
            "./Units/Unit21.png",
            "./Units/Unit22.png",
            "./Units/Unit23.png",
            "./Units/Unit24.png",
            "./Units/Unit25.png",
            "./Units/Unit26.png",
            "./Units/Unit27.png",
            "./Units/Unit28.png",
            "./Units/Unit29.png",
            "./Units/Unit30.png",
        ];

        this.superRareMonsterTypes = [
            "./Units/Unit31.png",
            "./Units/Unit32.png",
            "./Units/Unit33.png",
            "./Units/Unit34.png",
            "./Units/Unit35.png",
            "./Units/Unit36.png",
            "./Units/Unit37.png",
            "./Units/Unit38.png",
            "./Units/Unit39.png",
            "./Units/Unit40.png",
        ];

        this.epicMonsterTypes = [
            "./Units/Unit41.png",
            "./Units/Unit42.png",
            "./Units/Unit43.png",
            "./Units/Unit44.png",
            "./Units/Unit45.png",
            "./Units/Unit46.png",
            "./Units/Unit47.png",
            "./Units/Unit48.png",
            "./Units/Unit49.png",
            "./Units/Unit50.png",
        ];

        this.legendaryMonsterTypes = [
            "./Units/Unit51.png",
            "./Units/Unit52.png",
            "./Units/Unit53.png",
            "./Units/Unit54.png",
            "./Units/Unit55.png",
            "./Units/Unit56.png",
            "./Units/Unit57.png",
            "./Units/Unit58.png",
            "./Units/Unit59.png",
            "./Units/Unit60.png",
        ];


        // Shop coordinates
        this.shopPositions = [
            {x: 280, y: 650},
            {x: 480, y: 650},
            {x: 680, y: 650}
        ];

        // Team positions
        this.teamPositions = [
            {x: 1080, y: 300},
            {x: 880, y: 300},
            {x: 680, y: 300},
            {x: 480, y: 300},
            {x: 280, y: 300}
        ];

        this.battlePositionsPlayer = [
            {x: 750, y: 680},
            {x: 600, y: 680},
            {x: 450, y: 680},
            {x: 300, y: 680},
            {x: 150, y: 680}
        ];
    
        this.battlePositionsEnemy = [
            {x: 1000, y: 680},
            {x: 1150, y: 680},
            {x: 1300, y: 680},
            {x: 1450, y: 680},
            {x: 1600, y: 680}
        ];

        // Dragging state
        this.draggedUnit = null;
        this.dragStartSlot = null;
    }

    update() {
        
        if (scene === "Shop") {
            SOUND_ENGINE.updateScene("MainMenu");
            this.clearEntities();
            this.setupShop();
            scene = "LoadedShop";
        } else if (scene === "UpgradeShop") {
            this.clearEntities();
            this.upgradeShop();
            scene = "LoadedUpgradeShop";
        } else if (scene === "Battle") {
            SOUND_ENGINE.updateScene("Battle");
            this.clearEntities();
            this.startBattle();
            scene = "LoadedBattle";
        } else if (scene === "LoadedBattle") {
            this.executeBattle(this.activeTeam, this.enemyTeam);
        } else if (scene === "LoadedShop") {
            // console.log("Gold: " + this.gold);
            // console.log("Lives: " + this.lives);
            // console.log("Wins: " + this.wins);
            // console.log("Current Round: " + this.currentRound);
            this.goldDisplayer.sprite = `./UI_Assets/CoinDisplay${this.gold}.png`;
            this.livesDisplayer.sprite = `./UI_Assets/HealthDisplay${this.lives}.png`;
            this.winsDisplayer.sprite = `./UI_Assets/WinDisplay${this.wins}.png`;
            this.currentRoundDisplayer.sprite = `./UI_Assets/TurnDisplay${this.currentRound}.png`;
        } else if (scene === "End") {
            this.clearEntities();
            this.endGame();
        } else if (scene === "Tutorial") {
            this.clearEntities();
            this.setupTutorial();
            scene = "LoadedTutorial";
        }
    
        // Handle dragging
        if (gameEngine.click) {
            this.handleClick(gameEngine.click.x, gameEngine.click.y);
            
        }
    
        if (gameEngine.mouse) {
            this.handleMouseMove(gameEngine.mouse.x, gameEngine.mouse.y);
        }
    }

    upgradeShop() {
        gameEngine.addEntity(new Background(0, 0, "./Backgrounds/MountainBackground.png"));
        gameEngine.addEntity(new Display(463, 200, "./UI_Assets/UpgradeShop.png", 994, 238));
        this.shopLevel++;

        setTimeout(function() {
            gameEngine.addEntity(new Button(790, 900, "./UI_Assets/UpgradeButton1.png", 360, 100, "./UI_Assets/UpgradeButton2.png", () => {
                SOUND_ENGINE.playSFX("anvil");
                scene = "Shop";
            }));
          }, 1500);
    }

    roundWin() {
        SOUND_ENGINE.playSFX("wonround");
        SOUND_ENGINE.fadeOut(1500);
        this.endRound();
        gameEngine.addEntity(new Display(580, 200, "./UI_Assets/WinRound.png", 800, 160));
        //
        for (let i = 0; i < WINS_THRESHOLD; i++)
            gameEngine.addEntity(new Display(415 + 110 * i, 500, "./UI_Assets/WinPlaceHolder.png", 100, 100));
        let x = 415;
        for (let i = 1; i < this.wins; i++) {
            gameEngine.addEntity(new Display(x , 500, "./UI_Assets/Win.png", 100, 100));
            x += 110;
        }
        setTimeout(function() {
            gameEngine.addEntity(new Display(x, 500, "./UI_Assets/Win.png", 100, 100));
          }, 1000);
    }

    roundLose() {
        SOUND_ENGINE.fadeOut(1500);
        this.endRound();
        gameEngine.addEntity(new Display(580, 200, "./UI_Assets/LoseRound.png", 800, 160));

        for (let i = 0; i <= this.lives;i++) 
            gameEngine.addEntity(new Display((920 - 124 * this.lives) + 224 * i, 500, "./UI_Assets/HealthHeart.png", 200, 200));
        setTimeout(function() {
            gameEngine.entities.pop();
          }, 1000);
        setTimeout(function() {
        SOUND_ENGINE.playSFX("Glass");
        }, 1000);
    }

    roundDraw() {
        SOUND_ENGINE.fadeOut(1500);
        this.endRound();
        gameEngine.addEntity(new Display(535, 200, "./UI_Assets/DrawRound.png", 850, 160));
        gameEngine.addEntity(new Display(755, 400, "./UI_Assets/DrawDisplay.png", 400, 400));
    }

    endRound() {
        this.clearEntities();
        gameEngine.addEntity(new Background(0, 0, "./Backgrounds/MountainBackground.png"));
        if (((this.currentRound-1) % 2 === 0) && this.shopLevel<4) {
            setTimeout(function() {
                gameEngine.addEntity(new Button(760, 900, "./UI_Assets/NextTurnButton1.png",
                                                400, 100, "./UI_Assets/NextTurnButton2.png", () => {
                    scene = "UpgradeShop";
                }));
              }, 1500);
        } else {
            setTimeout(function() {
                gameEngine.addEntity(new Button(760, 900, "./UI_Assets/NextTurnButton1.png",
                                                400, 100, "./UI_Assets/NextTurnButton2.png", () => {
                    scene = "Shop";
                }));
            }, 1500);
        }
    }

    endGame() {
        scene = "End Game";
        gameEngine.addEntity(new Background(0, 0, "./Backgrounds/MountainBackground.png"));

        gameState.inGame = false;
        setTimeout(function() {
            gameEngine.addEntity(new Button(722, 900, "./UI_Assets/NewAdventure1.png",
                                            476, 100, "./UI_Assets/NewAdventure2.png", () => { 
                scene = "Shop";
                gameState.inGame = true;
        }));
          }, 1500);

        if (this.wins >= WINS_THRESHOLD) {
            SOUND_ENGINE.fadeOut(1500);
            gameEngine.addEntity(new Display(1405, 500, "./UI_Assets/WinPlaceHolder.png", 100, 100));
            gameEngine.addEntity(new Display(625, 200, "./UI_Assets/WinGame.png", 710, 160));
            for (let i = 0; i < WINS_THRESHOLD; i++)
                gameEngine.addEntity(new Display(415 + 110 * i, 500, "./UI_Assets/Win.png", 100, 100));
            setTimeout(function() {
                gameEngine.addEntity(new Display(1405, 500, "./UI_Assets/Win.png", 100, 100));
              }, 1000);
              setTimeout(function() {
                SOUND_ENGINE.playSFX("wongame"); 
              }, 1000);
            //console.log("You Win!");
        }
        else if (this.lives <= 0) {
            SOUND_ENGINE.fadeOut(1500);
            gameEngine.addEntity(new Display(620, 200, "./UI_Assets/LoseGame.png", 720, 160));
            gameEngine.addEntity(new Display(860, 500, "./UI_Assets/HealthHeart.png", 200, 200));
            setTimeout(function() {
                gameEngine.entities.pop();
              }, 1000);
              setTimeout(function() {
                SOUND_ENGINE.playSFX("lostgame"); 
              }, 1000);

            
            //console.log("You Lose!");
        }
        this.lives = STARTING_LIVES;
        this.gold = STARTING_GOLD;
        this.index = 0;
        this.wins = 0;
        this.shopLevel = 1;
        this.currentRound = 1;
        this.frozenSlots = [false, false, false];
        this.teamSlots = [null, null, null, null, null];
        this.selectedUnit = null;
    }

    setupShop() {
        // Add background
        gameEngine.addEntity(new ShopMenuBackground(gameEngine));

        // Unit platforms
        // Shop positions
        gameEngine.addEntity(new DisplayStill(240, 665, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(440, 665, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(640, 665, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        // Team positions
        gameEngine.addEntity(new DisplayStill(1040, 315, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(840, 315, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(640, 315, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(440, 315, "./UI_Assets/UnitPlatformSnow.png", 200, 200));
        gameEngine.addEntity(new DisplayStill(240, 315, "./UI_Assets/UnitPlatformSnow.png", 200, 200));

        // Add info display
        gameEngine.addEntity(this.goldDisplayer);

        gameEngine.addEntity(this.livesDisplayer);

        gameEngine.addEntity(this.winsDisplayer);

        gameEngine.addEntity(this.currentRoundDisplayer);

        // Add buttons
        gameEngine.addEntity(new Button(60, 920, "./UI_Assets/RollButton1.png", 200, 100, "./UI_Assets/RollButton2.png", () => {
            this.rollShop();
            SOUND_ENGINE.playSFX("dice");
        }));

        gameEngine.addEntity(new Button(680, 920, "./UI_Assets/SellButton1.png", 200, 100, "./UI_Assets/SellButton2.png", () => {
            if (!(gameEngine.SelectedUnitGlobal==null) && this.teamSlots.includes(this.selectedUnit)) {
                this.gold = Math.min(20, this.gold+SELL_PRICE);
                this.index = this.teamSlots.indexOf(this.selectedUnit);
                this.selectedUnit.x = gameEngine.ctx.canvas.width;
                this.selectedUnit.y = gameEngine.ctx.canvas.height;
                this.teamSlots[this.index] = null;
                gameEngine.SelectedUnitGlobal = null;
                this.selectedUnit = null;
                SOUND_ENGINE.playSFX("sell");
            }
        }));

        gameEngine.addEntity(new Button(270, 920, "./UI_Assets/PurchaseButton1.png", 400, 100, "./UI_Assets/PurchaseButton2.png", () => {
            //console.log(gameEngine.SelectedUnitGlobal);
            //console.log(this.teamSlots.includes(null));
            //console.log(this.gold);
            //console.log(this.teamSlots);
            //console.log(this.selectedUnit);
            if (this.gold >= BUY_COST && !(gameEngine.SelectedUnitGlobal==null) && (this.teamSlots.includes(null))
                && this.selectedUnit && (this.shopSlots.includes(this.selectedUnit))) {
                this.gold -= BUY_COST;
                this.index = this.teamSlots.indexOf(null);
                this.selectedUnit.isInShop = false;
                this.selectedUnit.moveTo(this.teamPositions[this.index].x, this.teamPositions[this.index].y);
                this.teamSlots[this.index] = this.selectedUnit;
                this.index2 = this.shopSlots.indexOf(this.selectedUnit);
                this.shopSlots[this.index2] = null;
                gameEngine.SelectedUnitGlobal = null;
                this.selectedUnit = null;
                SOUND_ENGINE.playSFX("purchase");
            }
        }));

        gameEngine.addEntity(new Button(890, 920, "./UI_Assets/UpgradeButton1.png", 360, 100, "./UI_Assets/UpgradeButton2.png", () => {
            //console.log(gameEngine.SelectedUnitGlobal);
            //console.log(this.teamSlots.includes(null));
            //console.log(this.gold);
            //console.log(this.teamSlots);
            //console.log(this.selectedUnit);
            if (this.gold >= UPGRADE_COST && !(gameEngine.SelectedUnitGlobal==null)
                && this.teamSlots.includes(this.selectedUnit) && this.selectedUnit.level < 4) {
                this.gold -= UPGRADE_COST;
                this.selectedUnit.levelUp();
                SOUND_ENGINE.playSFX("upgrade");
                gameEngine.SelectedUnitGlobal = null;
                this.selectedUnit = null;
                //console.log("Up grade team unit")
            }
        }));

        gameEngine.addEntity(new Button(1460, 920, "./UI_Assets/EndTurnButton1.png", 400, 100, "./UI_Assets/EndTurnButton2.png", () => {
            scene = "Battle";
            gameEngine.SelectedUnitGlobal = null;
            this.selectedUnit = null;
        }));


        for (let i = 0; i < 4; i++) {
            gameEngine.addEntity(new Button(990-200*i, 400, "./UI_Assets/SwapButton1.png", 106, 51, "./UI_Assets/SwapButton2.png", () => {
                this.teamSlots[i]?.moveTo(this.teamPositions[i+1].x, this.teamPositions[i+1].y);
                this.teamSlots[i+1]?.moveTo(this.teamPositions[i].x, this.teamPositions[i].y);
                let temp1 = this.teamSlots[i];
                this.teamSlots[i] = this.teamSlots[i+1];
                this.teamSlots[i+1] = temp1;
            }));
        }

        // Initialize shop if empty
        this.rollShop();

        // Add existing units to display
        this.updateUnitDisplay();
    }

    rollShop() {
        let usedTypes = [...this.monsterTypes];

        if (this.shopLevel > 1) { usedTypes = usedTypes.concat(this.uncommonMonsterTypes);}
        if (this.shopLevel > 2) { usedTypes = usedTypes.concat(this.rareMonsterTypes);}
        if (this.shopLevel > 3) { usedTypes = usedTypes.concat(this.superRareMonsterTypes);}
        //if (this.shopLevel > 4) { usedTypes = usedTypes.concat(this.epicMonsterTypes);}
        //if (this.shopLevel > 5) { usedTypes = usedTypes.concat(this.legendaryMonsterTypes);}

        if (this.gold >= ROLL_COST) {
            this.gold -= ROLL_COST;
            
            for (let i = 0; i < this.shopSlots.length; i++) {
                if (!this.frozenSlots[i]) {


                    const type = usedTypes[Math.floor(Math.random() * usedTypes.length)];
                    const stats = {
                        attack: Math.floor(Math.random() * 2) + 1,
                        health: Math.floor(Math.random() * 2) + 2

                        // God mode for testing, uncomment to use
                        // attack: 50,
                        // health: 50
                    };
                    
                    this.shopSlots[i] = new Unit(
                        this.shopPositions[i].x,
                        this.shopPositions[i].y,
                        type,
                        stats,
                        true
                    );
                }
            }
            this.updateUnitDisplay();
        }
        //console.log(this.gold);
    }

    updateUnitDisplay() {
        // Clear existing units
        gameEngine.entities = gameEngine.entities.filter(entity => !(entity instanceof Unit));

        // Add shop units
        this.shopSlots.forEach((unit, i) => {
            if (unit) {
                gameEngine.addEntity(unit);
            }
        });

        // Add team units
        this.teamSlots.forEach((unit, i) => {
            if (unit) {
                unit.health = unit.maxHealth;
                gameEngine.addEntity(unit);
            }
        });
    }

    handleClick(x, y) {
        // Check shop slots
        for (let i = 0; i < this.shopSlots.length; i++) {
            const unit = this.shopSlots[i];
            if (unit && this.isClickInUnit(x, y, unit)) {
                if (unit.isInShop && gameEngine.SelectedUnitGlobal != unit.ID) {
                    gameEngine.SelectedUnitGlobal = unit.ID;
                    this.selectedUnit = unit;
                }
            }
        }

        // Check team slots
        for (let i = 0; i < this.teamSlots.length; i++) {
            const unit = this.teamSlots[i];
           //if (unit == null) break; add once we implement auto move units to front if empty space available
            if (unit && this.isClickInUnit(x, y, unit)) {
                if (gameEngine.SelectedUnitGlobal != unit.ID) {
                    gameEngine.SelectedUnitGlobal = unit.ID;
                    this.selectedUnit = unit;
                    //console.log("Selected team unit");
                }
            }
        }
    }

    handleMouseMove(x, y) {
        // Update hover states
        [...this.shopSlots, ...this.teamSlots].forEach(unit => {
            if (unit) {
                unit.isHovered = this.isClickInUnit(x, y, unit);
                
                //add ability text bubble
            }
        });
    }

    isClickInUnit(x, y, unit) {
        return x >= unit.x && x <= unit.x + unit.width &&
               y >= unit.y && y <= unit.y + unit.height;
    }
    
    findTargetSlot(x, y) {
        // Check team slots
        for (let i = 0; i < this.teamPositions.length; i++) {
            const pos = this.teamPositions[i];
            if (x >= pos.x && x <= pos.x + 128 &&
                y >= pos.y && y <= pos.y + 128) {
                return {type: 'team', index: i};
            }
        }

        // Check shop slots
        for (let i = 0; i < this.shopPositions.length; i++) {
            const pos = this.shopPositions[i];
            if (x >= pos.x && x <= pos.x + 128 &&
                y >= pos.y && y <= pos.y + 128) {
                return {type: 'shop', index: i};
            }
        }
        return null;
    }

    startBattle() {
        this.roundsPassed = 0;
        this.eventQueue = ["SB.N"];
        this.abilityQueue = [];
        this.actionQueue = [];
        this.deadEnemies = [];
        this.deadAllies = [];
        
        // Add background
        gameEngine.addEntity(new BattleBackground(gameEngine));
        
        // Generate enemy team
        this.enemyTeam = this.generateEnemyTeam();
        
        // Create a deep copy of team slots for battle
        this.activeTeam = this.teamSlots.filter(unit => unit !== null).map(unit => {
            const battleUnit = new Unit(unit.x, unit.y, unit.sprite, {
                attack: unit.attack,
                health: unit.health,
                maxHealth: unit.maxHealth,
                level: unit.level,
                rarity: unit.rarity
            });
            gameEngine.addEntity(battleUnit);
            return battleUnit;
        });

        // Adding abilities to the Ability Queue
        this.activeTeam.forEach((unit, i) => {
            let tempAbility = unit.ability;
            tempAbility.team = 0;
            tempAbility.CID = unit.ID;
            this.abilityQueue.push(tempAbility);
            this.sortingList.push(unit.attack);
        });
        this.enemyTeam.forEach((unit, i) => {
            let tempAbility = unit.ability;
            tempAbility.team = 1;
            tempAbility.CID = unit.ID;
            this.abilityQueue.push(tempAbility);
            this.sortingList.push(unit.attack);
        });
    
        // Position player team
        this.activeTeam.forEach((unit, i) => {
            unit.moveTo(this.battlePositionsPlayer[i].x, this.battlePositionsPlayer[i].y);
        });
    
        // Position enemy team
        this.enemyTeam.forEach((unit, i) => {
            unit.moveTo(this.battlePositionsEnemy[i].x, this.battlePositionsEnemy[i].y);
            unit.facingLeft = true;
            gameEngine.addEntity(unit);
        });
    
        gameEngine.addEntity(this.autoButton = new Button(760, 100, `./UI_Assets/AutoButton${BUTTON_TOGGLE[this.autoToggle]}1.png`,
                                                            100, 100, `./UI_Assets/AutoButton${BUTTON_TOGGLE[this.autoToggle]}2.png`, () => {
            this.autoToggle = (this.autoToggle+1)%2;
            this.isNextApproved = true;
            this.autoButton.sprite = `./UI_Assets/AutoButton${BUTTON_TOGGLE[this.autoToggle]}1.png`;
            this.autoButton.hoversprite = `./UI_Assets/AutoButton${BUTTON_TOGGLE[this.autoToggle]}2.png`;
            this.autoButton.truesprite = this.autoButton.sprite;
        }));
        gameEngine.addEntity(new Button(1060, 100, "./UI_Assets/NextButton1.png", 100, 100, "./UI_Assets/NextButton2.png", () => {
                this.isNextApproved = true;
        }));
        gameEngine.addEntity(this.fastButton = new Button(910, 100, `./UI_Assets/FastButton${BUTTON_TOGGLE[this.fastToggle]}1.png`, 
                                                            100, 100, `./UI_Assets/FastButton${BUTTON_TOGGLE[this.fastToggle]}2.png`, () => {
            this.battleAnimationSpeed = (this.battleAnimationSpeed % 2) + 1;
            this.activeTeam.forEach((unit) => unit.animator.battleAnimationSpeed = (unit.animator.battleAnimationSpeed % 2) + 1);
            this.enemyTeam.forEach((unit) => unit.animator.battleAnimationSpeed = (unit.animator.battleAnimationSpeed % 2) + 1);

            this.fastToggle = (this.fastToggle+1) % 2;
            this.fastButton.sprite = `./UI_Assets/FastButton${BUTTON_TOGGLE[this.fastToggle]}1.png`;
            this.fastButton.hoversprite = `./UI_Assets/FastButton${BUTTON_TOGGLE[this.fastToggle]}2.png`;
            this.fastButton.truesprite = this.fastButton.sprite;
        }));
        this.battleTimer = gameEngine.timestamp/10000 + 0.1;
        this.ParseEvents();
    }
    
    generateEnemyTeam() {
        // Decide how many units to create based on the current round
        const teamSize = this.currentRound === 1 ? 3 : 5;
        
        // Array to hold generated units
        const team = [];
        
        // Track which types we've already used to avoid duplicates
        let usedTypes = [...this.monsterTypes]; // Copy all available types

        if (this.shopLevel > 1) { usedTypes = usedTypes.concat(this.uncommonMonsterTypes);}
        if (this.shopLevel > 2) { usedTypes = usedTypes.concat(this.rareMonsterTypes);}
        if (this.shopLevel > 3) { usedTypes = usedTypes.concat(this.superRareMonsterTypes);}
        //if (this.shopLevel > 4) { usedTypes = usedTypes.concat(this.epicMonsterTypes);}
        //if (this.shopLevel > 5) { usedTypes = usedTypes.concat(this.legendaryMonsterTypes);}
        if (this.currentRound > 9) { usedTypes = usedTypes.concat(this.superRareMonsterTypes);}
        if (this.currentRound > 12) { usedTypes = usedTypes.concat(this.superRareMonsterTypes);}
        
        // Create each unit and assign stats
        for (let i = 0; i < teamSize; i++) {
            // Select a random type from remaining unused types
            const randomIndex = Math.floor(Math.random() * usedTypes.length);
            const type = usedTypes[randomIndex];
            
            // Remove the selected type from available types
            usedTypes.splice(randomIndex, 1);
            
            // Construct the unit with given stats
            const unit = new Unit(2000, 400, type, undefined, true);
            
            // Make the unit face left
            unit.facingLeft = true;
            // Set maximum health
            
            // Add the unit to the team
            team.push(unit);
        }
        
        // Return the final team
        return team;
    }
    
    executeBattle(playerTeam, enemyTeam) {
        // Only proceed if both teams have units
        if (playerTeam.length > 0 && enemyTeam.length > 0) {
            // Check if enough time has passed since last battle action
            if (this.battleTimer < (gameEngine.timestamp/10000) * this.battleAnimationSpeed) {
                // First check if there are any queued actions to process
                if (this.actionQueue.length > 0 && this.activeProjectiles === 0) {
                    let theAction = this.actionQueue.pop();
                    //console.log("attempting action " + theAction[0] + theAction[1]);
    
                    // Placeholder for animation
                    //console.log("Animate: " + theAction[6] + " going from " + theAction[5] + " to " + theAction[2]);
                    
                    // Determine the appropriate projectile type based on the visual effect
                    const projectileType = ProjectileManager.getProjectileTypeFromVisualEffect(theAction[6]);
                    
                    // Create projectile with callback for when it completes
                    this.activeProjectiles++;
                    const projectile = ProjectileManager.createProjectileAtPosition(
                        theAction[5].x + theAction[5].width/2, 
                        theAction[5].y + theAction[5].height/2, 
                        theAction[2].x + theAction[2].width/2, 
                        theAction[2].y + theAction[2].height/2, 
                        projectileType,
                        {
                            onHit: () => {
                                // Effect after animation completes
                                this.affectStat(theAction[0], theAction[1], theAction[2], theAction[3], theAction[4]);
                                
                                // Check for passive ability deaths after applying the action
                                if (theAction[2].health <= 0) {
                                    this.killUnit(theAction[2], true);
                                }
                                
                                this.activeProjectiles--;
                            }
                        }
                    );
                }
                // Then check if there are any events to parse (only if no projectiles are active)
                else if (this.eventQueue.length > 0 && this.activeProjectiles === 0) {
                    //console.log("parsing events" + this.eventQueue);
                    this.ParseEvents();
                } 
                // If no queued actions/events and no active projectiles, proceed with combat
                else if (this.isNextApproved && this.activeProjectiles === 0) {   

                    

                    //console.log("attempting attack");
                    const playerUnit = playerTeam[0];
                    const enemyUnit = enemyTeam[0];
        
                    // Check if units can start a new attack
                    if (!playerUnit.animator.isAttacking && !enemyUnit.animator.isAttacking) {
                        // Initialize attack animations for both units
                        playerUnit.animator.startAttack();
                        enemyUnit.animator.startAttack();
                    }
        
                    // Get current attack animation progress
                    const attackTime = playerUnit.animator.attackTime;
        
                    // Check if it's time to deal damage (75% through animation)
                    if (!playerUnit.animator.hasDealtDamage && attackTime >= 0.75) {
                        playerUnit.animator.hasDealtDamage = true;
                        enemyUnit.animator.hasDealtDamage = true;
                        SOUND_ENGINE.playSFX("hurt");
                    }
                    
                    // Check if attack sequence is complete
                    if (attackTime >= 1.0) {
                        if(this.autoToggle == 0) this.isNextApproved = false;
                        // Reset attack states
                        playerUnit.animator.isAttacking = false;
                        enemyUnit.animator.isAttacking = false;
                        playerUnit.x = playerUnit.animator.attackStartX;
                        enemyUnit.x = enemyUnit.animator.attackStartX;
                        
                        // Set timer for next battle action
                        this.battleTimer = gameEngine.timestamp/10000 + 0.1;
                        
                        // Apply damage to both units
                        
                        this.affectStat("HP", enemyUnit.attack*-1, playerUnit, this.activeTeam, this.battlePositionsPlayer);
                        this.affectStat("HP", playerUnit.attack*-1, enemyUnit, this.enemyTeam, this.battlePositionsEnemy);
                        
                        // Check for combat deaths
                        if (playerUnit.health <= 0) {
                            this.killUnit(playerUnit, false);
                        }
                        if (enemyUnit.health <= 0) {
                            this.killUnit(enemyUnit, false);
                        }
                        
                        // Queue attack events
                        this.eventQueue.unshift("A." + playerUnit.ID);
                        this.eventQueue.unshift("A." + enemyUnit.ID);

                        this.roundsPassed++;

                        console.log("Rounds: " + this.roundsPassed);
                        


                        // Deals damage to everyone after a set amount of turns to avoid infinite stalemates.
                        if (this.roundsPassed > 10) {
                            SOUND_ENGINE.playSFX("frost");
                            [...this.enemyTeam, ...this.activeTeam].forEach(unit => {
                                unit.health -= (this.roundsPassed - 10);
                                console.log("trying to reduce HP from blizzard");

                                const frostEffect = new FrostParticleManager(
                                    unit.x + unit.width / 2, 
                                    unit.y + unit.height / 2
                                );
                                gameEngine.addEntity(frostEffect);

                                if (unit.health <= 0) {
                                    this.killUnit(unit, false);
                                }
                            });
                        }
                    }
                }
            }
            
            // ADD THIS LINE - Check for units that have flown off screen and need star explosions
            this.checkAndCleanupDeadUnits();
        } 
        // If one team is empty, battle is over
        else {
            //reset battle animation
            this.battleAnimationSpeed = 1;
            this.activeTeam.forEach((unit) => unit.animator.battleAnimationSpeed = 1);
            this.enemyTeam.forEach((unit) => unit.animator.battleAnimationSpeed = 1);
            this.fastToggle = 0;
            // Handle victory conditions
            if (playerTeam.length > 0) {
                this.wins++;
                scene = "Win round";
                //console.log(scene);
            } else if (enemyTeam.length > 0) {
                this.lives--;
                scene = "Lose round";
            } else if (playerTeam.length === enemyTeam.length) {
                scene = "Draw round";
            }
        
            // Check if game is over or continue to next round
            if (this.wins >= WINS_THRESHOLD || this.lives <= 0) {
                scene = "End";
            } else {
                this.currentRound++;
                this.gold = STARTING_GOLD;

                //console.log("Current Round: " + this.currentRound)

                if (scene === "Win round") {
                    this.roundWin();
                } else if (scene === "Lose round") {
                    this.roundLose();
                } else if (scene === "Draw round") {
                    this.roundDraw();
                }
            }
        }
    }

    killUnit(unit, isPassiveDeath) {
        // Determine which team and positions to use for unit repositioning
        let tempTeam = null;
        let tempBattlePos = null;
    
        // Check if unit is from player team or enemy team
        if (this.activeTeam.includes(unit)) {
            this.deadAllies.push(unit);
            tempTeam = this.activeTeam;
            tempBattlePos = this.battlePositionsPlayer;
        } else {
            tempTeam = this.enemyTeam;
            this.deadEnemies.push(unit);
            tempBattlePos = this.battlePositionsEnemy;
        }
    
        // Add death event to queue for ability triggers
        this.eventQueue.unshift("D." + unit.ID);
        
    
        if (!isPassiveDeath) {
            // For combat deaths - start the launch animation
            console.log("death");
            
            unit.animator.startDeath();
        } else {
            // For passive ability deaths - create smoke puff effect
            SOUND_ENGINE.playSFX("puff");
            const deathEffect = new DeathParticleManager(
                unit.x + unit.width / 2, 
                unit.y + unit.height / 2
            );
            gameEngine.addEntity(deathEffect);
            
            // Remove unit immediately
            gameEngine.entities = gameEngine.entities.filter(entity => entity !== unit);
        }

        // Remove dead unit from queues
        this.removeFromQueues(unit.ID);
        
        // Remove unit from its team array
        const index = tempTeam.indexOf(unit);
        if (index > -1) {
            tempTeam.splice(index, 1);
        }
    
        // Move all remaining units forward to fill the gap
        tempTeam.forEach((unit, index) => {
            unit.moveTo(tempBattlePos[index].x, tempBattlePos[index].y);
        });
    }
    
    checkAndCleanupDeadUnits() {
        // Check each entity for dying units that have gone off screen
        gameEngine.entities.forEach(entity => {
            if (entity instanceof Unit && entity.animator.isDying && !entity.animator.hasTriggeredStars) {
                // Check if unit has gone far enough off screen
                if (entity.x < -100 || entity.x > gameEngine.ctx.canvas.width + 100 || 
                    entity.y > gameEngine.ctx.canvas.height + 100) {
                    
                    // Calculate edge position based on trajectory
                    let starX = entity.x;
                    let starY = entity.y;
                    
                    // Determine if unit is going left or right and calculate edge position
                    if (entity.animator.deathVelocityX < 0) {
                        // Left edge
                        starX = 0;
                        // Estimate Y position where it would hit the edge
                        starY = entity.y + entity.animator.deathVelocityY * 
                               (Math.abs(entity.x) / Math.abs(entity.animator.deathVelocityX));
                    } else {
                        // Right edge
                        starX = gameEngine.ctx.canvas.width;
                        // Estimate Y position where it would hit the edge
                        starY = entity.y + entity.animator.deathVelocityY * 
                               ((gameEngine.ctx.canvas.width - entity.x) / entity.animator.deathVelocityX);
                    }
                    
                    // Clamp Y to visible area
                    starY = Math.max(100, Math.min(starY, gameEngine.ctx.canvas.height - 100));
                    
                    // Create a single star explosion
                    const starEffect = new StarParticleManager(starX, starY);
                    gameEngine.addEntity(starEffect);
                    
                    // Mark unit for removal and set flag to prevent multiple explosions
                    entity.removeFromWorld = true;
                    entity.animator.hasTriggeredStars = true;
                    SOUND_ENGINE.playSFX("puff");
                }
            }
        });
        
        // Remove entities marked for removal
        gameEngine.entities = gameEngine.entities.filter(entity => !entity.removeFromWorld);
    }

    clearEntities() {
        gameEngine.entities = [];
    }

    ParseEvents() {
        //console.log("Events are being parsed");
        //console.log(this.eventQueue);

        while (this.eventQueue.length > 0) {
            this.currentEvent = this.eventQueue.pop();
            let eventInfo = this.currentEvent.split(".");
            for (let i = 0; i < this.abilityQueue.length; i++) {

                //console.log(this.abilityQueue[i]);

                // Checking every ability compared to the event and even triggerer to see if it should be applied
                if (this.abilityQueue[i].triggerCondition == eventInfo[0] &&
                     this.checkTriggerValidity(this.abilityQueue[i].whoTriggers, eventInfo[1], this.abilityQueue[i].team, this.abilityQueue[i].CID)) {
                        this.applyEffect(this.abilityQueue[i], eventInfo[1], this.abilityQueue[i].team, this.abilityQueue[i].CID);
                        //console.log("success");
                } else {
                    //console.log("failure");
                }
            }
        }
    }

    applyEffect(ability, eventTriggerer, team, owner) {
        let abilityInfo = ability.effect.split(".");
        //console.log(ability);
        let targets = ability.whoAffected.split(".");
        let tempWhoAffected = (targets[0]);
        targets = (targets[1]);
        let target = null;
        let theParty = null;
        let theBattlePositions = null;
        let ownerUnit = null;

        [...this.enemyTeam, ...this.activeTeam].forEach(unit => {
            if (unit.ID == owner) {
                ownerUnit = unit;
            }
        });
        if (ownerUnit == null) {
            //console.log("no owner found, aborting");
            return;
        }

        //console.log("Ability tried to find ID " + owner + " and it registered the owner as: " + ownerUnit);

        if (team == 0) {
            theParty = this.activeTeam;
            theBattlePositions = this.battlePositionsPlayer;
        } else {
            theParty = this.enemyTeam;
            theBattlePositions = this.battlePositionsEnemy;
        }

        let i = 0;
        let cap = 0
        let usedTargets = new Set();
        //console.log("targets: " + targets);

        while (i < targets && cap < 9999) {

            if (tempWhoAffected == "I") {
                target = ownerUnit;
            }

            if (tempWhoAffected == "T") {
                [...this.enemyTeam, ...this.activeTeam].forEach(unit => {
                    if (unit.ID == eventTriggerer) {
                        target = unit;
                    }
                });
            }
            
            
            if (team == 0) {
                if (tempWhoAffected == "RE") {
                    target = this.enemyTeam[Math.floor(Math.random() * this.enemyTeam.length)];
                }
                if (tempWhoAffected == "RA") {
                    target = this.activeTeam[Math.floor(Math.random() * this.activeTeam.length)];
                }
                if (tempWhoAffected == "FE") {
                    target = this.enemyTeam[0];
                }
                if (tempWhoAffected == "FA") {
                    target = this.activeTeam[0];
                }
                if (tempWhoAffected == "LE") {
                    target = this.enemyTeam[this.enemyTeam.length-1];
                }
                if (tempWhoAffected == "BA") {
                    let tempIndex = this.indexOfID(owner, this.activeTeam);
                    target = this.activeTeam[tempIndex+1];
                }
            }

            if (team == 1) {
                if (tempWhoAffected == "RE") {
                    target = this.activeTeam[Math.floor(Math.random() * this.activeTeam.length)];
                }
                if (tempWhoAffected == "RA") {
                    target = this.enemyTeam[Math.floor(Math.random() * this.enemyTeam.length)];
                }
                if (tempWhoAffected == "FE") {
                    target = this.activeTeam[0];
                }
                if (tempWhoAffected == "FA") {
                    target = this.enemyTeam[0];
                }
                if (tempWhoAffected == "LE") {
                    target = this.activeTeam[this.activeTeam.length-1];
                }
                if (tempWhoAffected == "BA") {
                    let tempIndex = this.indexOfID(owner, this.enemyTeam);
                    target = this.enemyTeam[tempIndex+1];
                }
            }

            if (target == null) {
                //console.log("no target found, aborting");
                return;
            }

            //console.log("target found "+ target);
            if (usedTargets.has(target)) {
                cap++;
            } else {
                // After finding the target and stats to be affected, the information is sent to this
                // queue to be processed after every ability is checked for an event.
                usedTargets.add(target);
                i++;
                this.actionQueue.unshift([abilityInfo[0], abilityInfo[1], target, theParty,
                    theBattlePositions, ownerUnit, ability.visualEffect]);
            }
        }
    }

    affectStat(stat, amount, unit, team, teampos) {
        // Log debug info about stat change
        //console.log("affecting stats" + stat + " " + amount + " " + unit);
     
        // Handle HP changes

        if (stat == "HO") {
            unit.health += Number(amount);
        }

        if (stat == "HP" || stat == "B") {
            // Apply HP change
            unit.health += Number(amount);
            
            // If unit took damage, add hurt event to queue
            if (Number(amount) < 0) {
                
                this.eventQueue.unshift("H." + unit.ID);
            }
        }
     
        // Handle Attack changes 
        if (stat == "AT" || stat == "B") {
            // Apply attack change, ensuring it doesn't go below 1
            unit.attack = Math.max(1, unit.attack + Number(amount));
        }
     }

    checkTriggerValidity(whoTriggers, TID, Team, Owner) {
        if (whoTriggers == "N") return true;
        if (whoTriggers == "I") return TID == Owner;

        // Team is ally
        if (Team == 0) {
            if (whoTriggers == "E") {
                return this.teamContainsID(TID, this.enemyTeam.concat(this.deadEnemies));
            }
            if (whoTriggers == "A") {
                return this.teamContainsID(TID, this.activeTeam.concat(this.deadAllies));
            }
            if (whoTriggers == "AA") {
                let tempIndex = this.indexOfID(TID, this.activeTeam);
                let tempIndex2 = this.indexOfID(Owner, this.activeTeam);
                return tempIndex == tempIndex2-1
            }
            
        }

      // Team is enemy
        if (Team == 1) {
            if (whoTriggers == "E") {
                return this.teamContainsID(TID, this.activeTeam.concat(this.deadAllies));
            }
            if (whoTriggers == "A") {
                return this.teamContainsID(TID, this.enemyTeam.concat(this.deadEnemies));
            }
            if (whoTriggers == "AA") {
                let tempIndex = this.indexOfID(TID, this.enemyTeam);
                let tempIndex2 = this.indexOfID(Owner, this.enemyTeam);
                return tempIndex == tempIndex2-1
            }
        }
    }

    teamContainsID(ID, team) { return team.some(e => e.ID == ID); }

    indexOfID(ID, team) {
        let ind = team.findIndex(e => e.ID == ID);
        if (ind == -1) ind = -99;
        return ind;
    }

    removeFromQueues(removeID) {
        this.actionQueue = this.actionQueue.filter(item => item[2].ID !== removeID && item[5].ID !== removeID);
        this.abilityQueue = this.abilityQueue.filter(item => item.CID !== removeID);
    }

    setupTutorial() {
        // Add background
        gameEngine.addEntity(new Background(0, 0, "./Backgrounds/SolidWhite.png"));
        
        // Create and store tutorial panels
        const tutorialPanels = new TutorialPanels();
        gameEngine.addEntity(tutorialPanels);
        
        // Add navigation buttons
        gameEngine.addEntity(new Button(1496, 920, "./UI_Assets/NextSlideButton1.png", 364, 100, "./UI_Assets/NextSlideButton2.png", () => { 
                tutorialPanels.nextPanel();
        }));

        gameEngine.addEntity(new Button(60, 920, "./UI_Assets/PrevSlideButton1.png", 364, 100, "./UI_Assets/PrevSlideButton2.png", () => { 
            tutorialPanels.prevPanel();
        }));
        
        // Add back button that refreshes the page
        gameEngine.addEntity(new Button(792, 920, "./UI_Assets/MainMenuButton1.png", 336, 100, "./UI_Assets/MainMenuButton2.png", () => { 
                window.location.reload();
        }));
    }
}
