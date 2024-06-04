// default values
const stats : string[] = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
const price_arr : number[] = [0, 1, 2, 4, 6, 9, 12, 16, 21, 27, 34];
const min_value = 8;

// match up indices starting with min with prices 
const prices : { [value:number] : number } = {};
price_arr.forEach((value, index) => prices[index+min_value] = value);

// 
const default_stats : { [stat:string] : number } = {};
stats.forEach(stat => default_stats[stat] = min_value);

function range(start : number, end : number) : number[] {
    const out = [start];
    while (start < end) {
        out.push(++start);
    }
    return out;
}

export {stats, prices, range, default_stats};
