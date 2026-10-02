# Cadastro e autenticação

1. Execute `supabase/supabase/migrations/20261001_auth_access.sql` no SQL Editor depois do schema existente. O arquivo prepara RLS para perfis, carteiras, posts e conteúdo de prompts. Ele não substitui políticas existentes nem implementa os pagamentos ou o acesso ao marketplace.
2. Em Authentication → Providers → Email, habilite **Confirm email** e cadastro com e-mail/senha. O formulário exige de 8 a 128 caracteres, com uma letra maiúscula, uma minúscula, um número e um caractere especial. Configure o Supabase com o mínimo de 8 caracteres.
3. Em Authentication → Email Templates → **Confirm signup**, use o assunto **Seu código de confirmação OnneGram** e cole o conteúdo completo de [`supabase/email-templates/confirm-signup.html`](email-templates/confirm-signup.html) no corpo do template.

   Use a variável `{{ .Token }}` no template do **Supabase Auth**. Se o template continuar usando apenas `{{ .ConfirmationURL }}`, o usuário receberá um link em vez do código exibido na tela. O código aceita de 6 a 10 dígitos conforme o tamanho configurado no Supabase (padrão: 6). A rota `/confirmar-email` permite informar e-mail e código se a página for fechada.

4. Mantenha o SMTP da Brevo configurado no Supabase Auth. O cadastro usa `signUp`, a confirmação usa `verifyOtp` e o reenvio usa `resend`; o Supabase gera o código e entrega o e-mail pelo SMTP configurado. Nenhuma chave da Brevo deve ficar no navegador.
5. Em Authentication → URL Configuration, configure o Site URL do ambiente. Se ainda usar links de confirmação antigos, inclua `http://localhost:3000/auth/confirm` e `https://SEU-DOMINIO/auth/confirm` nos Redirect URLs. O cadastro por código não depende da abertura do link.

Variáveis utilizadas: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Nenhuma chave administrativa é necessária.

O trigger `handle_new_user` do schema existente recebe `account_type`, `language`, `profile_slug` e `display_name` como metadados. Ele cria o registro pendente de Auth, o perfil e uma carteira zerada ao cadastrar. O acesso à dashboard só ocorre depois de digitar o código e confirmar o e-mail. Confirmar o endereço não verifica a propriedade do Instagram.

O idioma escolhido é salvo em `profiles.primary_language`; a tradução das telas será uma etapa posterior. A dashboard mostra o perfil persistido no banco e não oferece publicação, saldo ou pagamentos ainda.

Para validar: cadastre um usuário e um creator com e-mails reais de teste, confirme que o e-mail enviado pela Brevo contém o código, digite-o na tela e verifique o tipo e idioma na dashboard. Teste reenvio, código inválido, recuperação em `/confirmar-email`, senha incorreta e acesso a `/dashboard` sem sessão. Um @ já utilizado deve ser rejeitado pelo índice único do banco. O Supabase pode ocultar a existência de um e-mail já cadastrado retornando sucesso genérico.

## Se o Supabase não conseguir enviar o código

Abra **Supabase → Logs**, selecione o tipo **Auth** e localize a tentativa de cadastro. O erro detalhado indica qual ajuste é necessário. A resposta pública de `signUp` não informa a causa SMTP completa.

Para pesquisar com SQL, abra **Logs → Explorer → Run SQL**, mude a fonte da consulta de **Database** para **Logs** e execute:

```sql
select timestamp, source, event_message, log_attributes['msg'] as msg
from logs
where source = 'auth_logs'
order by timestamp desc
limit 20;
```

Essa consulta usa o serviço de logs do Supabase, não o banco PostgreSQL. Executá-la na fonte Database causa `42P01: relation "logs" does not exist`.

- `535 Authentication failed`: use no Supabase o login SMTP mostrado em **Brevo → SMTP & API** e uma **chave SMTP** como senha. A chave de API e a senha da conta Brevo não servem como senha SMTP.
- `525 Unauthorized IP address`: confira as restrições de IP da Brevo. Se houver bloqueio, autorize o IP de saída usado pelo Supabase.
- `450 Your SMTP account is not yet activated`: ative os e-mails transacionais na Brevo ou procure o suporte da Brevo.
- Erro de remetente: o campo **Sender email** no Supabase deve ser um endereço verificado na Brevo ou de um domínio autenticado. O login SMTP não é o endereço de remetente.
- Erro de conexão ou porta: confirme o servidor `smtp-relay.brevo.com` e a porta `587` no Supabase. A Brevo também aceita `465` e `2525` em condições específicas.
- Erro de template: teste um template **Confirm signup** simples com `{{ .Token }}` no Supabase.

Confira também **Brevo → Transactional → Real time** para ver tentativas, recusas e filas. Não inclua a chave SMTP em logs ou mensagens de suporte.
