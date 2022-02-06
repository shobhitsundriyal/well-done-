// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract WellDone {
    address owner;

    mapping (address=>bool) activeWork; // Is person is active on some work already
    mapping (address => uint) nextDeadline; // next deadline timestamp
    mapping (address => uint) leavesLeft; // Leave days left
    mapping (address => uint) daysOfWorkLeft; // no of days left to work
    mapping (address => uint) commitingDays; // total days
    mapping (address => uint) startTime;
    mapping (address => string) projectName; //ongoing project name
    mapping (address => uint) currentIdx; // index of current project

    uint hours24 = 86400;
    uint public costOfService = 0.01 ether; //change
    uint public forOwner;

    struct ProjectsCreated {//what to do with this???
        address by;
        string pName;
        uint8 status; //1-> running, 0->finished, 2->dropped
    }
    struct DailyLogs {
        address by;
        string pName;
        uint day;
        string description;
        string link;
    }

    ProjectsCreated [] public allProjectsArr;
    DailyLogs [] public allLogs;
    //event projects (address indexed by, string project); // for project working on, emit when starts on new project
    //event dailyLogs(address indexed by, string indexed project, uint day, string link);

    constructor() {
        owner == msg.sender;
        allLogs.push(DailyLogs(owner, 'Init', 0,'No description', 'special.link'));
    }

    function startProject(string memory _projectName, uint64 _daysOfCommitment) public payable {
        require(activeWork[msg.sender] == false, 'You are already working on project, First finish that');
        require(msg.value == costOfService, 'please check the service cost');
        activeWork[msg.sender] = true;
        projectName[msg.sender] = _projectName;
        daysOfWorkLeft[msg.sender] = _daysOfCommitment;
        commitingDays[msg.sender] = _daysOfCommitment;
        startTime[msg.sender] = block.timestamp;
        nextDeadline[msg.sender] = block.timestamp + hours24;
        forOwner += msg.value/10;

        if(_daysOfCommitment < 10){
            leavesLeft[msg.sender] = 1;
        }
        else {
            leavesLeft[msg.sender] = _daysOfCommitment/10; //floor 10% of days maximum leaves.
        }

        allProjectsArr.push(ProjectsCreated(msg.sender, _projectName, 1)); //started running
        currentIdx[msg.sender] = allProjectsArr.length - 1;
    }

    function submitTodayWork(string memory _shortDesc, string memory _link) public returns (string memory){
        if (block.timestamp > nextDeadline[msg.sender]) {
            forOwner += costOfService*9/10; //already added 10% at time of project creation
            //currentIdx[msg.sender] = -1; dont need I think
            allLogs.push(DailyLogs(msg.sender, projectName[msg.sender], commitingDays[msg.sender] - daysOfWorkLeft[msg.sender], _shortDesc, _link));
            resetThings(msg.sender, 2);
            return 'The deadline has passed, your current project will be dropped';
        }
        // if 'in between project' set values
        if(daysOfWorkLeft[msg.sender] == 1){
            //final submission
            allLogs.push(DailyLogs(msg.sender, projectName[msg.sender], commitingDays[msg.sender], _shortDesc, _link));
            resetThings(msg.sender, 0);
            payable(msg.sender).transfer(costOfService*9/10);
            return 'Well Done Taliyaan Honi chaiye aapke liye';
            // nft send
        }
        nextDeadline[msg.sender] += hours24;
        daysOfWorkLeft[msg.sender] -= 1;
        allLogs.push(DailyLogs(msg.sender, projectName[msg.sender], commitingDays[msg.sender] - daysOfWorkLeft[msg.sender], _shortDesc, _link));
        return 'Awesome, Keep being consistent';
    }

    function takeALeave() public {
        require(leavesLeft[msg.sender]>0, 'You dont have any leaves left');
        leavesLeft[msg.sender] -= 1;
        nextDeadline[msg.sender] += hours24;
    }

    function timeLeft() public view returns(uint) {
        require(activeWork[msg.sender] == true);
        require(nextDeadline[msg.sender]> block.timestamp, 'Time UP!!!!');
        return nextDeadline[msg.sender] - block.timestamp ;
    }

    function takeBalance() public {
        require(msg.sender == owner);
        payable(owner).transfer(forOwner);
    }

    function myNextDeadline() public view returns(uint){
        return nextDeadline[msg.sender];
    }
    function myLeavesLeft() public view returns(uint){
        return leavesLeft[msg.sender];
    }
    function myDaysOfWorkLeft() public view returns(uint){
        return daysOfWorkLeft[msg.sender];
    }

    function resetThings(address _addr, uint8 _status) internal {
        activeWork[_addr] = false;
        allProjectsArr[currentIdx[_addr]].status = _status;
        nextDeadline[_addr] = 0; 
        leavesLeft[_addr] = 0; 
        daysOfWorkLeft[_addr] = 0; 
        commitingDays[_addr] = 0; 
        startTime[_addr] = 0;
    }
}