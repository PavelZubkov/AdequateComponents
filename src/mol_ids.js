let $ = {};

$.$mol_owning_map = new WeakMap();

function $mol_owning_allow(having) {
  try {
    if (!having) return false;
    if (typeof having !== 'object') return false;
    // if( having instanceof $mol_delegate ) return false
    if (typeof having['destructor'] !== 'function') return false;
    return true;
  } catch (_a) {
    return false;
  }
}

$.$mol_owning_allow = $mol_owning_allow;

function $mol_owning_get(having, Owner) {
  if (!$mol_owning_allow(having)) return null;
  while (true) {
    const owner = $.$mol_owning_map.get(having);
    if (!owner) return owner;
    if (!Owner) return owner;
    if (owner instanceof Owner) return owner;
    having = owner;
  }
}

$.$mol_owning_get = $mol_owning_get;

function $mol_owning_check(owner, having) {
  if (!$mol_owning_allow(having))
    return false;
  if ($.$mol_owning_map.get(having) !== owner)
    return false;
  return true;
}

$.$mol_owning_check = $mol_owning_check;

function $mol_owning_catch(owner, having) {
  if (!$mol_owning_allow(having))
    return false;
  if ($.$mol_owning_map.get(having))
    return false;
  $.$mol_owning_map.set(having, owner);
  return true;
}

$.$mol_owning_catch = $mol_owning_catch;

let $$;
(function ($$_1) {})($$ = $.$$ || ($.$$ = {}));

$.$mol_ambient_ref = Symbol('$mol_ambient_ref');

function $mol_ambient(overrides) {
  return Object.setPrototypeOf(overrides, this || $);
}

$.$mol_ambient = $mol_ambient;

function $mol_ambient_make(Obj, overrides) {
  const obj = new Obj;
  obj[$.$mol_ambient_ref] = this.$mol_ambient(overrides);
  return obj;
}

$.$mol_ambient_make = $mol_ambient_make;

var _a;

class $mol_object2 {
  constructor(init) {
    this[_a] = null;
    if (init)
      init(this);
  }
  
  get $() {
    if (this[$.$mol_ambient_ref])
      return this[$.$mol_ambient_ref];
    const owner = $.$mol_owning_get(this);
    return this[$.$mol_ambient_ref] = (owner === null || owner === void 0 ? void 0 : owner.$) || $mol_object2.$;
  }
  
  set $(next) {
    if (this[$.$mol_ambient_ref])
      throw new Error('Context already defined');
    this[$.$mol_ambient_ref] = next;
  }
  
  static create(init) {
    return new this(init);
  }
  
  static toString() { return this[Symbol.toStringTag] || this.name; }
  
  destructor() { }
  
  toString() {
    return this[Symbol.toStringTag] || this.constructor.name + '()';
  }
  
  toJSON() {
    return this.toString();
  }
}

_a = $.$mol_ambient_ref;
$mol_object2.$ = $;
$.$mol_object2 = $mol_object2;


class Foo extends $.$mol_object2 {
  bar() {
    console.log(123);
  }
}

const foo = new Foo
console.dir(foo);
