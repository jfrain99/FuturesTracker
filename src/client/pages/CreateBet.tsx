import {
  Box,
  Button,
  Card,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import useSearchPlayers from "../hooks/useSearchPlayers"
import useCreateBet from "../hooks/useCreateBet"
import useGetBetTypes from "../hooks/useGetBetTypes"
import { Team } from "../types/Team"
import { Player } from "../types/Player"
import { Stat } from "../types/Bet"
import { FormProvider, useForm } from "react-hook-form"
import { ControlledTextField } from "../components/form/ControlledTextField"
import SearchTeam from "../components/CreateBet/SearchTeam"
import { useCreateBetContext } from "../contexts/CreateBetContext"
import SearchPlayer from "../components/CreateBet/SearchPlayer"
import SelectStat from "../components/CreateBet/SelectStat"
import SelectStake from "../components/CreateBet/SelectStake"

interface Form {
  team: Team | null
  player: Player | null
  stat: Stat | null
  amount: string
  risk: string
  win: string
  overUnder: "Over" | "Under" | null
  code: string
}
const CreateBet = () => {
  const formMethods = useForm<Form>({
    defaultValues: {
      team: null,
      player: null,
      stat: null,
      amount: "",
      risk: "",
      win: "",
      code: "",
      overUnder: null,
    },
  })
  const { step, setStep } = useCreateBetContext()
  console.log(step)
  const team = formMethods.watch("team")
  const player = formMethods.watch("player")
  const stat = formMethods.watch("stat")
  const amount = formMethods.watch("amount")
  const risk = formMethods.watch("risk")
  const win = formMethods.watch("win")
  const overUnder = formMethods.watch("overUnder")
  const code = formMethods.watch("code")

  const createBetMutation = useCreateBet()

  const selectPlayer = (player) => {
    formMethods.setValue("player", player)
    setStep(2)
  }

  const handleOver = () => {
    formMethods.setValue("overUnder", "Over")
  }

  const handleUnder = () => {
    formMethods.setValue("overUnder", "Under")
  }

  const handleStartOver = () => {
    // setTeamSearchVal("")
    // setPlayerSearchVal("")
    // refetchTeams()
    // refetchPlayers()
    formMethods.reset()
    setStep(0)
  }
  const handleSubmit = () => {
    if (team && player && stat && amount && risk && win && overUnder) {
      createBetMutation.mutateAsync({
        teamId: team.id,
        playerId: player.id,
        amount,
        risk,
        win,
        stat,
        overUnder,
        code,
      })
      setStep(6)
    }
  }
  return (
    <FormProvider {...formMethods}>
      <Stack mt={2} spacing={1} justifyContent={"center"} alignItems={"center"}>
        <SearchTeam />
        <SearchPlayer />
        <SelectStat />
        <SelectStake />
        {step === 3 && stat && (
          <Stack>
            <Typography>You have selected {stat.name}!</Typography>
            <ControlledTextField name="amount" control={formMethods.control} />

            <Box display="flex" justifyContent={"center"}>
              <Button onClick={handleOver}>Over</Button>
              <Button onClick={handleUnder}>Under</Button>
            </Box>
            <Button onClick={() => setStep(4)}>Submit</Button>
          </Stack>
        )}
        {step > 3 && overUnder && amount && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box width="150px" height="60px" />
              <Typography variant="h4">
                {overUnder} {amount}
              </Typography>
              <Button sx={{ width: "150px" }}>Change</Button>
            </Card>
          </Box>
        )}

        {step === 4 && amount && overUnder && stat && player && (
          <Stack>
            <ControlledTextField name="risk" control={formMethods.control} />
            <ControlledTextField name="win" control={formMethods.control} />
            <Button onClick={() => setStep(5)}>Submit</Button>
          </Stack>
        )}
        {step > 4 && risk && win && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box width="150px" height="60px" />
              <Typography variant="h4">
                ${risk} / ${win}
              </Typography>
              <Button sx={{ width: "150px" }}>Change</Button>
            </Card>
          </Box>
        )}
        {step === 5 && risk && win && amount && overUnder && stat && player && (
          <Stack>
            <Typography>
              Enter your code! This allows us to group your bets. If you have no
              code, make one!
            </Typography>
            <ControlledTextField name="code" control={formMethods.control} />
            <Button onClick={handleSubmit}>Lock in!</Button>
          </Stack>
        )}
        {step > 5 && code && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box width="150px" height="60px" />
              <Typography variant="h4">{code}</Typography>
              <Button sx={{ width: "150px" }}>Change</Button>
            </Card>
          </Box>
        )}
        {step === 6 &&
          risk &&
          win &&
          amount &&
          overUnder &&
          stat &&
          player &&
          code && (
            <Stack>
              <Typography>Bet Submitted!</Typography>
              <Typography>
                Your bet: {overUnder} {amount} {stat.name} for {player.name} for
                ${risk} / ${win}
              </Typography>
              <Typography>Code: {code}</Typography>
              <Button onClick={handleStartOver}>Make a new bet!</Button>
            </Stack>
          )}
      </Stack>
    </FormProvider>
  )
}
export default CreateBet
