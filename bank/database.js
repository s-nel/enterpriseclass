/*
 * Node.js module for accessing a mySQL database and obtaining results
 * from queries.  These results are saved internally as objects.
 *
 * Author: Andrew Popovich (ajp7560@rit.edu)
 */

//Require modules
var mysql = require("mysql");
var util = require("util");
var ownerCreator = require("./owner");
var checkingCreator = require("./checking");


/*
 * getList is responsible for querying the database for all of the
 * checking accounts with owners and calls the callback function, passing
 * in an array of checking account objects.
 * 
 * Parameters: cb - Callback function that will be called with the checking
 *                  account array passed in.
 * Returns: None
 */
function getList(cb){
    
    var connection = mysql.createConnection({
        host: "mentok.se.rit.edu",
        user: "ajp7560",
        password: "at2IcaR0uen5",
        database: "ajp7560",
    });

    var queryString = "select c.account_number, c.balance, o.name " +
                "from Owner as o inner join " +
                "OwnerAccountJoin as oa inner join" +
                " CheckingAccount as c where (o.owner_id = oa.owner_id) and "+
                "(oa.checking_id = c.checking_id) order by c.account_number"; 
    connection.query(queryString, function(err,rows,fields){
        var accounts = createListResults(rows);
        connection.end();
        cb(accounts);
    });

}

/*
 * createListResults creates an array of checking account objects based on the
 * rows passed in from a database query. This function specifically works for
 * the getList query only.
 *
 * Parameters: rows - Rows from a database query result
 * Returns: None
 */
function createListResults(rows){
    var uniqueOwners = {}
    var uniqueChecking = {}
    var checking = [];

    //Loop through all of the rows
    for (var index = 0; index < rows.length; index++){
        var owner = uniqueOwners[rows[index].name];
        var account = uniqueChecking[rows[index].account_number];

        //Check if the owner and account have already been created and stored
        //in the dictionary.
        if(owner == null){
            owner = new ownerCreator.owner(rows[index].name, null, index);
            uniqueOwners[rows[index].name] = owner;
        }
        if(account == null){
            account = new checkingCreator.checkingAccount(
                rows[index].account_number, owner, [], rows[index].balance);
            uniqueChecking[rows[index].account_number] = account;
            checking.push(account);
        } else {
            account.addOwner(owner);
        }
        util.puts(index);
    }
    return checking;
}

exports.getList = getList;
