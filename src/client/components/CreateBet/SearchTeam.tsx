import { Box, Button, Collapse, Stack, TextField } from "@mui/material"
import useSearchTeams from "../../hooks/useSearchTeams"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useCreateBetContext } from "../../contexts/CreateBetContext"
import { Team } from "../../types/Team"
import { useQueryClient } from "react-query"
import SearchResult from "./SearchResult"
import SelectedCard from "./SelectedCard"

const SearchTeam = () => {
  const queryClient = useQueryClient()
  const { step, setStep } = useCreateBetContext()
  const { setValue, watch } = useFormContext()
  const team = watch("team") as Team
  const [teamSearchVal, setTeamSearchVal] = useState("")
  const [teamSearchOpen, setTeamSearchOpen] = useState(true)

  const { data: teams, refetch: refetchTeams } = useSearchTeams({
    search: teamSearchVal,
  })
  const searchTeams = () => {
    refetchTeams()
    setTeamSearchOpen(false)
  }
  const selectTeam = (team: Team) => {
    setValue("team", team)
    setStep(1)
    queryClient.setQueriesData("search-teams", [])
  }

  const handleRetry = () => {
    setValue("team", null)
    queryClient.setQueriesData("search-teams", [])
    setTeamSearchOpen(true)
  }
  console.log({ team })
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Collapse in={teamSearchOpen} timeout={600}>
          <TextField
            value={teamSearchVal}
            onChange={(e) => setTeamSearchVal(e.target.value)}
            sx={{ width: "360px" }}
            InputProps={{ sx: { backgroundColor: "#F2F2F2" } }}
          />
        </Collapse>
        <Collapse in={!team} timeout={600}>
          <Button
            variant="contained"
            onClick={teams?.length !== 0 ? handleRetry : searchTeams}
            sx={{ mt: 2 }}
          >
            {teams?.length !== 0 && !teamSearchOpen ? "Retry" : "Search Team"}
          </Button>
        </Collapse>
        {teams && teams.length > 0 && (
          <Stack alignItems={"center"} mt={2} width="100%">
            {teams?.map((team) => {
              return (
                <SearchResult
                  image={team.apiImage}
                  name={team.name}
                  onClick={() => selectTeam(team)}
                />
              )
            })}
          </Stack>
        )}
      </Box>

      {team && step > 0 && (
        <SelectedCard
          image={team.apiImage}
          name={team.name}
          onClick={handleRetry}
        />
      )}
    </>
  )
}

export default SearchTeam
