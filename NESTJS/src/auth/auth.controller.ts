import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async handleGoogleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.generateToken(user);

    // token 
    return res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
}
