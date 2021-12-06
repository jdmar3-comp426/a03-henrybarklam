import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: undefined,
    allYearStats: undefined,
    ratioHybrids: undefined,
};

let n = mpg_data.length;
let sum_c = 0;
let sum_h = 0;
let years_list = [];
let sum_hybrid = 0;
let make_list = {}

for(let i =0; i<n; i++){
    sum_c = sum_c + mpg_data[i]['city_mpg'];
    sum_h = sum_h + mpg_data[i]['highway_mpg'];
    years_list.push(mpg_data[i]['year'])
    if(mpg_data[i]['hybrid']){
        sum_hybrid++
    }
    if(mpg_data[i]["hybrid"]){
        if(!(mpg_data[i]["make"] in make_list)){
            make_list[mpg_data[i]["make"]] = [];
        }
        make_list[mpg_data[i]["make"]].push(mpg_data[i]["id"]);
    }
}
let avg_c = sum_c/n;
let avg_h = sum_h/n;
let ratio_Hybrids = sum_hybrid/n;
let fuel_map = {
    'city': avg_c,
    'highway': avg_h
}
allCarStats.avgMpg = fuel_map;
allCarStats.allYearStats = getStatistics(years_list);
allCarStats.ratioHybrids = ratio_Hybrids;

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: undefined,
    avgMpgByYearAndHybrid: undefined
};
let master_list = [];
for (const [key,value] of Object.entries(make_list)){
    let new_ls = {};
    new_ls["make"] = key;
    new_ls["hybrids"] = value;
    master_list.push(new_ls);
}
master_list.sort(function(a,b){
    return b['hybrids'].length - a['hybrids'].length ;
});
moreStats.makerHybrids = master_list;

let second_master = {};
for(let i=0; i<n; i++){
    if(!(mpg_data[i]["year"] in second_master)){
        second_master[mpg_data[i]["year"]] = {
            "hybrid": {
                "city": [],
                "highway": []
            },
            "notHybrid":{
                "city": [],
                "highway": []
            }
        };
    }
    if(mpg_data[i]["hybrid"]){
        second_master[mpg_data[i]["year"]]["hybrid"]["city"].push(mpg_data[i]["city_mpg"]);
        second_master[mpg_data[i]["year"]]["hybrid"]["highway"].push(mpg_data[i]["highway_mpg"]);
    }
    else{
        second_master[mpg_data[i]["year"]]["notHybrid"]["city"].push(mpg_data[i]["city_mpg"]);
        second_master[mpg_data[i]["year"]]["notHybrid"]["highway"].push(mpg_data[i]["highway_mpg"]);
    }

}
const avg_finder = (array) => array.reduce((a,b) => a + b) / array.length;
for (const [key,values] of Object.entries(second_master)){
    second_master[key]["hybrid"]['city'] = avg_finder(second_master[key]['hybrid']['city']);
    second_master[key]['hybrid']['highway'] = avg_finder(second_master[key]['hybrid']['highway']);
    second_master[key]['notHybrid']['city'] = avg_finder(second_master[key]['notHybrid']['city']);
    second_master[key]['notHybrid']['highway'] = avg_finder(second_master[key]['notHybrid']['highway']);
}

moreStats.avgMpgByYearAndHybrid = second_master;