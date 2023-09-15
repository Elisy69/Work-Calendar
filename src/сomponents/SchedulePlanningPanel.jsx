import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ModalForCustomSchedule from "./modals/ModalForCustomSchedule";
import ModalForSchedule from "./modals/ModalForSchedule";

const buttons = ["One/Three", "Two/Two", "Three/Three", "Four/Four", "Custom"];

function SchedulePlanningPanel() {
  const [openCustom, setOpenCustom] = useState(false);
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 460px)");

  const handleOpen = (index) => {
    return function () {
      setShift(index + 1);
      setOpen(true);
    };
  };
  const handleClose = () => setOpen(false);

  const handleOpenCustom = () => setOpenCustom(true);

  const handleCloseCustom = () => setOpenCustom(false);
  return (
    <div className="h-[5%] sm:h-[4%] flex justify-center">
      <ButtonGroup
        variant="text"
        aria-label="large button group"
        color="primary"
      >
        {buttons.map((item, index) => {
          if (index + 1 === buttons.length)
            return (
              <Button
                style={{
                  fontSize: isDesktop ? "12px" : "8px",
                  padding: isDesktop ? "6px" : "3px",
                  fontWeight: "bold",
                }}
                onClick={handleOpenCustom}
                key={item}
              >
                {item}
              </Button>
            );
          return (
            <Button
              style={{
                fontSize: isDesktop ? "12px" : "8px",
                padding: isDesktop ? "6px" : "3px",
                fontWeight: "bold",
              }}
              onClick={handleOpen(index)}
              key={item}
            >
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
      <ModalForSchedule open={open} handleClose={handleClose} shift={shift} />
      <ModalForCustomSchedule
        open={openCustom}
        handleClose={handleCloseCustom}
      />
    </div>
  );
}

export default SchedulePlanningPanel;
