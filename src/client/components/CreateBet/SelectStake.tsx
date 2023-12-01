import { Box, Button, ButtonGroup, Card, Collapse } from "@mui/material"
import React from "react"
import { useFormContext } from "react-hook-form"
import { useCreateBetContext } from "../../contexts/CreateBetContext"
import SelectedCard from "./SelectedCard"
import { BetType } from "../../types/Bet"
import { ControlledTextField } from "../form/ControlledTextField"

const SelectStake = () => {
  const { step, setStep } = useCreateBetContext()
  const { watch, setValue, control } = useFormContext()
  const stat = watch("stat") as BetType["BetType"]
  const overUnder = watch("overUnder") as "over" | "under" | null
  console.log({ overUnder })
  const handleClick = (val: "over" | "under") => {
    if (overUnder === val) {
      setValue("overUnder", null)
    } else {
      setValue("overUnder", val)
    }
  }

  const handleSelectStake = () => {
    setStep(3)
  }
  return (
    <>
      <Box
        display="flex"
        width="95%"
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
        mt={4}
      >
        <Collapse in={step === 3} timeout={600} sx={{ width: "100%" }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width="100%"
            gap={2}
            height={"60px"}
          >
            <ControlledTextField
              control={control}
              name="amount"
              placeholder="Amount"
              TextFieldProps={{
                sx: {
                  height: "60px",
                  width: "50%",
                  "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                    padding: "6px 10px 6px 6px",
                    backgroundColor: "#F9FAFB",
                    height: "60px",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "unset",
                  },
                  "& .MuiInputBase-input": {
                    height: "60px",
                  },
                },
                InputProps: {
                  sx: { backgroundColor: "#F2F2F2" },
                },
              }}
            />
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "60px",
              }}
            >
              <ButtonGroup
                fullWidth
                orientation="horizontal"
                sx={{ height: "60px" }}
              >
                <Button
                  onClick={() => handleClick("over")}
                  variant={overUnder === "over" ? "contained" : "outlined"}
                >
                  Over
                </Button>
                <Button
                  onClick={() => handleClick("under")}
                  variant={overUnder === "under" ? "contained" : "outlined"}
                >
                  Under
                </Button>
              </ButtonGroup>
            </Card>
          </Box>
        </Collapse>
        <Collapse in={!!stat && step === 2} timeout={600}>
          <Button
            variant="contained"
            onClick={handleSelectStake}
            sx={{ mt: 2 }}
          >
            {"Select"}
          </Button>
        </Collapse>
      </Box>

      {overUnder && step > 3 && (
        <SelectedCard
          image={null}
          name={stat?.name}
          onClick={() => {
            setStep(2)
            setValue("stat", null)
          }}
        />
      )}
    </>
  )
}

export default SelectStake
