import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useSearchTeams from "./hooks/useSearchTeams"
import useSearchPlayers from "./hooks/useSearchPlayers"

const betTypes = [
  "Passing Yards",
  "Passing Touchdowns",
  "Receiving Yards",
  "Receiving Touchdowns",
  "Rushing Yards",
  "Rushing Touchdowns",
]
function App() {
  const [team, setTeam] = useState()
  const [player, setPlayer] = useState()
  const [stat, setStat] = useState()
  const [amount, setAmount] = useState("")
  const [stake, setStake] = useState("")
  const [overUnder, setOverUnder] = useState()
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
    console.log({ teams })
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

  const handleOver = () => {
    setOverUnder("over")
  }

  const handleUnder = () => {
    setOverUnder("under")
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
            src={player.image}
          />
          <Typography>Stat</Typography>
          {betTypes?.map((type) => (
            <Button onClick={() => setStat(type)}>{type}</Button>
          ))}
        </Stack>
      )}
      {stat && (
        <Stack>
          <Typography>You have selected {stat}!</Typography>
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
            {stat} for {player.name}!
          </Typography>
          <TextField value={stake} onChange={(e) => setStake(e.target.value)} />
          <Button onClick={handleUnder}>Lock in!</Button>
        </Stack>
      )}
      {stake && (
        <Stack>
          <Typography>
            Your bet: {overUnder === "over" ? "Over" : "Under"} {amount} {stat}{" "}
            for {player.name} for ${stake}
          </Typography>
        </Stack>
      )}
      <Button onClick={() => console.log(players)}>Console Log</Button>
    </div>
  )
}

export default App
