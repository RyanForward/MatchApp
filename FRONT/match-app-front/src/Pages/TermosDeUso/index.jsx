import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TermsOfUse = () => {
    const logo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/logo-completo.png?alt=media&token=719c282e-32a0-4c91-908a-6fb1dbcd0c1b'

    return (
        <Container maxWidth="md" sx={{ 
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Box sx={{
                marginBottom: 4
            }}>
                <Box mb={2}>
                    <img 
                        src={logo} 
                        alt="Descrição da imagem"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </Box>
                <Typography variant="h4" gutterBottom>
                    Termos de Uso - Match
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    1. Aceitação dos Termos
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Ao utilizar o Match, você concorda em cumprir e ser legalmente vinculado por estes Termos de Uso. Caso você não concorde com qualquer parte destes termos, não utilize a aplicação.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    2. Descrição do Serviço
                </Typography>
                <Typography variant="body1" gutterBottom>
                    O Match é uma plataforma para organizar e participar de partidas esportivas, além de permitir a interação entre usuários com interesses esportivos em comum. O serviço inclui um mapa para localizar eventos próximos e a possibilidade de dar feedback aos participantes após as partidas.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    3. Registro e Conta do Usuário
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Para acessar os recursos do Match, você deve criar uma conta fornecendo informações precisas, completas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de login e pela segurança de sua conta.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    4. Organização e Participação em Partidas
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Ao organizar ou se inscrever em uma partida, você concorda em cumprir os regulamentos do esporte e as regras específicas definidas pelos organizadores das partidas. A Match não se responsabiliza por lesões, acidentes ou qualquer outro problema que ocorra durante as partidas.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    5. Avaliação dos Participantes
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Após uma partida, os usuários têm a opção de avaliar outros participantes. As avaliações devem ser feitas com honestidade, baseando-se exclusivamente no desempenho esportivo e comportamento durante a partida. Não serão toleradas avaliações ofensivas ou difamatórias.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    6. Conduta do Usuário
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Você concorda em usar o Match de forma responsável e respeitosa, sem:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Usar linguagem ofensiva ou abusiva.</li>
                        <li>Organizar eventos falsos ou enganosos.</li>
                        <li>Usar a aplicação para fins ilícitos ou fraudulentos.</li>
                    </ul>
                    A Match reserva-se o direito de suspender ou encerrar a conta de qualquer usuário que violar esses termos.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    7. Limitação de Responsabilidade
                </Typography>
                <Typography variant="body1" gutterBottom>
                    O Match não se responsabiliza por:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Erros, falhas ou interrupções no serviço.</li>
                        <li>A conduta de outros usuários dentro ou fora da plataforma.</li>
                        <li>Qualquer dano físico ou material ocorrido durante as partidas.</li>
                    </ul>
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    8. Modificações dos Termos
                </Typography>
                <Typography variant="body1" gutterBottom>
                    A Match pode modificar estes Termos de Uso a qualquer momento. Quaisquer alterações serão notificadas por meio da aplicação, e o uso continuado da plataforma implica na aceitação dos termos atualizados.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    9. Legislação Aplicável
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Estes Termos de Uso são regidos pelas leis vigentes no Brasil. Qualquer disputa será resolvida no foro da comarca do usuário.
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsOfUse;
