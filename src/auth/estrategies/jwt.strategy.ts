import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
;

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){
  
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    configService: ConfigService
    ) {
    
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }
  
  async validate(payload: JwtPayload): Promise<User> {
  
    const { email } = payload;
    
    const user = await this.userModel.findOne({ email });
    
    if (!user) throw new UnauthorizedException('Invalid Token');
    if (!user.isActive) throw new UnauthorizedException('User is not active');
    
    return user;
  }
  
}

