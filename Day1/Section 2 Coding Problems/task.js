function isSortedAscending(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
console.log(isSortedAscending([1, 2, 3, 4]));
console.log(isSortedAscending([1, 3, 2, 4])); 
console.log(isSortedAscending([5, 5, 6, 7]));

function get(arr, value) {
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > value) {
      res.push(arr[i]);
    }
  }

  return res;
}
console.log(get([5,7,8,9,10],8));

function plus1(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }

  digits.unshift(1);
  return digits;
}
console.log(plus1([1,2,3]));


function removeDuplicates(nums) {

  let i = 0;

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return [i+1,nums];
}
 let [i,nums] = removeDuplicates([0,0,1,1,1,2,2,3,3,4]);
 console.log(i);
 console.log(nums);
