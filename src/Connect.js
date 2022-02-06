import abi from "./abi/abi.json" assert { type: "json" };

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({ method:"eth_requestAccounts" });
   
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
        abi,
         "0x4786EbFd88e4C4e2Eb7AE5bD46C719a880B6d3B6"
        );

    web3.eth.getAccounts().then((accounts) => {
          contract.methods
          .totalSupply()
          .call({from: accounts[0] })
          .then((supply) => {
              contract.methods
              .getBUildings()
              .call({ from: accounts[0] })
              .then((data) =>{
                res({supply: supply, buildings: data });
              });
           });          
        });
});

export default connect;
