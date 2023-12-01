import { Box } from "@mui/material"
import CreateBet from "./pages/CreateBet"
import { useState } from "react"

import MyBetsPage from "./pages/MyBetsPage"
import Navbar from "./components/Navbar"
import { CreateBetProvider } from "./contexts/CreateBetContext"

function App() {
  const [tabValue, setTabValue] = useState(0)
  return (
    <Box>
      <Navbar tabValue={tabValue} setTabValue={setTabValue} />
      <CreateBetProvider>{tabValue === 0 && <CreateBet />}</CreateBetProvider>
      {tabValue === 1 && <MyBetsPage />}
    </Box>
  )
}

export default App
