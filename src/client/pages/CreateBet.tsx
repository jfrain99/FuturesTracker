import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import useSearchTeams from "../hooks/useSearchTeams"
import useSearchPlayers from "../hooks/useSearchPlayers"
import useCreateBet from "../hooks/useCreateBet"
import useGetBetTypes from "../hooks/useGetBetTypes"

const CreateBet = () => {
  const [team, setTeam] = useState()
  const [player, setPlayer] = useState()
  const [stat, setStat] = useState()
  const [amount, setAmount] = useState("")
  const [risk, setRisk] = useState("")
  const [win, setWin] = useState("")
  const [overUnder, setOverUnder] = useState()
  const [teamSearchVal, setTeamSearchVal] = useState("")
  const [playerSearchVal, setPlayerSearchVal] = useState("")
  const { data: betTypes } = useGetBetTypes()
  console.log(betTypes)
  const { data: teams, refetch: refetchTeams } = useSearchTeams({
    search: teamSearchVal,
  })
  const { data: players, refetch: refetchPlayers } = useSearchPlayers({
    search: playerSearchVal,
    teamId: team?.apiId,
  })

  const createBetMutation = useCreateBet()
  const searchTeams = () => {
    refetchTeams()
    console.log({ teams })
  }

  const searchPlayers = () => {
    refetchPlayers()
  }
  const selectTeam = (team) => {
    console.log({ team })
    setTeam(team)
  }

  const selectPlayer = (player) => {
    console.log({ player })
    setPlayer(player)
  }

  const handleOver = () => {
    setOverUnder("over")
  }

  const handleUnder = () => {
    setOverUnder("under")
  }

  const handleSubmit = () => {
    console.log({ team, player, amount, risk, win, stat, overUnder })
    createBetMutation.mutateAsync({
      teamId: team.id,
      playerId: player.id,
      amount,
      risk,
      win,
      stat,
      overUnder,
    })
  }
  return (
    <Box>
      <Typography>Get Team</Typography>
      <Box display="flex" justifyContent={"center"}>
        <TextField
          value={teamSearchVal}
          onChange={(e) => setTeamSearchVal(e.target.value)}
        />
        <Button onClick={searchTeams}>Search Team</Button>
      </Box>
      {teams && teams.length > 0 && (
        <Stack>
          {teams?.map((team) => {
            return <Button onClick={() => selectTeam(team)}>{team.name}</Button>
          })}
        </Stack>
      )}
      {team && (
        <Stack>
          <Typography>You have selected the {team.name}!</Typography>
          <Box display="flex" justifyContent={"center"}>
            <TextField
              value={playerSearchVal}
              onChange={(e) => setPlayerSearchVal(e.target.value)}
            />
            <Button onClick={searchPlayers}>Search Player</Button>
          </Box>
        </Stack>
      )}
      {players && (
        <Stack>
          {players?.map((player) => {
            return (
              <Button onClick={() => selectPlayer(player)}>
                {player.name}
              </Button>
            )
          })}
        </Stack>
      )}
      {player && (
        <Stack>
          <Typography>You have selected {player.name}!</Typography>
          <img
            alt={`${player.id}-${player.name}`}
            width={100}
            src={player.apiImage}
          />
          <Typography>Stat</Typography>
          {betTypes?.map((type) => (
            <Button onClick={() => setStat(type)}>{type.name}</Button>
          ))}
        </Stack>
      )}
      {stat && (
        <Stack>
          <Typography>You have selected {stat.name}!</Typography>
          <TextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Box>
            <Button onClick={handleOver}>Over</Button>
            <Button onClick={handleUnder}>Under</Button>
          </Box>
        </Stack>
      )}
      {amount && overUnder && (
        <Stack>
          <Typography>
            {" "}
            You have selected {overUnder === "over" ? "Over" : "Under"} {amount}{" "}
            {stat.name} for {player.name}!
          </Typography>
          <TextField value={risk} onChange={(e) => setRisk(e.target.value)} />

          <TextField value={win} onChange={(e) => setWin(e.target.value)} />
          <Button onClick={handleSubmit}>Lock in!</Button>
        </Stack>
      )}
      {risk && (
        <Stack>
          <Typography>
            Your bet: {overUnder === "over" ? "Over" : "Under"} {amount}{" "}
            {stat.name} for {player.name} for ${risk}
          </Typography>
        </Stack>
      )}
      <Button onClick={() => console.log(players)}>Console Log</Button>
    </Box>
  )
}
export default CreateBet
