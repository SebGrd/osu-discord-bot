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

const getModsEmoji = (mods) => {
    const emojis = {
        None: '<:nomod:823717994965237811>',
        NF: '<:nf:823717994902978570>',
        EZ: '<:ez:823717994949246976>',
        TD: '<:td:823717994681073725>',
        HD: '<:hd:823717994688806913>',
        HR: '<:hr:823717994911105084>',
        SD: '<:sd:823717994911498240>',
        DT: '<:dt:823717994655645707>',
        HT: '<:ht:823717994931683359>',
        NC: '<:nc:823717994995777583>', // Only set along with DoubleTime. i.e: NC only gives 576
        FL: '<:fl:823717994886201384>',
        SO: '<:so:823717995029200916>',
        PF: '<:pg:823717994765090837>', // Only set along with SuddenDeath. i.e: PF only gives 16416
    };
    return mods.map((mod) => emojis[mod])
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

const getRankIcon = (rank) => {
    const ranks = {
        XH: './assets/icons/xh.png',
        X: './assets/icons/ss.png',
        SH: './assets/icons/sx.png',
        S: './assets/icons/s.png',
        A: './assets/icons/a.png',
        B: './assets/icons/b.png',
        C: './assets/icons/c.png',
        D: './assets/icons/d.png',
        F: './assets/icons/f.png',
    }
    return ranks[rank];
}

const getRankEmoji = (rank) => {
    const ranks = {
        XH: '<:ssx:823710568685895711>',
        X: '<:ss:823710568933621770>',
        SH: '<:sx:823710568946204702>',
        S: '<:s_:823710568811593729>',
        A: '<:a_:823710568573042719>',
        B: '<:b_:823710568937422848>',
        C: '<:c_:823710568635695176>',
        D: '<:d_:823710569013837854>',
        F: '<:f_:823710569101393990>',
    }
    return ranks[rank];
}

const getCompletionPercentage = (scoreData, beatmapData) => {
    const notes = {
        50: parseInt(scoreData.count50),
        100: parseInt(scoreData.count100),
        300: parseInt(scoreData.count300),
        miss: parseInt(scoreData.countmiss),
    }
    const hitNotes = notes['50'] + notes['100'] + notes['300'] + notes.miss;
    const totalNotes = beatmapData.max_combo;
    return Math.floor(hitNotes / totalNotes * 100)
}

const getProgress = () => {

}

module.exports = {getMods, getMapStatus, getAccuracy, getRankEmoji, getRankIcon, getModsEmoji, getCompletionPercentage};