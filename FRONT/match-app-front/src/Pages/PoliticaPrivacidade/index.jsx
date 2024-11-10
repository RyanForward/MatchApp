import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from '../Navbar'; // Importando o componente Navbar
import logo from '../../Assets/imgs/logo-completo.png';

const PrivacyPolicy = () => {
    return (
        <>
        <nav>
          <Navbar />
        </nav>  
        <Container maxWidth="md" sx={{ 
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Box sx={{
                marginBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Box mb={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img 
                        src={logo} 
                        alt="Descrição da imagem"
                        style={{ width: '40%', height: 'auto' }}
                    />
                </Box>
                <Typography variant="h4" gutterBottom>
                    Política de Privacidade - Match
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    1. Coleta de Informações
                </Typography>
                <Typography variant="body1" gutterBottom>
                    O Match coleta os seguintes tipos de informações:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Informações Pessoais: Nome, e-mail, localização (para encontrar partidas próximas), e informações do perfil.</li>
                        <li>Dados de Uso: Informações sobre como você interage com a aplicação, como cliques, páginas visualizadas e duração das sessões.</li>
                        <li>Dados de Localização: Com sua permissão, coletamos sua localização geográfica para exibir as partidas mais próximas.</li>
                    </ul>
                </Typography>
                <br />
                <Typography variant="h6" gutterBottom>
                    2. Uso das Informações
                </Typography>
                <Typography variant="body1" gutterBottom>
                    As informações coletadas são usadas para:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Facilitar a organização e participação em partidas.</li>
                        <li>Personalizar sua experiência com a exibição de partidas próximas e sugestões.</li>
                        <li>Melhorar o funcionamento e segurança da aplicação.</li>
                        <li>Permitir a interação entre os usuários, como avaliações pós-jogo.</li>
                    </ul>
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    3. Compartilhamento de Informações
                </Typography>
                <Typography variant="body1" gutterBottom>
                    O Match não vende, aluga ou compartilha suas informações pessoais com terceiros, exceto:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Quando for necessário para o funcionamento da aplicação (como a exibição de partidas próximas).</li>
                        <li>Para cumprir obrigações legais ou responder a processos judiciais.</li>
                        <li>Para proteger os direitos e a segurança dos usuários e da aplicação.</li>
                    </ul>
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    4. Segurança dos Dados
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Tomamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração ou divulgação. No entanto, nenhum sistema de segurança é infalível, e não podemos garantir completamente a segurança de suas informações.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    5. Direitos do Usuário
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Você tem o direito de:
                    <ul style={{ paddingLeft: '40px' }}>
                        <li>Acessar, corrigir ou excluir suas informações pessoais armazenadas pela Match.</li>
                        <li>Revogar a permissão de coleta de dados de localização a qualquer momento, desativando essa funcionalidade nas configurações do aplicativo.</li>
                        <li>Solicitar a exclusão de sua conta e de todos os seus dados associados.</li>
                    </ul>
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    6. Cookies
                </Typography>
                <Typography variant="body1" gutterBottom>
                    O Match pode utilizar cookies para aprimorar a experiência do usuário, como lembrar suas preferências e facilitar o login. Você pode optar por desativar os cookies nas configurações do seu navegador, mas isso pode limitar algumas funcionalidades do serviço.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    7. Alterações na Política de Privacidade
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer mudanças serão comunicadas por meio da aplicação, e o uso continuado do serviço após as mudanças significa sua aceitação das novas condições.
                </Typography>

                <br />
                <Typography variant="h6" gutterBottom>
                    8. Contato
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Se você tiver qualquer dúvida sobre esta Política de Privacidade ou quiser exercer seus direitos de usuário, entre em contato conosco pelo e-mail: suporte@matchapp.com.
                </Typography>
            </Box>
        </Container>
        </>
    );
    
};

export default PrivacyPolicy;
