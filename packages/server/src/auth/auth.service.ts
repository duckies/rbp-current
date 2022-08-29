import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { sign, verify } from "jsonwebtoken"

@Injectable()
export class AuthService {
  private readonly secret: string

  constructor(configService: ConfigService) {
    this.secret = configService.get<string>("JWT_SECRET")!
  }

  signJWT(payload: object) {
    return sign(payload, this.secret, {
      expiresIn: "30 days",
    })
  }

  verifyJWT<T = any>(token: string) {
    return verify(token, this.secret) as T
  }
}
