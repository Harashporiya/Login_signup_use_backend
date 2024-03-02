import React, { useState } from "react";
import axios from "axios";
import './app.css'
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log(response);
      console.log(response.data.message);
      setAlertMessage(response.data.message);

      setTimeout(() => {
        setAlertMessage("");
        if (response.data.user) {
          setAlertMessage("User logged in successfully!");

          navigate("/home");
        }
      }, 5000);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during login:", error);
      setAlertMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="mt-40 ml-96">
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Alert
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{alertMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <p className="text-white text-5xl ml-96 mb-9">Login</p>
      <div className="bg-sky-800  w-1/4 p-10  ml-96 rounded-lg">
        <label htmlFor="email" className="text-white text-2xl">Email:</label>
        <input className="p-2 rounded-lg"
          type="text"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password" className="text-white text-2xl">Password:</label>
        <input className="p-2 rounded-lg"
          type="password"
          placeholder="Enter password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button className=" bg-sky-500 p-2 m-3 text-white text-3xl rounded-lg"  
          type="button"
          onClick={() => {
            handleClickOpen();
            handleSubmit();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
