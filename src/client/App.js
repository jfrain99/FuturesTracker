import "./App.css"
import useSearchPlayers from "./client/hooks/useSearchPlayers"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useSearchTeams from "./client/hooks/useSearchTeams"

function App() {
  const [team, setTeam] = useState()
  const [player, setPlayer] = useState()
  const [teamSearchVal, setTeamSearchVal] = useState("")
  const [playerSearchVal, setPlayerSearchVal] = useState("")
  const { data: teams, refetch: refetchTeams } = useSearchTeams({
    search: teamSearchVal,
  })
  const { data: players, refetch: refetchPlayers } = useSearchPlayers({
    search: playerSearchVal,
    teamId: team?.id,
  })
  console.log({ teams })
  const searchTeams = () => {
    refetchTeams()
  }

  const searchPlayers = () => {
    refetchPlayers()
  }
  const selectTeam = (team) => {
    setTeam(team)
  }

  const selectPlayer = (player) => {
    setPlayer(player)
  }
  return (
    <div className="App">
      <p>Get Team</p>
      <Box display="flex" justifyContent={"center"}>
        <TextField
          value={teamSearchVal}
          onChange={(e) => setTeamSearchVal(e.target.value)}
        />
        <Button onClick={searchTeams}>Search Team</Button>
      </Box>
      {teams && (
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
            src={player.image}
          />
        </Stack>
      )}
      <Button onClick={() => console.log(players)}>Console Log</Button>
    </div>
  )
}

export default App
