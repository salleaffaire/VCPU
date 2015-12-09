// Virtual CPU (vcpu.js)
// Author: Luc Martel
// -----------------------------------------------------------
//
// Operation Syntax
// {
//   func:function(output, ...) {}
// }

// ------------------------------------------------------------

require('buffer');


// ------------------------------------------------------------
// Virtual CPU Object
// ------------------------------------------------------------

var vcpu = function(registers, flags, memsize) {
   this.regs = registers;
   this.flags = flags;
   this.instructions = {};

   // Zero all registers and make all registers 32-bit ints
   for (key in this.regs) {
      this.regs[key] = this.regs[key] | 0;
   }
   // Zero all flags and make all registers 32-bit ints
   for (key in this.flags) {
      this.flags[key] = this.flags[key] | 0;
   }   

   // Create memory area and initialize to 0 
   this.memory = new Buffer(memsize);
   this.memory.fill(0);
}

vcpu.prototype.validate_instruction = function(operation) {
   var rval = true;

   console.log(operation.func.toString());

   return rval;
}

vcpu.prototype.read = function(address, reg) {
   this.regs[reg] = memory[address]; 
}
vcpu.prototype.write = function(address, reg) {
   memory[address] = this.regs[reg];
}

vcpu.prototype.add_instruction = function(name, operation) {
   if (this.validate_instruction(operation)) {
      this.instructions[name] = operation;
   }
   else {
      console.log("Instruction " + name + " failled validation");
   }
}

vcpu.prototype.op = function(op_code, d, x, y, z) {
   var op1 = this.regs[x];
   var op2 = this.regs[y];
   var op3 = this.regs[z];

   this.regs[d] = this.instructions[op_code].func.call(this, op1, op2, op3);
}

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


