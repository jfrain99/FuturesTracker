import { Box, Button, ButtonGroup, Card, Collapse } from "@mui/material"
import React from "react"
import { useFormContext } from "react-hook-form"
import { useCreateBetContext } from "../../contexts/CreateBetContext"
import SelectedCard from "./SelectedCard"
import { BetType } from "../../types/Bet"

const SelectStat = () => {
  const { step, setStep, betTypes } = useCreateBetContext()
  const { watch, setValue } = useFormContext()
  const stat = watch("stat") as BetType["BetType"]

  console.log({ betTypes })
  const handleClick = (betType: BetType["BetType"]) => {
    if (stat?.id === betType.id) {
      setValue("stat", null)
    } else {
      setValue("stat", betType)
    }
  }

  const handleSelectStat = () => {
    setStep(3)
  }
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Collapse in={step === 2} timeout={600} sx={{ width: "100%" }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width="100%"
          >
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "60px",
                mt: 1,
              }}
            >
              <ButtonGroup fullWidth>
                {betTypes?.map((betType) => {
                  return (
                    <Button
                      onClick={() => handleClick(betType)}
                      variant={
                        stat?.id === betType.id ? "contained" : "outlined"
                      }
                    >
                      {betType.name}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </Card>
          </Box>
        </Collapse>
        <Collapse in={!!stat && step === 2} timeout={600}>
          <Button variant="contained" onClick={handleSelectStat} sx={{ mt: 2 }}>
            {"Select"}
          </Button>
        </Collapse>
      </Box>

      {stat && step > 2 && (
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

export default SelectStat
