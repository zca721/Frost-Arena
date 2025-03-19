class Passive {
    constructor(triggerCondition, whoTriggers, whoAffected, effect, deathTrigger, visualEffect, description) {
        Object.assign(this, {triggerCondition, whoTriggers, whoAffected, effect, deathTrigger, visualEffect, description});
        this.team = null;
        this.CID = null;
    }
}
