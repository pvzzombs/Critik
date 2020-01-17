/**
 * critik.js v. 0.1.0
 * by pvzzombs
 * deep equal object comparison copied from answer by Jean Vincent
 * https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
 */

var GLOBAL = {
  current: null,
  environment: this,
  seed: Math.floor(Math.random() * 1000),
  suite: [],
  temp: false,
  tempA: [],
  reference_equals: function(){
    var object_references = [];

      return ( this.reference_equals = _reference_equals )( a, b );
      
      function _reference_equals( a, b ) {
        var l = object_references.length;
        
        while ( l-- )
          if ( object_references[ l-- ] === b )
            return object_references[ l ] === a;
        
        object_references.push( a, b );
        
        return null;
      } // _reference_equals()
  },
  _equals: function(a, b, enforce_properties_order, cyclic){
    var toString = Object.prototype.toString;

    // a and b have already failed test for strict equality or are zero
      
    var s, l, p, x, y;
      
    // They should have the same toString() signature
    if ( ( s = toString.call( a ) ) !== toString.call( b ) ) return false;
    
    switch( s ) {
      default: // Boolean, Date, String
        return a.valueOf() === b.valueOf();
      
      case '[object Number]':
        // Converts Number instances into primitive values
        // This is required also for NaN test bellow
        a = +a;
        b = +b;
        
        return a ?         // a is Non-zero and Non-NaN
            a === b
          :                // a is 0, -0 or NaN
            a === a ?      // a is 0 or -O
            1/a === 1/b    // 1/0 !== 1/-0 because Infinity !== -Infinity
          : b !== b        // NaN, the only Number not equal to itself!
        ;
      // [object Number]
      
      case '[object RegExp]':
        return a.source   == b.source
          && a.global     == b.global
          && a.ignoreCase == b.ignoreCase
          && a.multiline  == b.multiline
          && a.lastIndex  == b.lastIndex
        ;
      // [object RegExp]
      
      case '[object Function]':
        return false; // functions should be strictly equal because of closure context
      // [object Function]
      
      case '[object Array]':
        if ( cyclic && ( x = this.reference_equals( a, b ) ) !== null ) return x; // intentionally duplicated bellow for [object Object]
        
        if ( ( l = a.length ) != b.length ) return false;
        // Both have as many elements
        
        while ( l-- ) {
          if ( ( x = a[ l ] ) === ( y = b[ l ] ) && x !== 0 || _equals( x, y ) ) continue;
          
          return false;
        }
        
        return true;
      // [object Array]
      
      case '[object Object]':
        if ( cyclic && ( x = this.reference_equals( a, b ) ) !== null ) return x; // intentionally duplicated from above for [object Array]
        
        l = 0; // counter of own properties
        
        if ( enforce_properties_order ) {
          var properties = [];
          
          for ( p in a ) {
            if ( a.hasOwnProperty( p ) ) {
              properties.push( p );
              
              if ( ( x = a[ p ] ) === ( y = b[ p ] ) && x !== 0 || _equals( x, y ) ) continue;
              
              return false;
            }
          }
          
          // Check if 'b' has as the same properties as 'a' in the same order
          for ( p in b )
            if ( b.hasOwnProperty( p ) && properties[ l++ ] != p )
              return false;
        } else {
          for ( p in a ) {
            if ( a.hasOwnProperty( p ) ) {
              ++l;
              
              if ( ( x = a[ p ] ) === ( y = b[ p ] ) && x !== 0 || _equals( x, y ) ) continue;
              
              return false;
            }
          }
          
          // Check if 'b' has as not more own properties than 'a'
          for ( p in b )
            if ( b.hasOwnProperty( p ) && --l < 0 )
              return false;
        }
        
        return true;
      // [object Object]
    } // switch toString.call( a )
  },
  equals: function(a, b, enforce_properties_order, cyclic){
    return a === b && a !== 0 || this._equals(a, b, enforce_properties_order, cyclic);
  }
};
function CONDITIONS(object){
  this.type = typeof object;
  this.value = object;
  this.empty = false;
}

