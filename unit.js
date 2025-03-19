// unit.js
const MAX_LEVEL = 4;
class Unit {
    constructor(x, y, sprite, stats = {}, fresh) {
        this.newName();
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = 128; // Display at half size (256/2)
        this.height = 128;

        
        
        // Stats
        if (fresh) {
            this.name = "none";
            this.rarity = 0
            this.getStats(sprite, this.level);
        } else {
            this.attack = stats.attack || 2;
            this.health = stats.health || 2;
            this.rarity = stats.rarity;
        }
        this.maxHealth = this.health;
        this.level = stats.level || 1;
        this.type = sprite; // Use sprite path as type identifier
        this.animator = new UnitAnimator(this);
        this.Selected = false;
        // This will allow a unit to be purchased, and be randomized when rerolling
        this.isInShop = true;

        this.facingLeft = false;  // By default units face right
        
        // Visual effects
        this.isHovered = false;
        
        // Ability
        this.getAbility(sprite, this.level);
    }
    
    getAbility(sprite, level) {
        switch (sprite) {
            case "./Units/Unit1.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "RA.1", "HP.1", false, "BuffAlly", "Heal a random ally's HP by 1 when hurt.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "RA.2", "HP.1", false, "BuffAlly", "Heal 2 random allies' HP by 1 when hurt.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "RA.3", "HP.1", false, "BuffAlly", "Heal 3 random allies' HP by 1 when hurt.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "RA.4", "HP.1", false, "BuffAlly", "Heal 4 random allies' HP by 1 when hurt.");
                }
                break;
            case "./Units/Unit2.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "RE.1", "HP.-2", false, "Snowball", "Deal 2 damage to random enemy at the start of the battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "RE.1", "HP.-3", false, "Snowball", "Deal 3 damage to random enemy at the start of the battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "RE.1", "HP.-4", false, "Snowball", "Deal 4 damage to random enemy at the start of the battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RE.1", "HP.-2", false, "Snowball", "Deal 5 damage to random enemy at the start of the battle.");
                }
                break;
            case "./Units/Unit3.png":
                if (level == 1) {
                    this.ability = new Passive("A", "I", "RE.1", "HP.-1", false, "Snowball", "Deal 1 damage to a random enemy after attacking.");
                }
                if (level == 2) {
                    this.ability = new Passive("A", "I", "RE.2", "HP.-1", false, "Snowball", "Deal 1 damage to 2 random enemies after attacking.");
                }
                if (level == 3) {
                    this.ability = new Passive("A", "I", "RE.3", "HP.-1", false, "Snowball", "Deal 1 damage to 3 random enemies after attacking.");
                }
                if (level == 4) {
                    this.ability = new Passive("A", "I", "RE.4", "HP.-1", false, "Snowball", "Deal 1 damage to 4 random enemies after attacking.");
                }
                break;
            case "./Units/Unit4.png":
                if (level == 1) {
                    this.ability = new Passive("A", "AA", "I.1", "B.1", false, "BuffAlly", "When the ally ahead attacks, increase attack and hp by 1.");     
                }
                if (level == 2) {
                    this.ability = new Passive("A", "AA", "I.1", "B.2", false, "BuffAlly", "When the ally ahead attacks, increase attack and hp by 2.");                
                }
                if (level == 3) {
                    this.ability = new Passive("A", "AA", "I.1", "B.3", false, "BuffAlly", "When the ally ahead attacks, increase attack and hp by 3.");                  
                }
                if (level == 4) {
                    this.ability = new Passive("A", "AA", "I.1", "B.4", false, "BuffAlly", "When the ally ahead attacks, increase attack and hp by 4.");  
                }
                break;
            case "./Units/Unit5.png":
                if (level == 1) {
                    this.ability = new Passive("D", "A", "RE.1", "HP.-1", true, "Magic", "When an ally dies, deal 1 damage to a random enemy.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "A", "RE.1", "HP.-2", true, "Magic", "When an ally dies, deal 2 damage to a random enemy.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "A", "RE.1", "HP.-3", true, "Magic", "When an ally dies, deal 3 damage to a random enemy.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "A", "RE.1", "HP.-4", true, "Magic", "When an ally dies, deal 4 damage to a random enemy.");
                }
                break;
            case "./Units/Unit6.png":
                if (level == 1) {
                    this.ability = new Passive("H", "E", "T.1", "AT.-1", false, "Poison", "Whenever an enemy is hurt, reduce their attack by 1.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "E", "T.1", "AT.-2", false, "Poison", "Whenever an enemy is hurt, reduce their attack by 2.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "E", "T.1", "AT.-3", false, "Poison", "Whenever an enemy is hurt, reduce their attack by 3.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "E", "T.1", "AT.-4", false, "Poison", "Whenever an enemy is hurt, reduce their attack by 4.");
                }
                break;
            case "./Units/Unit7.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.1", false, "BuffAlly", "Increase the front ally's attack by 1 at the start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.2", false, "BuffAlly", "Increase the front ally's attack by 2 at the start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.3", false, "BuffAlly", "Increase the front ally's attack by 3 at the start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.4", false, "BuffAlly", "Increase the front ally's attack by 4 at the start of battle.");
                }
                break;
            case "./Units/Unit8.png":
                if (level == 1) {
                    this.ability = new Passive("A", "I", "RA.1", "AT.1", false, "BuffAlly", "After attacking, increase a random ally's attack by 1.");
                }
                if (level == 2) {
                    this.ability = new Passive("A", "I", "RA.2", "AT.1", false, "BuffAlly", "After attacking, increase 2 random allies' attack by 1.");
                }
                if (level == 3) {
                    this.ability = new Passive("A", "I", "RA.3", "AT.1", false, "BuffAlly", "After attacking, increase 3 random allies' attack by 1.");
                }
                if (level == 4) {
                    this.ability = new Passive("A", "I", "RA.4", "AT.1", false, "BuffAlly", "After attacking, increase 4 random allies' attack by 1.");
                }
                break;
            case "./Units/Unit9.png":
                if (level == 1) {
                    this.ability = new Passive("D", "E", "I.1", "AT.1", false, "BuffAlly", "Increase attack by 1 when an enemy dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "E", "I.1", "AT.2", false, "BuffAlly", "Increase attack by 2 when an enemy dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "E", "I.1", "AT.3", false, "BuffAlly", "Increase attack by 3 when an enemy dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "E", "I.1", "AT.4", false, "BuffAlly", "Increase attack by 4 when an enemy dies.");
                }
                break;
            case "./Units/Unit10.png":
                this.ability = new Passive("N", "N", "N.1", "N", false, "N", "This unit has no passive.");
                break;
            case "./Units/Unit11.png":
                if (level == 1) {
                    this.ability = new Passive("D", "E", "FA.1", "AT.1", false, "BuffAlly", "Increase front ally's attack by 1 when an enemy dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "E", "FA.1", "AT.2", false, "BuffAlly", "Increase front ally's attack by 2 when an enemy dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "E", "FA.1", "AT.3", false, "BuffAlly", "Increase front ally's attack by 3 when an enemy dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "E", "FA.1", "AT.4", false, "BuffAlly", "Increase front ally's attack by 4 when an enemy dies.");
                }
                break;
            case "./Units/Unit12.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "RE.1", "HP.-1", false, "Damage", "Deal 1 damage to a random enemy when hurt.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "RE.1", "HP.-2", false, "Damage", "Deal 2 damage to a random enemy when hurt.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "RE.1", "HP.-3", false, "Damage", "Deal 3 damage to a random enemy when hurt.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "RE.2", "HP.-4", false, "Damage", "Deal 4 damage to 2 random enemy when hurt.");
                }
                break;
            case "./Units/Unit13.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.1", false, "BuffAlly", "Heal the ally behind by 1 HP when hurt.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.2", false, "BuffAlly", "Heal the ally behind by 2 HP when hurt.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.3", false, "BuffAlly", "Heal the ally behind by 3 HP when hurt.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.4", false, "BuffAlly", "Heal the ally behind by 4 HP when hurt.");
                }
                break;
            case "./Units/Unit14.png":
                if (level == 1) {
                    this.ability = new Passive("D", "A", "I.1", "B.2", false, "BuffAlly", "Increase attack and HP by 2 when an ally dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "A", "I.1", "B.3", false, "BuffAlly", "Increase attack and HP by 3 when an ally dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "A", "I.1", "B.4", false, "BuffAlly", "Increase attack and HP by 4 when an ally dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "A", "I.1", "B.5", false, "BuffAlly", "Increase attack and HP by 5 when an ally dies.");
                }
                break;
            case "./Units/Unit15.png":
                if (level == 1) {
                    this.ability = new Passive("H", "E", "RA.1", "HP.1", false, "Magic", "Increase random ally's HP by 1 when an enemy gets hurt.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "E", "RA.2", "HP.1", false, "Magic", "Increase 2 random allies' HP by 1 when an enemy gets hurt.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "E", "RA.2", "HP.1", false, "Magic", "Increase 2 random allies' HP by 1 when an enemy gets hurt.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "E", "RA.3", "B.1", false, "Magic", "Increase 3 random ally's attack and HP by 1 when an enemy gets hurt.");
                }
                break;
            case "./Units/Unit16.png":
                if (level == 1) {
                    this.ability = new Passive("D", "E", "FA.1", "HP.2", false, "BuffAlly", "Heal the front ally's HP by 2 when an enemy dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "E", "FA.1", "HP.3", false, "BuffAlly", "Heal the front ally's HP by 3 when an enemy dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "E", "FA.1", "HP.4", false, "BuffAlly", "Heal the front ally's HP by 4 when an enemy dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "E", "FA.1", "HP.5", false, "BuffAlly", "Heal the front ally's HP by 5 when an enemy dies.");
                }
                break;
            case "./Units/Unit17.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.-1", false, "Snowball", "Hit the ally behind by 1 HP when hurt.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "BA.1", "HP.-1", false, "Snowball", "Hit the ally behind by 1 HP when hurt.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "BA.2", "HP.-1", false, "Snowball", "Hit the ally behind twice by 1 HP when hurt.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "BA.3", "HP.-1", false, "Snowball", "Hit the ally behind thrice by 1 HP when hurt.");
                }
                break;
            case "./Units/Unit18.png":
                if (level == 1) {
                    this.ability = new Passive("H", "AA", "AA.1", "HP.1", false, "Poison", "Heal the ally in front by 1 HP when they get hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "AA", "AA.1", "HP.2", false, "Poison", "Heal the ally in front by 2 HP when they get hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "AA", "AA.1", "HP.2", false, "Poison", "Heal the ally in front by 2 HP when they get hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "AA", "AA.1", "HP.3", false, "Poison", "Heal the ally in front by 3 HP when they get hit.");
                }
                break;
            case "./Units/Unit19.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "RE.1", "AT.1", false, "Poison", "Decrease a random enemy's attack by 1 when hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "RE.2", "AT.1", false, "Poison", "Decrease 2 random enemies' attack by 1 when hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "RE.2", "AT.2", false, "Poison", "Decrease 2 random enemies' attack by 2 when hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "RE.3", "AT.2", false, "Poison", "Decrease 3 random enemies' attack by 2 when hit.");
                }
                break;
            case "./Units/Unit20.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "RA.3", "B.2", false, "BuffAlly", "Increase 3 random allies' attack and HP by 2 at the start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "RA.4", "B.3", false, "BuffAlly", "Increase 4 random allies' attack and HP by 3 at the start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "RA.4", "B.3", false, "BuffAlly", "Increase 4 random allies' attack and HP by 3 at the start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RA.5", "B.5", false, "BuffAlly", "Increase 5 random allies' attack and HP by 5 at the start of battle.");
                }
                break;
            case "./Units/Unit21.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "RE.2", "HP.-2", false, "Arrow", "Deal 2 damage to 2 random enemies at the start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "RE.2", "HP.-3", false, "Arrow", "Deal 3 damage to 2 random enemies at the start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "RE.3", "HP.-3", false, "Arrow", "Deal 3 damage to 3 random enemies at the start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RE.3", "HP.-4", false, "Arrow", "Deal 3 damage to 4 random enemies at the start of battle.");
                }
                break;
            case "./Units/Unit22.png":
                this.ability = new Passive("N", "N", "N.1", "N", false, "N", "This unit has no passive.");
                break;
            case "./Units/Unit23.png":
                if (level == 1) {
                    this.ability = new Passive("D", "A", "I.1", "HP.5", false, "Poison", "Increase HP by 5 when an ally dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "A", "I.1", "HP.7", false, "Poison", "Increase HP by 7 when an ally dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "A", "I.1", "HP.7", false, "Poison", "Increase HP by 7 when an ally dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "A", "I.1", "HP.10", false, "Poison", "Increase HP by 10 when an ally dies.");
                }
                break;
            case "./Units/Unit24.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "FE.1", "HP.-2", false, "Arrow", "Hit front enemy for 2 HP when hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "FE.1", "HP.-4", false, "Arrow", "Hit front enemy for 4 HP when hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "FE.1", "HP.-4", false, "Arrow", "Hit front enemy for 4 HP when hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "FE.1", "HP.-6", false, "Arrow", "Hit front enemy for 6 HP when hit.");
                }
                break;
            case "./Units/Unit25.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "I.1", "HP.2", false, "Ice", "Heal for 2 HP when hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "I.1", "HP.3", false, "Ice", "Heal for 3 HP when hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "I.1", "HP.3", false, "Ice", "Heal for 3 HP when hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "I.1", "HP.5", false, "Ice", "Heal for 5 HP when hit.");
                }
                break;
            case "./Units/Unit26.png":
                this.ability = new Passive("N", "N", "N.1", "N", false, "N", "This unit has no passive.");
                break;
            case "./Units/Unit27.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "FE.1", "HP.-5", false, "Frost", "Hit front enemy for 5 HP at the start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "FE.1", "HP.-7", false, "Frost", "Hit front enemy for 7 HP at the start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "FE.1", "HP.-7", false, "Frost", "Hit front enemy for 7 HP at the start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "FE.1", "HP.-10", false, "Frost", "Hit front enemy for 10 HP at the start of battle.");
                }
                break;
            case "./Units/Unit28.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "RE.2", "AT.-3", false, "Poison", "Reduce 2 random enemies' attack by 3 at the start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "RE.3", "AT.-3", false, "Poison", "Reduce 3 random enemies' attack by 3 at the start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "RE.3", "AT.-3", false, "Poison", "Reduce 3 random enemies' attack by 3 at the start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RE.4", "AT.-5", false, "Poison", "Reduce 4 random enemies' attack by 5 at the start of battle.");
                }
                break;
            case "./Units/Unit29.png":
                if (level == 1) {
                    this.ability = new Passive("D", "E", "I.1", "HP.1", false, "BuffAlly", "Increase HP by 1 when an enemy dies.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "E", "I.1", "HP.2", false, "BuffAlly", "Increase HP by 2 when an enemy dies.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "E", "I.1", "HP.2", false, "BuffAlly", "Increase HP by 2 when an enemy dies.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "E", "I.1", "HP.-1", false, "Poison", "Increase HP by -1 when an enemy dies.");
                }
                break;
            case "./Units/30.png":
                if (level == 1) {
                    this.ability = new Passive("H", "I", "RE.2", "HP.-2", false, "Ice", "Hit 2 random enemies for 2 when hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "I", "RE.3", "HP.-3", false, "Ice", "Hit 3 random enemies for 3 when hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "I", "RE.3", "HP.-3", false, "Ice", "Hit 3 random enemies for 3 when hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "I", "RE.4", "HP.-5", false, "Ice", "Hit 4 random enemies for 5 when hit.");
                }
                break;
            case "./Units/Unit31.png":
                if (level == 1) {
                    this.ability = new Passive("A", "I", "FE.1", "B.-1", false, "Frost", "Reduce front enemy's HP and Attack by 1 after attacking.");
                }
                if (level == 2) {
                    this.ability = new Passive("A", "I", "FE.1", "B.-2", false, "Frost", "Reduce front enemy's HP and Attack by 2 after attacking.");
                }
                if (level == 3) {
                    this.ability = new Passive("A", "I", "FE.1", "B.-3", false, "Frost", "Reduce front enemy's HP and Attack by 3 after attacking.");
                }
                if (level == 4) {
                    this.ability = new Passive("A", "I", "FE.1", "B.-4", false, "Frost", "Reduce front enemy's HP and Attack by 4 after attacking.");
                }
                break;
            case "./Units/Unit32.png":
                if (level == 1) {
                    this.ability = new Passive("D", "A", "FA.1", "B.5", false, "BuffAlly", "When an ally dies, buff the front ally's HP and Attack by 5.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "A", "FA.1", "B.6", false, "BuffAlly", "When an ally dies, buff the front ally's HP and Attack by 6.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "A", "FA.1", "B.7", false, "BuffAlly", "When an ally dies, buff the front ally's HP and Attack by 7.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "A", "FA.1", "B.8", false, "BuffAlly", "When an ally dies, buff the front ally's HP and Attack by 8.");
                }
                break;
            case "./Units/Unit33.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "FA.1", "B.6", false, "BuffAlly", "At the start of round, buff the front ally's HP and Attack by 6.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "FA.1", "B.7", false, "BuffAlly", "At the start of round, buff the front ally's HP and Attack by 7.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "FA.1", "B.8", false, "BuffAlly", "At the start of round, buff the front ally's HP and Attack by 8.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "FA.1", "B.9", false, "BuffAlly", "At the start of round, buff the front ally's HP and Attack by 9.");
                }
                break;
            case "./Units/34.png":
                if (level == 1) {
                    this.ability = new Passive("H", "N", "I.1", "AT.1", false, "BuffAlly", "Gain 1 attack whenever anyone is hit.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "N", "I.1", "AT.2", false, "BuffAlly", "Gain 2 attack whenever anyone is hit.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "N", "I.1", "AT.3", false, "BuffAlly", "Gain 3 attack whenever anyone is hit.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "N", "I.1", "AT.4", false, "BuffAlly", "Gain 4 attack whenever anyone is hit.");
                }
                break;
            case "./Units/Unit35.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "LE.1", "HP.-5", false, "Snowball", "Deal 5 damage to the last enemy at start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "LE.1", "HP.-6", false, "Snowball", "Deal 6 damage to the last enemy at start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "LE.1", "HP.-7", false, "Snowball", "Deal 7 damage to the last enemy at start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "LE.1", "HP.-8", false, "Snowball", "Deal 8 damage to the last enemy at start of battle.");
                }
                break;
            case "./Units/Unit36.png":
                if (level == 1) {
                    this.ability = new Passive("H", "E", "T.1", "HO.-1", false, "iceShard", "Whenever an enemy is hurt, reduce their hp total by 1.");
                }
                if (level == 2) {
                    this.ability = new Passive("H", "E", "T.1", "HO.-2", false, "iceShard", "Whenever an enemy is hurt, reduce their hp total by 2.");
                }
                if (level == 3) {
                    this.ability = new Passive("H", "E", "T.1", "HO.-3", false, "iceShard", "Whenever an enemy is hurt, reduce their hp total by 3.");
                }
                if (level == 4) {
                    this.ability = new Passive("H", "E", "T.1", "HO.-4", false, "iceShard", "Whenever an enemy is hurt, reduce their hp total by 4.");
                }
                break;
            case "./Units/Unit37.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "RA.1", "AT.10", false, "BuffAlly", "Give a random ally 10 attack at start of battle.");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "RA.2", "AT.9", false, "BuffAlly", "Give 2 random allies 9 attack at start of battle.");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "RA.3", "AT.8", false, "BuffAlly", "Give 3 random allies 8 attack at start of battle.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RA.4", "AT.7", false, "BuffAlly", "Give 4 random allies 7 attack at start of battle.");
                }
                break;
            case "./Units/Unit38.png":
                if (level == 1) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.-5", false, "Frost", "Reduce front enemy's attack by 5 at start of battle");
                }
                if (level == 2) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.-6", false, "Frost", "Reduce front enemy's attack by 6 at start of battle");
                }
                if (level == 3) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.-7", false, "Frost", "Reduce front enemy's attack by 7 at start of battle");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "FA.1", "AT.-8", false, "Frost", "Reduce front enemy's attack by 8 at start of battle");
                }
                break;
            case "./Units/Unit39.png":
                if (level == 1) {
                    this.ability = new Passive("N", "N", "N.1", "N", false, "N", "Has a powerful ability at level 4.");
                }
                if (level == 2) {
                    this.ability = new Passive("N", "N", "N.1", "N", false, "N", "Has a powerful ability at level 4.");
                }
                if (level == 3) {
                    this.ability = new Passive("N", "N", "N.1", "N", false, "N", "Has a powerful ability at level 4.");
                }
                if (level == 4) {
                    this.ability = new Passive("SB", "N", "RE.1", "HP.-99", false, "Magic", "Deal 99 damage to a random enemy at start of battle.");
                }
                break;
            case "./Units/Unit40.png":
                if (level == 1) {
                    this.ability = new Passive("D", "N", "I.1", "B.4", false, "BuffAlly", "When anyone dies, gain 4 attack 4 hp.");
                }
                if (level == 2) {
                    this.ability = new Passive("D", "N", "I.1", "B.5", false, "BuffAlly", "When anyone dies, gain 5 attack 5 hp.");
                }
                if (level == 3) {
                    this.ability = new Passive("D", "N", "I.1", "B.6", false, "BuffAlly", "When anyone dies, gain 6 attack 6 hp.");
                }
                if (level == 4) {
                    this.ability = new Passive("D", "N", "I.1", "B.7", false, "BuffAlly", "When anyone dies, gain 7 attack 7 hp.");
                }
                break;
            default:
                this.ability = new Passive("N", "N", "N.1", "N", false, "N", "This unit has no passive.");
        }
    }


    getStats(sprite) {
        switch (sprite) {
            case "./Units/Unit1.png":
                this.attack = 3;
                this.health = 7;
                this.rarity = 1;
                this.name = "Soupsmith";
                break;
            case "./Units/Unit2.png":
                this.attack = 3;
                this.health = 5;
                this.rarity = 1;
                this.name = "Snowpelter";
                break;
            case "./Units/Unit3.png":
                this.attack = 4;
                this.health = 7;
                this.rarity = 1;
                this.name = "Frostwell";
                break;
            case "./Units/Unit4.png":
                this.attack = 2;
                this.health = 3;
                this.rarity = 1;
                this.name = "Apprentice";
                break;
            case "./Units/Unit5.png":
                this.attack = 3;
                this.health = 4;
                this.rarity = 1;
                this.name = "Knower";
                break;
            case "./Units/Unit6.png":
                this.attack = 3;
                this.health = 4;
                this.rarity = 1;
                this.name = "Ratman";
                break;
            case "./Units/Unit7.png":
                this.attack = 4;
                this.health = 5;
                this.rarity = 1;
                this.name = "Shelly";
                break;
            case "./Units/Unit8.png":
                this.attack = 6;
                this.health = 8;
                this.rarity = 1;
                this.name = "Stabotron";
                break;
            case "./Units/Unit9.png":
                this.attack = 7;
                this.health = 5;
                this.rarity = 1;
                this.name = "Pikal";
                break;
            case "./Units/Unit10.png":
                this.attack = 5;
                this.health = 11;
                this.rarity = 1;
                this.name = "Fistt";
                break;
            case "./Units/Unit11.png":
                this.attack = 5;
                this.health = 13;
                this.rarity = 2;
                this.name = "Skiever";
                break;
            case "./Units/Unit12.png":
                this.attack = 8;
                this.health = 8;
                this.rarity = 2;
                this.name = "Occulant";
                break;
            case "./Units/Unit13.png":
                this.attack = 10;
                this.health = 7;
                this.rarity = 2;
                this.name = "Skealax";
                break;
            case "./Units/Unit14.png":
                this.attack = 1;
                this.health = 10;
                this.rarity = 2;
                this.name = "Harvar";
                break;
            case "./Units/Unit15.png":
                this.attack = 5;
                this.health = 10;
                this.rarity = 2;
                this.name = "Eblinex";
                break;
            case "./Units/Unit16.png":
                this.attack = 4;
                this.health = 10;
                this.rarity = 2;
                this.name = "SoupMaster";
                break;
            case "./Units/Unit17.png":
                this.attack = 7;
                this.health = 10;
                this.rarity = 2;
                this.name = "Helix";
                break;
            case "./Units/Unit18.png":
                this.attack = 8;
                this.health = 7;
                this.rarity = 2;
                this.name = "Crash";
                break;
            case "./Units/Unit19.png":
                this.attack = 2;
                this.health = 15;
                this.rarity = 2;
                this.name = "Plague";
                break;
            case "./Units/Unit20.png":
                this.attack = 2;
                this.health = 3;
                this.rarity = 2;
                this.name = "Likene";
                break;
            case "./Units/Unit21.png":
                this.attack = 6;
                this.health = 14;
                this.rarity = 3;
                this.name = "Sogwa";
                break;
            case "./Units/Unit22.png":
                this.attack = 18;
                this.health = 16;
                this.rarity = 3;
                this.name = "Raven";
                break;
            case "./Units/Unit23.png":
                this.attack = 4;
                this.health = 15;
                this.rarity = 3;
                this.name = "Hatter";
                break;
            case "./Units/Unit24.png":
                this.attack = 7;
                this.health = 18;
                this.rarity = 3;
                this.name = "Helter";
                break;
            case "./Units/Unit25.png":
                this.attack = 5;
                this.health = 18;
                this.rarity = 3;
                this.name = "Skelter";
                break;
            case "./Units/Unit26.png":
                this.attack = 4;
                this.health = 20;
                this.rarity = 3;
                this.name = "Peebo";
                break;
            case "./Units/Unit27.png":
                this.attack = 10;
                this.health = 10;
                this.rarity = 3;
                this.name = "Mariam";
                break;
            case "./Units/Unit28.png":
                this.attack = 8;
                this.health = 14;
                this.rarity = 3;
                this.name = "Hubert";
                break;
            case "./Units/Unit29.png":
                this.attack = 14;
                this.health = 7;
                this.rarity = 3;
                this.name = "Reimmus";
                break;
            case "./Units/Unit30.png":
                this.attack = 2;
                this.health = 28;
                this.rarity = 3;
                this.name = "Coda";
                break;
            case "./Units/Unit31.png":
                this.attack = 8;
                this.health = 18;
                this.rarity = 4;
                this.name = "Slice";
                break;
            case "./Units/Unit32.png":
                this.attack = 7;
                this.health = 15;
                this.rarity = 4;
                this.name = "Vyiam";
                break;
            case "./Units/Unit33.png":
                this.attack = 13;
                this.health = 15;
                this.rarity = 4;
                this.name = "Soda";
                break;
            case "./Units/Unit34.png":
                this.attack = 14;
                this.health = 14;
                this.rarity = 4;
                this.name = "Kingale";
                break;
            case "./Units/Unit35.png":
                this.attack = 8;
                this.health = 20;
                this.rarity = 4;
                this.name = "Sherbert";
                break;
            case "./Units/Unit36.png":
                this.attack = 19;
                this.health = 4;
                this.rarity = 4;
                this.name = "Schism";
                break;
            case "./Units/Unit37.png":
                this.attack = 6;
                this.health = 21;
                this.rarity = 4;
                this.name = "Pepperwire";
                break;
            case "./Units/Unit38.png":
                this.attack = 16;
                this.health = 14;
                this.rarity = 4;
                this.name = "Spark";
                break;
            case "./Units/Unit39.png":
                this.attack = 1;
                this.health = 1;
                this.rarity = 4;
                this.name = "Lost";
                break;
            case "./Units/Unit40.png":
                this.attack = 4;
                this.health = 4;
                this.rarity = 4;
                this.name = "IO";
                break;
            default:
                this.attack = 2;
                this.health = 4;
        }
    }

    levelUp() {
        if (this.level < MAX_LEVEL) {  
            this.level++;
            this.getAbility(this.sprite, this.level);
            this.attack++;
            this.health++;
            this.maxHealth++;
        }
    }

    update() {
        this.animator.update(gameEngine.clockTick);
        this.Selected = gameEngine.SelectedUnitGlobal == this.ID;
    }

    draw(ctx) {
        // Get current animation state (position, rotation, scale)
        const animState = this.animator.getDrawPosition();
        
        ctx.save();
        
        // Calculate center point for transformations
        const centerX = animState.x + this.width/2;
        const centerY = animState.y + this.height/2;
        
        // Apply transformations around center point
        ctx.translate(centerX, centerY);
        ctx.rotate(animState.rotation * Math.PI/180);
        ctx.scale(animState.scale, animState.scale);
        
        // Flip sprite if facing left
        if (this.facingLeft) {
            ctx.scale(-1, 1);
        }
        
        // Move back to top-left for drawing
        ctx.translate(-this.width/2, -this.height/2);
        
        // Draw the unit sprite
        ctx.drawImage(
            ASSET_MANAGER.getAsset(this.sprite),
            0,
            0,
            this.width,
            this.height
        );
        
        ctx.restore();
    
        // Draw stats (not affected by transformations)
        this.drawStats(ctx, 32, 16);

        this.Selected = gameEngine.SelectedUnitGlobal == this.ID;
        if (this.Selected) this.drawDescription(ctx);
    }

    drawStats(ctx, statx, staty,) {
        // Stats background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(this.x + statx, this.y + this.height - 30, 60, 25);

        // Attack stat
        let offset = 5;
        if (this.attack > 9) offset = 0;
        ctx.fillStyle = "orange";
        ctx.font = "bold 20px Arial";
        ctx.fillText(this.attack, this.x + 5 + offset + statx, this.y + this.height - 10);

        // Health stat
        offset = 5;
        if (this.health > 9) offset = 0;
        ctx.fillStyle = this.health < this.maxHealth ? "red" : "green";
        if (this.health > this.maxHealth) {ctx.fillStyle = "blue";}

        ctx.fillText(this.health, this.x + 35 + offset + statx, this.y + this.height - 10);

        // Level stars if above level 1
        if (this.level > 1) {
            ctx.fillStyle = "gold";
            for (let i = 0; i < this.level; i++) {
                ctx.fillText("★", this.x + (i * 15), this.y + 20);
            }
        }

        // Rarity
        let rareText = "None"
        if (this.rarity == 1) {
            ctx.fillStyle = 'rgba(157, 157, 157, 0.9)';
            rareText = "common";
        } else if (this.rarity == 2) {
            ctx.fillStyle = 'rgba(152, 241, 119, 0.9)';
            rareText = "uncommon";
        } else if (this.rarity == 3) {
            ctx.fillStyle = 'rgba(101, 179, 251, 0.9)';
            rareText = "rare";
        /*} else if (this.rarity == 4) {
            ctx.fillStyle = 'rgba(0, 34, 255, 0.9)';
            rareText = "super rare";*/
        } else if (this.rarity == 4) {
            ctx.fillStyle = 'rgba(200, 0, 255, 0.9)';
            rareText = "epic";
        } else if (this.rarity == 5) {
            ctx.fillStyle = 'rgba(255, 247, 0, 0.9)';
            rareText = "legendary";
        }
        
        ctx.fillRect(this.x + statx-30, this.y + this.height-2, 120, 13);
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.textAlign = 'center';
        ctx.fillText(rareText, this.x + 25 + offset + statx, this.y + this.height+11);
        ctx.restore();

    }

    drawDescription(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        let left = 1240;
        let bottom = 200;
        if (this.isInShop) {
            left = 940;
            bottom = 550;
        }
        ctx.fillRect(left, bottom, 300, 180);

        let lines = this.splitText(this.ability.description);

        ctx.fillStyle = "cyan";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = 'center';
        for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i], left + 150, bottom + 65 + (25 * i));
        ctx.fillStyle = "cyan";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(this.name, left + 150, bottom+30);

        let rareText = "None"
        if (this.rarity == 1) {
            ctx.fillStyle = 'rgba(157, 157, 157, 0.9)';
            rareText = "common";
        } else if (this.rarity == 2) {
            ctx.fillStyle = 'rgba(152, 241, 119, 0.9)';
            rareText = "uncommon";
        } else if (this.rarity == 3) {
            ctx.fillStyle = 'rgba(101, 179, 251, 0.9)';
            rareText = "rare";
        /*} else if (this.rarity == 4) {
            ctx.fillStyle = 'rgba(0, 34, 255, 0.9)';
            rareText = "super rare";*/
        } else if (this.rarity == 4) {
            ctx.fillStyle = 'rgba(200, 0, 255, 0.9)';
            rareText = "epic";
        } else if (this.rarity == 5) {
            ctx.fillStyle = 'rgba(255, 247, 0, 0.9)';
            rareText = "legendary";
        }
        ctx.fillText(rareText, left + 150, bottom+165);
        ctx.restore();
    }

    splitText(text) {
        let index = 0;
        let end = 27;
        let lines = []
        let textLeft = text;

        while (textLeft.length > end) {
            while (textLeft.charAt(end) != ' ') end --;
            lines[index] = textLeft.substring(0, end);
            textLeft = textLeft.substring(end+1);
            index++;
            end = 27;
        }

        lines[index] = textLeft;

        return lines
    }

    moveTo(x, y) {
        // Delegate movement animation to animator
        this.animator.moveTo(x, y);
    }

    newName() {
        this.ID = Math.floor(Math.random() * 99999999999999);
        while (gameEngine.takenIDS.includes(this.ID)) {
            this.ID = Math.floor(Math.random() * 99999999999999);
        }
        gameEngine.takenIDS.push(this.ID)
    }
}
