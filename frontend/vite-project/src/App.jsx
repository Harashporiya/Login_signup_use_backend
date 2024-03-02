import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./app.css";

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

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        username,
        email,
        password,
      });
      setAlertMessage(response.data.message);
      console.log(response)
     console.log(response.data.message)
      setTimeout(() => {
        setAlertMessage("");
        if (response.data.user) {
          setAlertMessage("User signed up successfully!");
          setOpen(true);
        }
      }, 1000);

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during sign-up:", error);
      
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleClickOpen();
    handleSubmit();
  };

  return (
    <div className="mt-40 ml-96" decoration-white>
        <p className="text-white text-5xl ml-96 mb-9">Signup Form</p>
      <form
        onSubmit={handleFormSubmit}
        className="bg-sky-800 w-1/4 p-10 ml-96 rounded-lg"
      >
        <label htmlFor="name" className="text-white text-2xl">
          Username:
        </label>
        <input
          className="p-2 rounded-lg"
          type="text"
          placeholder="Enter username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label className="text-white text-2xl" htmlFor="email">
          Email:
        </label>
        <br />
        <input
          className="p-2 rounded-lg"
          type="text"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label className="text-white text-2xl" htmlFor="password">
          Password:
        </label>
        <input
          className="p-2 rounded-lg"
          type="password"
          placeholder="Enter password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button
          type="button"
          className="bg-sky-500 p-2 m-3 text-white text-3xl rounded-lg"
          onClick={handleFormSubmit}
        >
          Signup
        </button>

        <button
          className="p-2 ml-5 bg-sky-500 text-white text-3xl rounded-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>

      <Dialog
        open={open}
        onClose={handleDialogClose}
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
          <Button autoFocus onClick={handleDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;

