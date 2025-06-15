import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { validatePassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findUserByName(username);
        
        const isMatch = await validatePassword(pass, user.senha);
        
        if(!isMatch) {
            throw new UnauthorizedException('Acesso negado');
        }

        const payload = { id: user.id, nome: user.nome };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
