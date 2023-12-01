export interface BetType {
    Player: {
      id: number
      apiId: number
      apiImage: string
      name: string
    }
    Team: {
      id: number
      apiId: number
      apiImage: string
      name: string
    }
    id: string
    BetType: {
      id: number
      category: BetTypes
      name: string
    }
    code: {
      id: number
      name: string
    }
    amount: string
    overUnder: string
    risk: string
    win: string
    playerId: number
    teamId: number
    stat: string
    currValue?: string
    seasonProgress?: number
    progress?: number
    expectedValue?: string
    expectedPace?: number
    betWinning?: boolean
    betAlreadyWon?: boolean
  }

export interface Statistics {
  player: {
    id: number
    name: string
    image: string
  }
  teams: TeamStats[]
}

export interface TeamStats {
  team: {
    id: number
    logo: string
    name: string
  }
  groups: StatGroup[]
}
export interface StatGroup {
  name: string
  statistics: Stat[]
}

export interface Stat {
  name: string
  value: string
}

export enum BetTypes {
  "PASSING",
  "RUSHING",
  "RECEIVING",
  "DEFENSE",
  "SCORING"
}