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

// Exports 
module.exports = vcpu;

