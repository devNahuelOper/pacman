
export function shuffle(arr = []) {
  let i = arr.length,
    j,
    temp;
  if (!i) return arr;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
