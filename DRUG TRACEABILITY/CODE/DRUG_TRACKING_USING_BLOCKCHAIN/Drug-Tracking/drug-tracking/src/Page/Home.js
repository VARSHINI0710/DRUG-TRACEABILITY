import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
   const [Id, setId] = useState("");
   const [DrugName, setDrugName] = useState("");
   const [Manufacturer, setManufacturer] = useState("");
   const [date, setDate] = useState("");
   const [TranId, setTranId] = useState("");
   const [Owner, setOwner] = useState("");
   const [BookId, setBookId] = useState("");
   const [BookDet, setBookDet] = useState("");
   const [Wallet, setWallet] = useState("");


 
   const handleId = (e) => {
      setId(e.target.value)
   } 

   const handleDrugName = (e) => {
      setDrugName(e.target.value)
   } 

   const handleManufacturer = (e) => {
      setManufacturer(e.target.value)
   } 

   const handleDate = (e) => {
      setDate(e.target.value)
   }

   const handleDrugManufacture = async () => {
      try {
         let tx = await contract.manufactureDrug(Id.toString(), DrugName, Manufacturer, date)
         let wait = await tx.wait()
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }

   const handleDrugId = (e) => {
      setTranId(e.target.value)
   }

   const handleNewOwner = (e) => {
      setOwner(e.target.value)
   } 

   const handleTransfer = async () => {
      try {
         let tx = await contract.transferDrugOwnership(TranId.toString(), Owner)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)   
      }
   }

   const handleDrugDetailId = (e) => {
      setBookId(e.target.value)
   }

   const handleDrugDetails = async () => {
      try {
         let tx = await contract.getDrugDetails(BookId.toString())
         
         let arr = []
         tx.map(e => {
            arr.push(e)
         })
         
         console.log(tx);
         setBookDet(arr)
      } catch (error) {
         alert(error)
         console.log(error);
      }
   }

   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Drug Tracking Using Blockchain</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>
     <Col style={{marginRight:"100px"}}>
      <div>

      
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleId} type="number" placeholder="Enter Drug Id" value={Id} /> <br />
     
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleDrugName} type="string" placeholder="Enter drug Name" value={DrugName} /> <br />
     
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleManufacturer} type="string" placeholder="Enter Drug manufacturer" value={Manufacturer} /><br />
      
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleDate} type="number" placeholder="Enter Drug manufacturing date" value={date} /><br />

       <Button onClick={handleDrugManufacture} style={{ marginTop: "10px" }} variant="primary">Manufacture Drug</Button>
      </div>
     </Col>
      <Col>
         <div>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleDrugId} type="number" placeholder="Enter Drug Id" value={TranId} /> <br />

                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleNewOwner} type="string" placeholder="Enter metamask address" value={Owner} /><br />

                   <Button onClick={handleTransfer} style={{ marginTop: "10px" }} variant="primary">Transfer Drug ownership</Button>

         </div>
      </Col>    
   </Row>
   <Row style={{marginTop:"100px"}}>
     <Col >
       <div style={{ margin:"auto" }}>
         <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleDrugDetailId} type="number" placeholder="Enter Drug Id" value={BookId} /><br /> 

        <Button onClick={handleDrugDetails} style={{ marginTop: "10px" }} variant="primary">Get Drug Details</Button> 
      {BookDet ? BookDet?.map(e => {
          return <p>{e.toString()}</p>
       }) : <p></p>}
      </div>
     </Col>
   </Row>
    
    
   </Container>

  </div>
 )
}

export default Home;
