import React, { useState, useEffect } from 'react'
import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from '../Utils/Constants';
import Loader from './Loader/Loader';
import { useAlert } from 'react-alert';
import { Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, Typography } from '@mui/material';
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import supplierData from '../supplierData.json'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SendRequestToSupplier = ({ }) => {
  const alert = useAlert();
  const [selectedRows, setSelectedRows] = useState([]);
  const [quantityInputs, setQuantityInputs] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const handleOpenDialog = () => {
    setSelectedTransporter(null);
    setSelectedInspector(null);
    setSelectedSupplier(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [openDialog, setOpenDialog] = useState(false);

  const { Services, rawMaterials } = useContext(ContractContext);
  const { account } = useContext(AuthContext);

  const handleRowSelect = (name) => {
    if (selectedRows.includes(name)) {
      setSelectedRows(selectedRows.filter(row => row !== name));
      setQuantityInputs({ ...quantityInputs, [name]: undefined });
    } else {
      setSelectedRows([...selectedRows, name]);
      setQuantityInputs({ ...quantityInputs, [name]: 1 }); // Initialize quantity to 1
    }
  };

  const handleQuantityChange = (name, value) => {
    setQuantityInputs({ ...quantityInputs, [name]: value });
  };

  const handleCreateButtonClick = async () => {
    // Check if entered quantity exceeds given quantity
    // const selectedData = meds.filter(item => selectedRows.includes(item.name));
    setisLoading(true)
    const selectedData = rawMaterials.filter(item => selectedRows.includes(item.name));
    console.log("Selected data is1: ", JSON.stringify(selectedData));


    const selectedMedicineDetails = selectedData.map(item => {
      const enteredQuantity = quantityInputs[item.name] || 0;
      return {
        name: item.name,
        medpic: item.ipfs_hash,
        meddesc: item.description,
        quantity: enteredQuantity,
        materialId: item.materialId,
      };
    });

    console.log("Selected data is2:", JSON.stringify(selectedMedicineDetails));
    const matids = selectedMedicineDetails.map(item => item.materialId);
    const quantities = selectedMedicineDetails.map(item => item.quantity);

    console.log("matids: ", matids);
    console.log("quantities: ", quantities);


    const response = await Services.request_raw_material_package(matids, quantities, "description",
      "0x5bE647fb574facd843dE2d5dDBca4d5458eda411",
      "0xeDe9f960f03c93163604a3689B1750B99E01eb28",
      "0x2D52362963D9A8D8bD27Bc89d19dca013eB92356");
    setisLoading(false)
    // if (response.status) {
    alert.success("Request Sent")
    // } else {
    // alert.error("RequesF failed")
    // }

  };

  return (
    <>
      <Loader isLoading={isLoading} />
      {!isLoading && (<div>
        <div class="searchBox">

          <input class="searchInput" type="text" name="" placeholder="Search something"
            value={searchValue} // Bind the value to the searchValue state
            onChange={(e) => setSearchValue(e.target.value)} />
          <button class="searchButton" href="#">



            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
              <g clip-path="url(#clip0_2_17)">
                <g filter="url(#filter0_d_2_17)">
                  <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
                </g>
              </g>
              <defs>
                <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                  <feOffset dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
                </filter>
                <clipPath id="clip0_2_17">
                  <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
                </clipPath>
              </defs>
            </svg>


          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Raw Material Name</th>
              <th>Raw Material Picture</th>
              <th>Raw Material Description</th>

              <th>Enter Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* {meds.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) */}
            {rawMaterials.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map(item => (
              <tr key={item.name}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.name)}
                    onChange={() => handleRowSelect(item.name)}
                    style={{ cursor: "pointer" }}

                  />
                </td>
                <td>{item.name}</td>
                <td><img src={`${CONSTANTS.IPFSURL}/${item.ipfs_hash}`} height={100} width={100} /></td>
                <td>{item.description}</td>
                <td>
                  <input
                    type="number"
                    value={quantityInputs[item.name] || ''}
                    onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
                    disabled={!selectedRows.includes(item.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='button-container'>
          <button className='button0' onClick={handleCreateButtonClick} disabled={selectedRows.length ? false : true}><p>Send Request</p></button>
        </div>
        <Dialog sx={{ backdropFilter: "blur(10px)" }} TransitionComponent={Transition} open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation Details</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: "8px" }}>
              Are you sure you want to send the package?
            </DialogContentText>
            <Typography variant="subtitle1">Choose a Transporter : </Typography>

            {transporterData.map((transporter) => (
              <Button
                key={transporter.id}
                variant="outlined"
                onClick={() => setSelectedTransporter(transporter)}
                style={{ margin: "8px" }}
                color="success"
              >
                {transporter.name}
              </Button>
            ))}

            {selectedTransporter && (
              <Card sx={{ marginTop: "16px", width: "500px" }}>
                <CardHeader
                  title={selectedTransporter.name}
                  subheader={selectedTransporter.id}
                />
              </Card>
            )}
            <Divider sx={{ marginTop: "10px" }} />
            <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
              Choose an Inspector :{" "}
            </Typography>
            {inspectorData.map((inspector) => (
              <Button
                key={inspector.id}
                variant="outlined"
                onClick={() => setSelectedInspector(inspector)}
                style={{ margin: "8px" }}
                color="success"
              >
                {inspector.name}
              </Button>
            ))}

            {selectedInspector && (
              <Card sx={{ marginTop: "16px", width: "500px" }}>
                <CardHeader
                  title={selectedInspector.name}
                  subheader={selectedInspector.id}
                />
              </Card>
            )}
            <Divider sx={{ marginTop: "10px" }} />
            <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
              Choose an Supplier :{" "}
            </Typography>
            {supplierData.map((supplier) => (
              <Button
                key={supplier.id}
                variant="outlined"
                onClick={() => setSelectedSupplier(supplier)}
                style={{ margin: "8px" }}
                color="success"
              >
                {supplier.name}
              </Button>
            ))}

            {selectedSupplier && (
              <Card sx={{ marginTop: "16px", width: "500px" }}>
                <CardHeader
                  title={selectedSupplier.name}
                  subheader={selectedSupplier.id}
                />
              </Card>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            {selectedTransporter && selectedInspector && selectedSupplier && (
              <Button color="primary" autoFocus>
                Send
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>)}
    </>
  );
}

export default SendRequestToSupplier
