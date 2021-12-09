pragma solidity ^0.5.0;

contract SimpleStorage {

    // This will be visable to the public and used outside of a function
    // stored on blockchain contract
    string public data;


    // setter function that sets the data variable to whatever is in paramater
    function set(string memory _data) public {
        data = _data;
    }

    // getter that will crap value from blockchain
    // view = static value hard coded in contract
    // pure = static value hard coded in function
    function get() view public returns(string memory){
        return data;
    }

}