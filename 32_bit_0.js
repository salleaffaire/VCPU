// Virtual CPU Example
//
var vcpu = require('./vcpu.js');

// ------------------------------------------------------------
// ------------------------------------------------------------

// Creating a CPU instance
// ------------------------------------------------------------

cpu1 = new vcpu({ax:4, bx:0, cx:0, dx:0}, 
                {x:0, o:0},
                1024);

// Adding instructions
// ------------------------------------------------------------
// add_inctsurciton take a string as the first paramater to 
// denote the operation mnemonic.
// The second paramater is a function that takes up to 3 
// operands and returns the result
// Note that the operations will be called like this
//
//   ::: mnemonic dest op1 op2 op3 ::: 
// which will yeild internally to 
// dest = function(op1, op2, op3)
//
// Within the Virtual CPU object, the mnemonic function
// will be called with the context being set to the object
// itself so note that flags are available within the 
// function through this.flags."flag_name"
//

cpu1.add_instruction("not", {func:function(x) {
   return ~x;
}});
cpu1.add_instruction("inc", {func:function(x) {
   if (x+1 === 0) this.flags.o = 1;
   return x+1;
}});
cpu1.add_instruction("add", {func:function(x, y) {
   return x+y;
}});
cpu1.add_instruction("sub", {func:function(x, y) {
   return x-y;
}});
cpu1.add_instruction("xor", {func:function(x, y) {
   return x^y;
}});

// ------------------------------------------------------------


// Program
// ------------------------------------------------------------
cpu1.op("not", "ax", "ax");
cpu1.op("inc", "bx", "bx");
cpu1.op("inc", "cx", "cx");
cpu1.op("inc", "cx", "cx");
cpu1.op("add", "dx", "bx", "cx");

console.log(cpu1);
