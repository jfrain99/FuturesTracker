import { CreateApiService } from "../Service"

const TeamService = CreateApiService({
  baseURL: "/teams",
})

export default TeamService
