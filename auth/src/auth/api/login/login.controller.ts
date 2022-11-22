import {
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth-guard/local-auth-guard.guard';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('api/users')
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Res() res, @Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error: User or Password not valid!',
        status: 401,
      });
    }
  }
}
