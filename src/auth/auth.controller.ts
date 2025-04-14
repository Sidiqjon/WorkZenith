import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterDTO,
  LoginDTO,
  SendOtpDto,
  ActivateDto,
  VerifyOTPDto,
  ResetPasswordDto,
  RefreshTokenDto,
} from './dto/create-auth.dto';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() createAuthDto: RegisterDTO) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with phone number and password' })
  login(@Body() loginDto: LoginDTO, @Req() req: Request) {
    return this.authService.login(loginDto, req);
  }

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send OTP to the given phone number' })
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('activate-account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP and activate the user account' })
  activateAccount(@Body() activateDto: ActivateDto) {
    return this.authService.activateAccount(activateDto);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify the provided OTP' })
  verifyOtp(@Body() verifyDto: VerifyOTPDto) {
    return this.authService.verifyOtp(verifyDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset user password using phone number and new password' })
  resetPassword(@Body() resetDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate new access token using refresh token' })
  refreshToken(@Body() tokenDto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refreshToken(tokenDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout and remove refresh token from user' })
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }


  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get authenticated user info' })
  me(@Req() req: Request) {
    return this.authService.me(req);
  }
}
