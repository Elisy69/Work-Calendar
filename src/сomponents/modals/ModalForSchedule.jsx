import { ButtonGroup, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDays, useSchedule } from "../../store_zustand/store";

const buttons = [
  "Two days ago",
  "Yesterday",
  "Today",
  "Tomorrow",
  "In two days",
];

function ModalForSchedule({ open, handleClose, shift }) {
  const isDesktop = useMediaQuery("(min-width: 460px)");
  const [setNewSchedule] = useSchedule((state) => [state.setNewSchedule]);
  const [updateSchedule] = useDays((state) => [state.updateSchedule]);

  const handleSetSchedule = (index) => {
    return function () {
      let startingDay = 0;
      switch (index) {
        case 0:
          startingDay = -2;
          break;
        case 1:
          startingDay = -1;
          break;
        case 2:
          startingDay = 0;
          break;
        case 3:
          startingDay = 1;
          break;
        case 4:
          startingDay = 2;
      }
      if (shift === 1) {
        setNewSchedule(startingDay, 3, shift);
        updateSchedule();
      } else {
        setNewSchedule(startingDay, shift, shift);
        updateSchedule();
      }
    };
  };
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
          padding: "20px",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: isDesktop ? 200 : 300,
          width: isDesktop ? 450 : 250,
          backgroundColor: "#ececec",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          textAlign={"center"}
        >
          Choose the first day of work
        </Typography>
        <ButtonGroup
          orientation={isDesktop ? `horizontal` : `vertical`}
          variant="contained"
          color="primary"
        >
          {buttons.map((item, index) => {
            if (index === 2)
              return (
                <Button
                  style={{
                    fontSize: isDesktop ? "12px" : "10px",
                  }}
                  onClick={handleSetSchedule(index)}
                  variant="contained"
                  color={"primary"}
                  key={item}
                >
                  {item}
                </Button>
              );
            return (
              <Button
                style={{
                  fontSize: isDesktop ? "12px" : "10px",
                }}
                onClick={handleSetSchedule(index)}
                key={item}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Modal>
  );
}

export default ModalForSchedule;
