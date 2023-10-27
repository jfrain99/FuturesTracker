import { CreateApiService } from "../Service"

const PlayerService = CreateApiService({
  baseURL: "/players",
})

export default PlayerService
