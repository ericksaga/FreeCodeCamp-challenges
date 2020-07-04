//constants
const romanNumbers = [
  {roman:'M', val:1000},
  {roman:'D',val:500},
  {roman:'C',val:100},
  {roman:'L',val:50},
  {roman:'X',val:10},
  {roman:'V',val:5},
  {roman:'I',val:1}
];

const MONEY = [
  {name:"PENNY", value: 0.01},
  {name:"NICKEL", value: 0.05},
  {name:"DIME", value:0.1},
  {name:"QUARTER", value:0.25},
  {name:"ONE", value:1},
  {name:"FIVE", value:5},
  {name:"TEN", value:10},
  {name:"TWENTY", value:20},
  {name:"ONE HUNDRED", value:100}
  ];

//Palindrome Checker challenge
function palindrome(str) {
  let st;
  st = str.replace(/[^\d^A-Z^a-z]/g,'').toLowerCase();
  console.log(st);
  let lmt = parseInt(st.length/2);
  let r = true;
  for(let x = 0; x < lmt; x++)
  {
    if(st[x] != st[st.length - x - 1])
    {
      r = false;
    }
  }
  return r;
}

/*
Roman Numeral Converter challenge
converts into roman numbers from 1 to 3999
*/
function convertToRoman(num) {
  let str = [];
  let pot = 0;
  while(num >= 1) {
    //get a single number per power of 10
    let n = num%10 * Math.pow(10,pot);
    let rm = 0;
    console.log(n);
    if(n == 0) {
      pot++;
      num = parseInt(num/10);
      continue;
    }

    for(let x in romanNumbers) {
      if(parseInt(n/romanNumbers[x].val) > 0) {
        rm = x;
        break;
      }
    }
    console.log(romanNumbers[rm]);
    rm++;
    rm--;
    if(num%10 == 9) {
      //starts with 9
      console.log("start 9");
      let q = romanNumbers[rm + 1].roman + romanNumbers[rm-1].roman;
      str.unshift(q);
    }
    else if(parseInt(n/romanNumbers[rm].val) >= 4) {
      //starts with 4
      console.log("start 4");
      let q = romanNumbers[rm].roman + romanNumbers[rm - 1].roman;
      str.unshift(q);
    }
    else {
      //any other case
      console.log("start any");
      let q = '';
      while(n > 0) {
        while(romanNumbers[rm].val > n)
          rm++;
        n -= romanNumbers[rm].val;
        q += romanNumbers[rm].roman;
        //console.log(n);
      }
      str.unshift(q);
    }
    //increment the power
    pot++;
    //delete last number
    num = parseInt(num/10);
  }
  return str.join('');
}

//Caesars Cipher challenge
function rot13(str) {
  //split in words
  let arr = str.split(' ');
  let r = [];
  for(let word of arr)
  {
    let q = '';
    for(let letter of word)
    {
      //skip anything different than a letter
      if(!(letter >= 'A' && letter <= 'Z')) {
        q += letter;
        continue;
      }
      //get decoded letter number
      let v = letter.charCodeAt(0) - 'A'.charCodeAt(0) + 13;
      q += String.fromCharCode('A'.charCodeAt(0) + v%26);
    }
    r.push(q);
  }
  return r.join(' ');
}

//Telephone Number Validator
function telephoneCheck(str) {
  let telephoneRegex = 
  /^1?\s?((\(\d\d\d\))|(\d\d\d))[-\s]?(\d\d\d)[-\s]?[-\s]?\d\d\d\d$/g;
  return telephoneRegex.test(str);
}

//Cash Register challenge
function checkCashRegister(price, cash, cid) {
  //get change
  let totalChange = cash - price;
  let change = {status: undefined, change:[]};
  let gaveAll = 0;
  //reverse the cid
  cid.reverse();
  for(let m of cid) {
    //give all the coins of this type
    if(m[1] <= totalChange) {
      totalChange -= m[1];
      //if there are not coins skip
      if(m[1] > 0)
        change.change.push(m);
      gaveAll++;
    }
    else {
      //find the value of the coin
      let v = MONEY.find(n => n.name == m[0])
      //calculate how much you can give with this coin
      let q = parseInt(totalChange/v.value)*v.value
      if(totalChange - q > 0.005 && totalChange - q - v.value > -0.005)
        q += v.value;
      //less than epsilon means no coin
      if(q > 0.005)
        change.change.push([v.name, q])
      totalChange -= q;
    }
  }
  //taking it back to original
  cid.reverse();
  //epsilon for the change
  if(totalChange > 0.005) {
    change.status = "INSUFFICIENT_FUNDS";
    change.change = [];
  }
  else {
    if(gaveAll == MONEY.length) {
      change.status = "CLOSED";
      change.change = cid;
    }
    else
      change.status = "OPEN";
  }
  return change;
}

