const getMods = (bitwiseMods) => {
    const byteMods = {
        None: 0,
        NF: 1,
        EZ: 2,
        TD: 4,
        HD: 8,
        HR: 16,
        SD: 32,
        DT: 64,
        RX: 128,
        HT: 256,
        NC: 512, // Only set along with DoubleTime. i.e: NC only gives 576
        FL: 1024,
        AP: 2048,
        SO: 4096,
        AUTO: 8192,    // Autopilot
        PF: 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
        Key4: 32768,
        Key5: 65536,
        Key6: 131072,
        Key7: 262144,
        Key8: 524288,
        FadeIn: 1048576,
        Random: 2097152,
        Cinema: 4194304,
        Target: 8388608,
        Key9: 16777216,
        KeyCoop: 33554432,
        Key1: 67108864,
        Key3: 134217728,
        Key2: 268435456,
        ScoreV2: 536870912,
        Mirror: 1073741824,
    };
    let enabledMods = [];
    for (const [key, value] of Object.entries(byteMods)) if (value & bitwiseMods) enabledMods.push(key)
    return enabledMods;
}

/**
 * @param {number} approvedState is the state number of the map
 */
const getMapStatus = (approvedState) => {
    const states = [
        {
            title: 'Pending',
            icon: './assets/icons/pending-gy-wip.png'
        },
        {
            title: 'Ranked',
            icon: './assets/icons/ranked.png'
        },
        {
            title: 'Approved',
            icon: './assets/icons/qualif-approv.png'
        },
        {
            title: 'Qualified',
            icon: './assets/icons/qualif-approv.png'
        },
        {
            title: 'Loved',
            icon: './assets/icons/loved.png'
        }];
    return states[approvedState]
}

const getAccuracy = (scoreData) => {
    const notes = {
        50: parseInt(scoreData.count50),
        100: parseInt(scoreData.count100),
        300: parseInt(scoreData.count300),
        miss: parseInt(scoreData.countmiss),
    }
    return Math.floor(((50 * notes["50"]) + (100 * notes["100"]) + (300 * notes["300"])) / (300 * (notes.miss + notes["50"] + notes["100"] + notes["300"])) * 10000) / 100;
}
module.exports = {getMods, getMapStatus, getAccuracy};