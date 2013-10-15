/*
 * Checking.js represents a checking account in a bank system that has an
 * owner, balance, number, and a list of transactions.
 *
 * Author: Andrew Popovich (ajp7560@rit.edu)
 */

//Required modules
var util = require("util");

/*
 * checkingAccount creates an object that represents a checking account that
 * has a number, an owner, a balance, and a list of transactions.
 *
 * Parameters: account_number - String - String representation of an account
 *                                       number
 *             owner - owner - an owner object representing an owner of the
 *                             account
 *             transaction - transaction - transaction object representing a
 *                                         transaction
 *             balance - float - float value with a percision of 2 decimal
 *                               places representing the balance of the 
 *                               account
 * Returns: this - checkingAccount - checkingAccount object representing a
 *                                   checking account
 */
function checkingAccount(account_number, owner, transactions, balance){
    this.account_number = account_number;
    this.owners = [owner];
    this.transcations = transactions;
    this.balance = balance;

    //Adds an owner to the checking account
    this.addOwner = addOwner;
    function addOwner(owner){
        this.owners.push(owner);
    }

    //Adds a transaction object to the checking account
    this.addTransaction = addTransaction;
    function addTransaction(transaction){
        this.transactions.push(transaction);
    }

    //Prints basic account info
    this.printAccountInfo = printAccountInfo;
    function printAccountInfo() {
        util.puts("Account: " + this.account_number);
        util.puts("Balance: " + this.balance.toFixed(2));
        util.print("Owners: ");
        var spacing = "";
        for(var i = 0; i < this.owners.length; i++){
            util.puts(spacing + this.owners[i].name);
            spacing = "        ";
        }
    }

    return this;
}

exports.checkingAccount=checkingAccount;
