let a = {
  a: 1,
  b: 23,
  c: 21,
  d: 38,
  e:19,
  f: 5
}

function func(obj) {
  let maxKey = '';
  var maxValue = 0
  for (const key in obj) {
    if(obj[key] > maxValue) {
      maxKey = key;
      maxValue = obj[key]
    }
  }
  let result = {}
  result[maxKey] = maxValue
  return result
}

console.log(func(a))