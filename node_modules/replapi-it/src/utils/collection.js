class Collection extends Map {
	constructor(values) {super(values)};
	at(index) {return [...this].at(index)[1]};
	filter(fn) {return new Collection([...this].filter(i => fn(i[1])))};
	find(fn) {return [...this].find(i => fn(i[1]))[1]};
	findKey(fn) {return [...this].find(i => fn(i[1]))[0]};
	first() {return this.at(0)};
	firstKey() {return this.atKey(0)};
	hasAll(keys) {keys.forEach(key =>  {if (!this.has(key)) return false}); return true}
	hasAny(keys) {keys.forEach(key => {if(this.has(key)) return true}); return false}
	keyAt(index) {return [...this].at(index)[0]};
  last() {return this.at(-1)};
  lastKey() {return this.keyAt(-1)};
  map(fn) {return [...this].map(i => fn(i[1]))};
  random() {return this.at(Math.floor(Math.random() * this.size))};
  randomKey() {return this.keyAt(Math.floor(Math.random() * this.size))};
  reverse() {return new Collection([...this].reverse())};
  some(fn) {return [...this].some(i => fn(i[1]))};
  sort(fn) {return [...this].sort((a, b) => fn((a[1], b[1])))};
  sweep(fn) {return [...this.filter(fn).keys()].forEach(key => this.delete(key))};
  tap(fn) {return [...this.values()].forEach(value => fn(value))};
}

module.exports = Collection;