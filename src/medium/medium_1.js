import { sumToString } from "../mild/mild_1.js";
import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let x = array.length
    let y = 0
    for(let i = 0; i<x; i++){
        y = y + array[i]
    }
    return y
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort((a,b) => a-b);
    let len = array.length
    let ind;
    let val;
    if(len % 2 !== 1){
        val = (array[len/2] + array[(len/2)-1])/2;
    }
    else{
        ind = Math.floor(len/2);
        return array[ind];
    }
    return val
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let len = array.length;
    let sumi = getSum(array);
    let meani = sumi/len;
    let mediani = getMedian(array);
    let mini = Math.min(...array);
    let maxi = Math.max(...array);
    let vari = 0;

    for (let i = 0; i< len; i++){
        vari = vari + Math.pow(array[i]-meani,2);
    }
    vari = vari/len;
    let stand = Math.sqrt(vari);
    let stats = {
        'length': len,
        'sum':sumi,
        'mean':meani,
        'median':mediani,
        'min':mini,
        'max':maxi,
        'variance':vari,
        'standard_deviation':stand,
    };

    return stats
}

