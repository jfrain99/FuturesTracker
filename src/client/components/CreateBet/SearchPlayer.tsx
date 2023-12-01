import { Box, Button, Collapse, Stack, TextField } from "@mui/material"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useCreateBetContext } from "../../contexts/CreateBetContext"
import { Team } from "../../types/Team"
import { useQueryClient } from "react-query"
import SearchResult from "./SearchResult"
import SelectedCard from "./SelectedCard"
import { Player } from "../../types/Player"
import useSearchPlayers from "../../hooks/useSearchPlayers"

const SearchPlayer = () => {
  const queryClient = useQueryClient()
  const { step, setStep } = useCreateBetContext()
  const { setValue, watch } = useFormContext()
  const team = watch("team") as Team
  const player = watch("player") as Player
  const [playerSearchVal, setPlayerSearchVal] = useState("")

  const { data: players, refetch: refetchPlayers } = useSearchPlayers({
    search: playerSearchVal,
    teamId: Number(team?.apiId),
  })
  const searchPlayers = () => {
    refetchPlayers()
  }
  const selectPlayer = (player: Player) => {
    setValue("player", player)
    setStep(2)
    queryClient.setQueriesData("search-players", undefined)
  }

  const handleRetry = () => {
    setValue("player", null)
    queryClient.setQueriesData("search-players", undefined)
  }

  console.log({ players })
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Collapse in={!players && !player} timeout={600}>
          <TextField
            value={playerSearchVal}
            onChange={(e) => setPlayerSearchVal(e.target.value)}
            sx={{ width: "360px" }}
            InputProps={{ sx: { backgroundColor: "#F2F2F2" } }}
          />
        </Collapse>
        <Collapse in={!player && team} timeout={600}>
          <Button
            variant="contained"
            onClick={players ? handleRetry : searchPlayers}
            sx={{ mt: 2 }}
          >
            {players ? "Retry" : "Search player"}
          </Button>
        </Collapse>
        {players && players.length > 0 && (
          <Stack alignItems={"center"} mt={2} width="100%">
            {players?.map((player) => {
              return (
                <SearchResult
                  image={player.apiImage}
                  name={player.name}
                  onClick={() => selectPlayer(player)}
                />
              )
            })}
          </Stack>
        )}
      </Box>

      {player && step > 1 && (
        <SelectedCard
          image={player.apiImage}
          name={player.name}
          onClick={handleRetry}
        />
      )}
    </>
  )
}

export default SearchPlayer
