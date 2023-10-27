import { Box, Tab, Tabs } from "@mui/material"
import CreateBet from "./pages/CreateBet"
import { useState } from "react"

import MyBetsPage from "./pages/MyBetsPage"

function App() {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (_e, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Create Bet" value={0} />
        <Tab label="My Bets" value={1} />
      </Tabs>
      {tabValue === 0 && <CreateBet />}
      {tabValue === 1 && <MyBetsPage />}
    </Box>
  )
}

export default App
