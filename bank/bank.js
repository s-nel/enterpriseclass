/*
 * Main Interface for Node.js Bank Application.
 *
 * Author: Andrew Popovich (ajp7560@rit.edu)
 */

//Required Modules
var database = require("./database");
var util = require("util");
var readline = require("readline");

/*
 * Displays text surrounding system usage when called.
 */
function help(){};

/*
 * Main function that runs the entire program.  Initializes and displays
 * a prompt and query results.
 */
function main(){
    console.log("Welcome to the Banking Application.");
    var input = "";
    util.print("Bank> ");
    
    var read = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    read.setPrompt("Bank> ");
    read.prompt();

    //Loops until 'quit' is entered
    read.on('line', function(text){
        switch(text.trim()){
            case 'quit':
                process.exit();
                break;
            case 'list':
                database.getList(function(accounts){
                    for(var i = 0; i < accounts.length; i++){
                        accounts[i].printAccountInfo();
                        util.puts("");
                    }
                    read.prompt();
                });
                break;
            default:
                read.prompt();
        }
    });
}

main();

