# Critik  
A simple javascript testing framework for browser

### How to use  
Include critik.js on your ``html`` document.  

### Creating a simple test
Let's try to test whether 0.1 + 0.2 in ``javascript`` is equal to 0.3 exactly.  
First create a description using ``describe`` function. It takes 2 argument, a description ``string`` and a function ``callback``.  
Inside the description is a statement in the form of ``it`` function. It takes 2 arguments, a description ``string`` and a function ``callback``  
Inside the statement is an expectation, where the test should began. It is in the form of ``expect(``**object1**``).``**condition**``(``**object2**``)``.  
  
### Example
```javascript
describe("A simple test whether 0.1 + 0.2 equals 0.3 in javascript exactly", function(){
  it("should be 0.3 when 0.1 is added to 0.2", function(){
    expect(0.1+0.2).toBe(0.3);
  });
});
```   
After that, to tell whether the test passed or failed, call the ``critik`` function to verify.  
```javascript
/// ...
console.log("The test passed: " + critik());
```  
**The test should fail** because in javascript ``0.1 + 0.2 === 0.30000000000000004``.  
We can also pass the test since we already know our expectation that it should be ``0.30000000000000004`` using the ``not`` object.
```javascript
describe("A simple test whether 0.1 + 0.2 equals 0.3 in javascript exactly", function(){
  it("should be 0.3 when 0.1 is added to 0.2", function(){
    expect(0.1+0.2).not.toBe(0.3);
  });
});
//critik();
```   
If you call the ``critik`` function and get its result, you should get ``true`` now.  Great!
  
### How to access the results manually?  
If you were to create a reporter, you can access result ``boolean`` by using ``GLOBAL.suite[i].results[j].result``, where ``i`` and ``j`` are iterators.  

  
### Reporting Bugs, Errors and Requesting new Features
If you want to improve this repo, you can submit it through the ``Issues``. Make sure to explain it well and easily reproducible so that solving errors will be easy.

## ENJOY!!! 
### documentation are coming soon...
