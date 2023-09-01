import React, { useEffect, useState } from "react";
import wholeSalerData from "../wholesaler.json";
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import "./CreateNewBatch.css";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledInput = styled(Input)(
  ({ theme }) => `
  
  .${inputClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]
    };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const CreateNewBatch = ({ jsonData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [quantityInputs, setQuantityInputs] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);
  const [concentrationStageOne, setConcentrationStageOne] = useState(0);
  const [pressureStageOne, setPressureStageOne] = useState(0);
  const [densityStageOne, setDensityStageOne] = useState(0);
  const [volumeStageOne, setVolumeStageOne] = useState(0);
  const [concentrationStageTwo, setConcentrationStageTwo] = useState(0);
  const [pressureStageTwo, setPressureStageTwo] = useState(0);
  const [densityStageTwo, setDensityStageTwo] = useState(0);
  const [volumeStageTwo, setVolumeStageTwo] = useState(0);
  const [concentrationStageThree, setConcentrationStageThree] = useState(0);
  const [pressureStageThree, setPressureStageThree] = useState(0);
  const [densityStageThree, setDensityStageThree] = useState(0);
  const [volumeStageThree, setVolumeStageThree] = useState(0);
  const [estimatedcost, setestimatedcost] = useState(0)
  const [productionRatePerDay, setproductionRatePerDay] = useState(0)
  const [selectedData, setselectedData] = useState([])
  // console.log("quantity inputs"+JSON.stringify(quantityInputs))
  console.log("selected data" + JSON.stringify(selectedData))



  const [meds, setmeds] = useState([]);

  let { account } = useContext(AuthContext);
  let { Services, medicines } = useContext(ContractContext);


  console.log(medicines)




  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleRowSelect = (name) => {
    if (selectedRows.includes(name)) {
      setSelectedRows(selectedRows.filter((row) => row !== name));
      setQuantityInputs({ ...quantityInputs, [name]: undefined });
    } else {
      setSelectedRows([...selectedRows, name]);
      setQuantityInputs({ ...quantityInputs, [name]: 1 }); // Initialize quantity to 1
    }
  };

  const handleQuantityChange = (name, value) => {
    setQuantityInputs({ ...quantityInputs, [name]: value });
  };

  const handleCreateButtonClick = () => {
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
    // Check if entered quantity exceeds given quantity
    const selectedData = medicines.filter((item) =>
      selectedRows.includes(item.name)
    );
    setselectedData(selectedData)

    const hasExceededQuantity = selectedData.some(
      (item) => quantityInputs[item.name] > item.totalQuantity
    );

    if (hasExceededQuantity) {
      console.error("Entered quantity exceeds available quantity.");
      return;
    }

    // console.log("selected row "+ selectedRows)


  };

  const handleSendBatch = async () => {
    // Send batch to blockchain

    if (!selectedTransporter || !selectedInspector || !selectedWholesaler || !concentrationStageOne || !concentrationStageTwo || !concentrationStageThree || !densityStageOne || !densityStageTwo || !densityStageThree || !volumeStageOne || !volumeStageTwo || !volumeStageThree || !pressureStageOne || !pressureStageTwo || !pressureStageThree) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (!account) {
      return
    }

    const idealstage1conditions = [concentrationStageOne, pressureStageOne, densityStageOne, volumeStageOne];
    const idealstage2conditions = [concentrationStageTwo, pressureStageTwo, densityStageTwo, volumeStageTwo];
    const idealstage3conditions = [concentrationStageThree, pressureStageThree, densityStageThree, volumeStageThree];

    console.log("idealstage1conditions" + idealstage1conditions);
    console.log("idealstage2conditions" + idealstage2conditions);
    console.log("idealstage3conditions" + idealstage3conditions);
    console.log("selectedData: ",selectedData);

    const medids = selectedData.map((item) => item.medicineId);
    const quantityarray = selectedData.map((item) => quantityInputs[item.name]);
    console.log("medids" + medids);
    console.log("quantityarray" + quantityarray);


    try {
      const response = await Services.create_batch(
        medids,
        quantityarray,
        estimatedcost, 
        productionRatePerDay, 
        idealstage1conditions,
        idealstage2conditions,
        idealstage3conditions,
        // selectedInspector.id,
        // selectedTransporter.id,
        // selectedWholesaler.id,
        "0xE8Dc9F3cecc1E7DD7737001f1987cc2813246A93",
        "0xAB6bDA0a4e847Af362d54f88cC3663C219688c27",
        "0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"

      );
      console.log(response);

      if (response.success) {
        alert("Batch created successfully.");
      }
      else {
        alert("Error creating batch.");
      }
    }
    catch (error) {
      console.log(error);
    }





    setOpenDialog(false);
  };
  return (
    <div>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search something"
          value={searchValue} // Bind the value to the searchValue state
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button class="searchButton" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Medecine Name</th>
            <th>Medecine Image</th>
            <th>Medecine Description</th>
            <th>Medecine Quantity</th>
            <th>Enter Quantity</th>
          </tr>
        </thead>
        <tbody>
          {medicines
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <tr key={item.name}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.name)}
                    onChange={() => handleRowSelect(item.name)}
                  />
                </td>
                <td>{item.name}</td>
                <td><img src={`${CONSTANTS.IPFSURL}/${item.ipfs_hash}`} height={100} width={100} /></td>
                <td>{item.description}</td>
                <td>{item.totalQuantity}</td>
                <td>
                  <input
                    type="number"
                    value={quantityInputs[item.name] || ""}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.name,
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!selectedRows.includes(item.name)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="button0" onClick={handleCreateButtonClick}>
          <p>Create Batch</p>
        </button>
      </div>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ backdropFilter: "blur(20px)" }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Batch Details
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            <Typography variant="body2" color="text.secondary">
              <div style={{ marginTop: "8px", width: "100%" }}>
                <Card sx={{ marginBottom: "16px", width: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "8px", marginBottom: "8px" }}
                    >
                      Ideal Conditions for the Stage-1:
                    </Typography>
                    <Stack
                      direction="row"
                      gap={2}
                      sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
                    >
                      <FormControl defaultValue="" required>
                        <Label>Concentration:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the concentration here"
                          value={concentrationStageOne}
                          onChange={(e) =>
                            setConcentrationStageOne(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Pressure:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the pressure here"
                          value={pressureStageOne}
                          onChange={(e) => setPressureStageOne(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Density:</Label>
                        <StyledInput
                          placeholder="Write the density here"
                          type="number"
                          value={densityStageOne}
                          onChange={(e) => setDensityStageOne(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Volume:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the volume here"
                          value={volumeStageOne}
                          onChange={(e) => setVolumeStageOne(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>
                    </Stack>

                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "24px", marginBottom: "8px" }}
                    >
                      Ideal Conditions for the Stage-2:
                    </Typography>
                    <Stack
                      direction="row"
                      gap={2}
                      sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
                    >
                      <FormControl defaultValue="" required>
                        <Label>Concentration:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the concentration here"
                          value={concentrationStageTwo}
                          onChange={(e) =>
                            setConcentrationStageTwo(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Pressure:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the pressure here"
                          value={pressureStageTwo}
                          onChange={(e) => setPressureStageTwo(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Density:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the density here"
                          value={densityStageTwo}
                          onChange={(e) => setDensityStageTwo(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Volume:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the volume here"
                          value={volumeStageTwo}
                          onChange={(e) => setVolumeStageTwo(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>
                    </Stack>

                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "24px", marginBottom: "8px" }}
                    >
                      Ideal Conditions for the Packing and Labeling:
                    </Typography>
                    <Stack
                      direction="row"
                      gap={2}
                      sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}
                    >
                      <FormControl defaultValue="" required>
                        <Label>Concentration:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the concentration here"
                          value={concentrationStageThree}
                          onChange={(e) =>
                            setConcentrationStageThree(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Pressure:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the pressure here"
                          value={pressureStageThree}
                          onChange={(e) =>
                            setPressureStageThree(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Density:</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the density here"
                          value={densityStageThree}
                          onChange={(e) => setDensityStageThree(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Volume:</Label>
                        <StyledInput
                          placeholder="Write the volume here"
                          value={volumeStageThree}
                          onChange={(e) => setVolumeStageThree(e.target.value)}
                        />
                        <HelperText />
                      </FormControl>
                    </Stack>

                    <Stack
                      direction="row"
                      gap={2}
                      sx={{ justifyContent: "flex-start", flexWrap: "wrap", marginTop: "20px" }}
                    >
                      <FormControl defaultValue={0} required>
                        <Label>Estimated Cost for the batch:</Label>
                        <StyledInput
                        
                          placeholder="Write the Estimated Cost here"
                          type="number"
                          value={estimatedcost}
                          onChange={(e) =>
                            setestimatedcost(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>
                      <FormControl defaultValue="" required>
                        <Label>Current Production rate (per day):</Label>
                        <StyledInput
                        type="number"
                          placeholder="Write the Production rate here"
                          value={productionRatePerDay}
                          onChange={(e) =>
                            setproductionRatePerDay(e.target.value)
                          }
                        />
                        <HelperText />
                      </FormControl>



                    </Stack>

                    <Divider sx={{ marginTop: "20px", marginBottom: "24px" }} />
                    <Typography variant="subtitle1" sx={{ marginTop: "24px" }}>
                      Choose a Transporter :{" "}
                    </Typography>

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

                    {/* Display selected transporter's information */}
                    {selectedTransporter && (
                      <Card sx={{ marginTop: "16px", width: "500px" }}>
                        <CardHeader
                          title={selectedTransporter.name}
                          subheader={selectedTransporter.address}
                        />
                      </Card>
                    )}

                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

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
                          subheader={selectedInspector.address}
                        />
                      </Card>
                    )}

                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

                    <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
                      Choose a Wholesaler :{" "}
                    </Typography>

                    {wholeSalerData.map((wholesaler) => (
                      <Button
                        key={wholesaler.id}
                        variant="outlined"
                        onClick={() => setSelectedWholesaler(wholesaler)}
                        style={{ margin: "8px" }}
                        color="success"
                      >
                        {wholesaler.name}
                      </Button>
                    ))}

                    {selectedWholesaler && (
                      <Card sx={{ marginTop: "16px", width: "500px" }}>
                        <CardHeader
                          title={selectedWholesaler.name}
                          subheader={selectedWholesaler.address}
                        />
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Typography>
            <Divider />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {selectedTransporter &&
            selectedInspector &&
            selectedWholesaler &&
            concentrationStageOne &&
            concentrationStageTwo &&
            concentrationStageThree &&
            densityStageOne &&
            densityStageTwo &&
            densityStageThree &&
            volumeStageOne &&
            volumeStageTwo &&
            volumeStageThree &&
            pressureStageOne &&
            pressureStageTwo &&
            pressureStageThree && estimatedcost && productionRatePerDay && (
              <Button color="primary" autoFocus onClick={handleSendBatch}>
                Send
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default CreateNewBatch;
