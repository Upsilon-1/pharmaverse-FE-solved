import React, { useEffect, useState } from "react";
import batchData from "../scheduled.json";
import wholeSalerData from "../wholesaler.json";
import "../Miscellaneous/OngoingBatches.css";
import { AuthContext } from "../Context/AuthContext";
import { ContractContext } from "../Context/ContractContext";
import { useContext } from "react";
import CONSTANTS from "../Utils/Constants";
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
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import Timeline from "./Timeline";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ScheduledBatches = () => {
  const { batches, Services, medicines } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [ScheduledBatches, setScheduledBatches] = useState([]);
  // const [batches, setBatches] = useState(batchData);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);
  const [selectscore, setSelectScore] = useState([]);
  // const [scored, setScored] = useState([]);

  useEffect(() => {
    setData();
  }, [batches, medicines]);

  const setData = async () => {
    if (!batches || !account || !medicines) return;

    console.log("batchessssssss: ",batches);

    const updatedBatches = batches
      .filter((item) => item.manufacturerId === account &&  item.stage === 0).map((item) => {
        const updatedMedicines = item.medicines.map((medicine) => {
          const matchedMedicine = medicines.find((m) => m.medicineId === medicine.medicineId);
          if (matchedMedicine) {
            return {
              ...matchedMedicine,
              quantity: medicine.quantity,
            };
          } else {
            return medicine;
          }
        });
        console.log("updatedMedicines: ", updatedMedicines);
        const firstMedicineWithIpfs = medicines.map((item)=>item.medicineId===updatedMedicines[0].medicineId?item.ipfs_hash:null).filter((item)=>item!==null)[0];

        // Find the first medicine with a matching ipfs_hash
        // const firstMedicineWithIpfs = updatedMedicines[0].ipfs_hash;
        // console.log("firstMedicineWithIpfs: ", firstMedicineWithIpfs);

        return {
          ...item,
          medicines: updatedMedicines,
          ipfs_hash: firstMedicineWithIpfs ? firstMedicineWithIpfs : '',
        };
      });
    console.log("updatedBatches: ", updatedBatches.medicines);

    setScheduledBatches(updatedBatches);
  };

  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedBatch(null); // Reset selected batch when closing dialog
    setOpenDialog(false);
  };
  const handleSendPackage = () => {
    setOpenDialog(false);
  };
  // useEffect(() => {
  //   const sortedBatches = [...ScheduledBatches]; // Create a copy of batches array
  //   sortedBatches.sort((a, b) => a.score - b.score); // Sort in descending order by score
  //   setScheduledBatches(sortedBatches);
  // }, [batches]);
  return (
    <div>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search Score..."
          value={searchValue}
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

      <div className="allcards">
        {searchValue === ""
          ? ScheduledBatches.map((batch, index) => (
            <div
              className="card"
              key={index}
              style={{ cursor: "pointer" }}
            >
              <div className="remove-when-use">
                <img src={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`} alt="pic" />
              </div>
              <div className="details">
                <p>Score: {batch.score}</p>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center" }}>
                  {batch.medicines && batch.medicines.map((item, index) => (
                    <div key={index} >
                      {item.name}: {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
          : ScheduledBatches
            .filter((item) => item.score === parseInt(searchValue))
            .map((batch, index) => (
              <div
                className="card"
                key={index}
                style={{ cursor: "pointer" }}
              >
                <div className="remove-when-use">
                  <img src={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`} alt="pic" />
                </div>
                <div className="details">
                  <p>Score: {batch.score}</p>
                  <div style={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center" }}>
                  {batch.medicines && batch.medicines.map((item, index) => (
                    <div key={index} >
                      {item.name}: {item.quantity}
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ScheduledBatches;
