"use client";

import { Block, WeightType } from "@/types";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { selectCurUser } from "@/lib/features/user/userSlice";
import { useSelector } from "react-redux";
import { EditDay } from "./editDay";
import { EditWeek } from "./editWeek";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    transform: "translateY(50px)",
  },
  title: {
    fontFamily: "Gabarito",
    fontWeight: 900,
    fontSize: "22px",
  },
  submitButton: {
    width: "100%",
    height: "40px",
    borderRadius: "0px 0px 20px 20px",
    border: "none",
    background: "#0096FF",
    color: "white",
    fontFamily: "Gabarito",
    fontWeight: 600,
    fontSize: "18px",
  },
  submitButtonDisabled: {
    background: "#9ED7FF",
  },
});

const titleBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "lightgray",
  borderWidth: "5px",
  borderRadius: "25px 25px 0px 0px",
  width: "100%",
  minHeight: "50px",
  maxWidth: "400px",
  marginBottom: "-5px",
};

const formBoxStyle = {
  background: "white",
  outline: 0,
  border: "solid",
  borderColor: "lightgray",
  borderWidth: "5px",
  padding: "10px 10px 10px 10px",
  width: "100%",
  maxWidth: "400px",
};

const saveBoxStyle = {
  outline: 0,
  border: "solid",
  borderColor: "lightgray",
  borderWidth: "5px",
  borderRadius: "0px 0px 25px 25px",
  width: "100%",
  height: "50px",
  maxWidth: "400px",
  marginTop: "-5px",
};

export const CreateBlock = () => {
  const { classes } = useStyles();
  const curUser = useSelector(selectCurUser);
  const saveRef = useRef<HTMLDivElement>(null);
  const [editingDay, setEditingDay] = useState(0);
  const [block, setBlock] = useState<Block>({
    name: "",
    startDate: new Date(),
    length: 0,
    weeks: [
      {
        number: 1,
        days: [
          {
            name: "Day 1",
            exercises: [
              {
                name: "",
                apparatus: "",
                sets: 0,
                reps: [0],
                weight: [0],
                weightType: WeightType.Pounds,
                unilateral: false,
                note: "",
                completed: false
              },
            ],
            completed: false,
            completedDate: undefined,
          },
        ],
        completed: false,
      },
    ],
    completed: false,
  });

  return (
    <div className={classes.container}>
      <Box sx={titleBoxStyle}>
        <span className={classes.title}>Create Training Block</span>
      </Box>
      <Box sx={formBoxStyle}>
        {editingDay === 0 ? (
          <EditWeek
            uid={curUser?._id || ""}
            block={block}
            setBlock={setBlock}
            setEditingDay={setEditingDay}
            saveRef={saveRef}
          />
        ) : (
          <EditDay
            block={block}
            setBlock={setBlock}
            editingDay={editingDay}
            setEditingDay={setEditingDay}
            saveRef={saveRef}
          />
        )}
      </Box>
      <Box sx={saveBoxStyle} ref={saveRef}>
        <button
          className={`${classes.submitButton} ${
            editingDay !== 0 && classes.submitButtonDisabled
          }`}
          form="create-block-form"
          type="submit"
          disabled={editingDay !== 0}
        >
          Save Block
        </button>
      </Box>
    </div>
  );
};
