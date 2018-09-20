pragma solidity ^0.4.17;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    function mul(uint a, uint b) internal pure returns (uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint a, uint b) internal pure returns (uint) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }

    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Project {
    using SafeMath for uint;

    //引用类型
    struct Payment {
        string description;
        uint amount;
        address receiver; //接收方地址
        bool completed; //支付是否完成
        mapping(address => bool) voters;
        uint voterCount;
    }
    
    address public owner; //项目方
    string public description;//项目描述
    uint public minInvest;//最小投资金额
    uint public maxInvest;//最大投资金额
    uint public goal;//目标金额
    
    mapping(address => uint) public investors;
    uint public investorCount;
    
    Payment[] public payments;//支付列表

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    constructor(string _description, uint _minInvest, uint _maxInvest, uint _goal) public {
        owner = msg.sender; //msg 是关键词， 全局变量， 这里是项目方的发起人
        description = _description;
        minInvest = _minInvest;
        maxInvest = _maxInvest;
        goal = _goal;
    }

    //投资人开始提交投资
    function contribute() public payable {
        require(msg.value >= minInvest);
        require(msg.value <= maxInvest);

        //? how to understand? 当前合约转换为address类型
        //直接写this.balance也是可以的
        
        uint newBalance = 0;
        newBalance = address(this).balance.add(msg.value);
        require(newBalance <= goal);


        investors[msg.sender] = msg.value;
        investorCount += 1;

    }

    //发起资金支出请求
    function createPayment(string _description, uint _amount, address _receiver) ownerOnly public {

        //? how to understand?
        Payment memory newPayment = Payment({
            description: _description, 
            amount: _amount, 
            receiver: _receiver,
            completed: false,
            voterCount: 0
        });

        payments.push(newPayment);

    }

    //投资人投票是否同意支付
    function approvePayment(uint index) public {
        Payment storage payment = payments[index];

        //must be investor to vote
        //从投资人列表里找出是否包含当前操作人的地址
        require(investors[msg.sender] > 0);

        //can not vote twice
        //从支付的投票人里寻找是否包含当前操作者
        
        require(!payment.voters[msg.sender]);

        payment.voters[msg.sender] = true;
        payment.voterCount += 1;
    }

    //执行支付
    function doPayment(uint index) ownerOnly public {

        //找到该待支付
        Payment storage payment = payments[index];

        require(!payment.completed);//支付还没有完成
        //帐户余额检查
        require(address(this).balance >= payment.amount);
        require(payment.voterCount > (investorCount / 2)); //超过一半投资人同意

        payment.receiver.transfer(payment.amount);
        payment.completed = true;
    }

}