var NOTC = {
  nothing: function(){
    GLOBAL.temp = !this.empty;
    return !this.empty;
  },
  toBe: function(object){
    GLOBAL.temp = this.value !== object;
    return this.value !== object;
  },
  toBeDefined: function(){
    GLOBAL.temp = this.value === undefined;
    return this.value === undefined;
  },
  toBeFalse: function(){
    GLOBAL.temp = this.value !== false;
    return this.value !== false;
  },
  toBeFalsy: function(){
    GLOBAL.temp = !((typeof this.value === 'number' && this.value === 0)
    || (typeof this.value === 'object' && this.value === null)
    || (typeof this.value === "undefined" && this.value === undefined)
    || (typeof this.value === "boolean" && this.value === false)
    || (typeof this.value === 'number' && isNaN(this.value))
    || (typeof this.value === 'string' && this.value === ""));
    return !((typeof this.value === 'number' && this.value === 0)
     || (typeof this.value === 'object' && this.value === null)
     || (typeof this.value === "undefined" && this.value === undefined)
     || (typeof this.value === "boolean" && this.value === false)
     || (typeof this.value === 'number' && isNaN(this.value))
     || (typeof this.value === 'string' && this.value === ""));
  },
  toBeInstanceOf: function(object){
    GLOBAL.temp = !(this.value instanceof object);
    return !(this.value instanceof object);
  },
  toBeNaN: function(){
    GLOBAL.temp = !isNaN(this.value);
    return !isNaN(this.value);
  },
  toBeNegativeInfinity: function(){
    GLOBAL.temp = this.value !== -Infinity;
    return this.value !== -Infinity;
  },
  toBePositiveInfinity: function(){
    GLOBAL.temp = this.value !== Infinity;
    return this.value !== Infinity;
  },
  toEqual: function(object, enforce_properties_order, cyclic){
    var result = false;
    var value = object;

    result = !GLOBAL.equals(this.value, value, enforce_properties_order, cyclic);
    GLOBAL.reference_equals = function(){
      var object_references = [];
        
        return ( this.reference_equals = _reference_equals )( a, b );
        
        function _reference_equals( a, b ) {
          var l = object_references.length;
          
          while ( l-- )
            if ( object_references[ l-- ] === b )
              return object_references[ l ] === a;
          
          object_references.push(a, b);
          
          return null;
        }
    };
    GLOBAL.temp = result;
    return result;
  },
  toBeTrue: function(){
    GLOBAL.temp = this.value !== true;
    return this.value !== true;
  },
  toBeTruthy: function(){
    GLOBAL.temp = this.toBeFalsy();
    return this.toBeFalsy();
  },
  toBeUndefined: function(){
    GLOBAL.temp = this.value !== undefined;
    return this.value !== undefined;
  }
};
CONDITIONS.prototype = {
  nothing: function(){
    GLOBAL.temp = this.empty;
    return this.empty;
  },
  toBe: function(object){
    GLOBAL.temp = this.value === object;
    return this.value === object;
  },
  toBeDefined: function(){
    GLOBAL.temp = this.value !== undefined;
    return this.value !== undefined;
  },
  toBeFalse: function(){
    GLOBAL.temp = this.value === false && typeof this.value === "boolean";
    return this.value === false && typeof this.value === "boolean";
  },
  toBeFalsy: function(){
    GLOBAL.temp = (typeof this.value === 'number' && this.value === 0)
    || (typeof this.value === 'object' && this.value === null)
    || (typeof this.value === "undefined" && this.value === undefined)
    || (typeof this.value === "boolean" && this.value === false)
    || (typeof this.value === 'number' && isNaN(this.value))
    || (typeof this.value === 'string' && this.value === "");
    return (typeof this.value === 'number' && this.value === 0)
     || (typeof this.value === 'object' && this.value === null)
     || (typeof this.value === "undefined" && this.value === undefined)
     || (typeof this.value === "boolean" && this.value === false)
     || (typeof this.value === 'number' && isNaN(this.value))
     || (typeof this.value === 'string' && this.value === "");
  },
  toBeInstanceOf: function(object){
    GLOBAL.temp = this.value instanceof object;
    return this.value instanceof object;
  },
  toBeNaN: function(){
    GLOBAL.temp = typeof this.value === "number" && this.value !== this.value;
    return typeof this.value === "number" && this.value !== this.value;
  },
  toBeNegativeInfinity: function(){
    GLOBAL.temp = this.value === -Infinity;
    return this.value === -Infinity;
  },
  toBePositiveInfinity: function(){
    GLOBAL.temp = this.value === Infinity;
    return this.value === Infinity;
  },
  toEqual: function(object, enforce_properties_order, cyclic){
    var result = false;
    var value = object;

    result = GLOBAL.equals(this.value, value, enforce_properties_order, cyclic);
    GLOBAL.reference_equals = function(){
      var object_references = [];
        
        return ( this.reference_equals = _reference_equals )( a, b );
        
        function _reference_equals( a, b ) {
          var l = object_references.length;
          
          while ( l-- )
            if ( object_references[ l-- ] === b )
              return object_references[ l ] === a;
          
          object_references.push(a, b);
          
          return null;
        }
    };
    GLOBAL.temp = result;
    return result;
  },
  toBeTrue: function(){
    GLOBAL.temp = this.value === true && typeof this.value === "boolean";
    return this.value === true && typeof this.value === "boolean";
  },
  toBeTruthy: function(){
    GLOBAL.temp = !this.toBeFalsy();
    return !this.toBeFalsy();
  },
  toBeUndefined: function(){
    GLOBAL.temp = this.value === undefined;
    return this.value === undefined;
  },
  not: NOTC
};

function expect(object){
  var temp = new CONDITIONS(object);
  
  if(typeof object === "undefined"){
    temp.empty = true;
    NOTC.empty = true;
  }
  NOTC.empty = false;
  NOTC.value = object;
  NOTC.type = typeof object;
  return temp;
}

function it(string, func){
  func();
  var obj = {
    description: string,
    result: false
  };
  obj.result = GLOBAL.temp;

  GLOBAL.temp = false;
  GLOBAL.tempA.push(obj);
  return obj;
}

function describe(string, func){
  func();
  GLOBAL.suite.push({
    description: string,
    results: GLOBAL.tempA
  });
  GLOBAL.tempA = [];
  return true;
}

function critik(func){
  var i = 0;
  var ilength = GLOBAL.suite.length;
  var j;
  var jlength;
  var bool = true;
  for(i = 0; i < ilength; i++){
    jlength = GLOBAL.suite[i].results.length;
    for(j = 0; j < jlength; j++){
      if(!GLOBAL.suite[i].results[j].result){
        bool = false;
      }
    }
    
  }
  if(func){
    func(bool);
  }
  return bool;
}