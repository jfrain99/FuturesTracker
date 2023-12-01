import {
  Box,
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { BetType } from "../types/Bet"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

const Bet = ({ bet }: { bet: BetType }) => {
  const [collapseOpen, setCollapseOpen] = useState(false)

  return (
    <Box
      display="flex"
      border="1px solid black"
      flexDirection={"column"}
      borderRadius={4}
      px={2}
    >
      <Grid container columns={20}>
        <Grid item xs={2}>
          <img
            alt={`${bet.Player.id}-${bet.Player.name}`}
            width={100}
            src={bet.Player.apiImage}
          />
        </Grid>
        <Grid item xs={4}>
          <Stack justifyContent={"center"} alignItems={"center"} height="100%">
            <Typography>{bet?.Player?.name}</Typography>
            <Typography>
              {bet?.overUnder === "over" ? "Over" : "Under"} {bet?.amount}{" "}
              {bet?.BetType?.name}
            </Typography>
            <Typography>
              ${bet?.risk} to win ${bet?.win}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          flexDirection={"column"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <LinearProgress
            variant="determinate"
            color={bet.betWinning ? "success" : "error"}
            value={bet.progress}
            sx={{ width: "80%", height: 10 }}
          />
          <Box width="80%" height="10px" position={"relative"}>
            <Box
              width="100%"
              position="absolute"
              justifyContent={"center"}
              left={`${Number(bet?.expectedPace) * 100}%`}
            >
              <Box
                sx={{
                  pt: "1px",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderBottom: "5px solid black",
                }}
              />
              <Box
                width="fit-content"
                justifyContent={"center"}
                display={"flex"}
              >
                <Typography
                  sx={{
                    marginLeft: "calc(0px - 100%)",
                    border: "1px solid black",
                    px: 2,
                  }}
                >
                  Expected Pace: {bet.expectedValue}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Stack justifyContent={"center"} alignItems={"center"} height="100%">
            <Typography variant="h4">{bet?.currValue}</Typography>
            <Typography>Current</Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={1}
          display="flex"
          height="100px"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton onClick={() => setCollapseOpen((prev) => !prev)}>
            {collapseOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={collapseOpen}>
        <Box display="flex" gap={1}>
          <Typography>If Season Ended Today: </Typography>
          <Typography>
            {bet?.betAlreadyWon ? `+${bet.win}` : `-${bet.risk}`}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Typography>At This Pace: </Typography>
          <Typography>
            {bet?.betWinning ? `+${bet.win}` : `-${bet.risk}`}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Bet
