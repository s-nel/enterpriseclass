/*
 * Owner.js represents an owner object that has a name, a list of accounts,
 * and an id.
 * 
 * Author: Andrew Popovich (ajp7560@rit.edu)
 */

/*
 * Owner creates an owner object with a given name, list of accounts, and an
 * id.
 *
 * Parameters: name - String - the name of the owner
 *             accounts - List of acocunt objects - accounts that the owner
 *                        owns
 *             id - Integer - primary id of the owner
 * Returns: this - owner - Owner object representing a bank account owner
 */
function owner(name, accounts, id){
    this.name = name;
    this.accounts = accounts;
    this.id = id;

    this.testPrint = testPrint;
    function testPrint(){
        console.log(this.name);
    }
    
    return this;
}

exports.owner=owner

