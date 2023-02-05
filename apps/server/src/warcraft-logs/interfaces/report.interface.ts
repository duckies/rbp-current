export interface Report {
  code: string
  title: string
  startTime: number
  endTime: number
  fights: Fight[]
  zone?: Zone
  owner: {
    name: string
  }
}

export type ReportIndex = Omit<Report, 'fights'>

export interface Fight {
  id: number
  encounterID: number
  kill: boolean
  name: string
  difficulty: number | null
  bossPercentage: number
  keystoneBonus: number | null
  keystoneLevel: number | null
  keystoneTime: number | null
}

export interface Zone {
  id: number
  name: string
}

export interface ReportsResponse<T extends Report | ReportIndex> {
  errors?: { message: string }[]
  data: {
    reportData: {
      reports: {
        data: T[]
      }
    }
  }
}

export interface ReportResponse {
  errors?: { message: string }[]
  data: {
    reportData: {
      report: Report
    }
  }
}
