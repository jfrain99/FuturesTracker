import { CreateApiService } from "../Service"

const BetService = CreateApiService({
  baseURL: "/bets",
})

export default BetService
