
pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import "../SafeMath.sol";

interface GovernorAlphaInterface{
    struct Proposal {
        mapping (address => Receipt) receipts;
    }
    struct Receipt {
        bool hasVoted;
        bool support;
        uint96 votes;
    }
    function state(uint proposalId) external view returns (uint8);
    function getReceipt(uint proposalId, address voter) external view returns(Receipt memory);
    function propose(address[] calldata targets, uint[] calldata values, string[] calldata signatures, bytes[] calldata calldatas, string calldata description) external returns (uint) ;
}

interface IWURZ{
    function deposit(uint256) external;
    function withdraw(uint256) external;
}

interface ITRC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address who) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ProposalUrzReserveFactor {
    using SafeMath for uint256;

    address public _owner;
    address public _cfo = msg.sender;
    address public urzAddress;
    address public wurzAddress;
    bool public onlyOnce = false;

    GovernorAlphaInterface public governorAlpha;
    struct Receipt {
        bool hasVoted;
        bool support;
        uint96 votes;
    }

    event OwnershipTransferred(address  indexed  previousOwner,  address  indexed  newOwner);
    event Withdraw_token(address _caller, address _recievor, uint256 _amount);

    function() external payable {
    }

    constructor(address governorAlpha_, address urz_, address wurz_, address newOwner_ ) public{
        governorAlpha = GovernorAlphaInterface(governorAlpha_);
        _owner = newOwner_;  
        urzAddress = urz_; 
        wurzAddress = wurz_;
    }

    modifier  onlyOwner()  {
        require(msg.sender  ==  _owner);
        _;
    }

    modifier  onlyCFO()  {
        require(msg.sender  ==  _cfo);
        _;
    }

    function createPropose() public returns(bool){
        require(onlyOnce == false,"onlyOnce");
        uint256 balance = ITRC20(urzAddress).balanceOf(address(this));
        if(balance > 100000000e18){
            ITRC20(urzAddress).approve(wurzAddress,balance);
            IWURZ(wurzAddress).deposit(balance);
            _createPropose();
            onlyOnce = true;
            return true;
        }
        return false;
    }

    function _createPropose() internal{ 
        address[] memory targets = new address[](1);
        // nile: uurz: TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E  0x1612121e897936ACC60E399de926cc9cA45e2783
        targets[0] = (0x1612121e897936ACC60E399de926cc9cA45e2783);

        uint256[] memory values = new uint256[](1);
        values[0] = 0;

        string[] memory signatures = new string[](1);
        signatures[0] = ("_setReserveFactor(uint256)"); 

        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encode(0.2e18); //todo: mainnet
        
        string memory description = "set uurz reserve factor";
        governorAlpha.propose(targets,values,signatures,calldatas,description);    
    }

    function  transferOwnership(address newOwner)  public  onlyOwner  {
        require(newOwner  !=  address(0));
        _owner  =  newOwner;
        emit  OwnershipTransferred(_owner,  newOwner);
    }

    function withdrawToken() public onlyOwner {
        _withdrawToken();
    }

    function withdrawTokenCFO() public  onlyCFO {
        _withdrawToken();
    }

    function _withdrawToken() internal {
        uint256 wurzAmount = ITRC20(wurzAddress).balanceOf(address(this));
        if(wurzAmount > 0){
            IWURZ(wurzAddress).withdraw(wurzAmount);
        }
        uint256 urzAmount = ITRC20(urzAddress).balanceOf(address(this));
        if(urzAmount > 0){
            ITRC20(urzAddress).transfer(_owner, urzAmount);
        }
        if(address(this).balance > 0){
            address(uint160(_owner)).transfer(address(this).balance);
        }
        emit Withdraw_token(msg.sender,_owner,urzAmount);
    }

}


