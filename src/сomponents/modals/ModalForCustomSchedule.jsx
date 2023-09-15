import { Button, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import { useDays, useSchedule } from "../../store_zustand/store";

function ModalForCustomSchedule({ open, handleClose }) {
  const isDesktop = useMediaQuery("(min-width: 460px)");
  const [customDate, setCustomDate] = useState(dayjs());
  const [workDays, setWorkDays] = useState("");
  const [dayOffs, setDayOffs] = useState("");
  const [setNewSchedule] = useSchedule((state) => [state.setNewSchedule]);
  const [updateCustomSchedule] = useDays((state) => [
    state.updateCustomSchedule,
  ]);

  function handleWorkDaysInput(e) {
    setWorkDays(e.target.value);
  }
  function handleDayOffsInput(e) {
    setDayOffs(e.target.value);
  }

  function handleSubmit() {
    setNewSchedule(0, Number(workDays), Number(dayOffs));
    updateCustomSchedule(customDate.$d);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "5px",
          paddingTop: "10px",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: isDesktop ? 600 : 600,
          width: isDesktop ? 450 : 320,
          backgroundColor: "#ececec",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
        }}
        className="flex flex-col "
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          textAlign={"center"}
        >
          Choose the first day of work
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={customDate}
            onChange={(newValue) => setCustomDate(newValue)}
          />
        </LocalizationProvider>
        <div className="flex flex-col sm:flex-row gap-10 justify-center">
          <div className="flex flex-col">
            <h2>Number of work days:</h2>
            <input
              value={workDays}
              type="number"
              onChange={handleWorkDaysInput}
            />
          </div>
          <div className="flex flex-col">
            <h2>Number of day-offs:</h2>
            <input
              value={dayOffs}
              type="number"
              onChange={handleDayOffsInput}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} color="primary" variant="text">
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalForCustomSchedule;
