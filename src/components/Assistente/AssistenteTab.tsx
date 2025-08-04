import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Brain,
  MessageCircle,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Mensagem {
  id: string;
  texto: string;
  remetente: 'user' | 'ai';
  timestamp: Date;
}

const AssistenteTab = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: '1',
      texto: 'Olá! Sou seu assistente pessoal de fitness. Como posso te ajudar hoje?',
      remetente: 'ai',
      timestamp: new Date()
    }
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sugestoesRapidas = [
    'Como melhorar minha dieta?',
    'Preciso de um treino para hoje',
    'Qual minha evolução esta semana?',
    'Dicas de motivação'
  ];

  const handleEnviarMensagem = () => {
    if (!novaMensagem.trim()) return;

    const mensagemUser: Mensagem = {
      id: Date.now().toString(),
      texto: novaMensagem,
      remetente: 'user',
      timestamp: new Date()
    };

    setMensagens(prev => [...prev, mensagemUser]);
    setNovaMensagem('');
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const respostaIA: Mensagem = {
        id: (Date.now() + 1).toString(),
        texto: 'Ótima pergunta! Com base no seu perfil e histórico, recomendo que você...',
        remetente: 'ai',
        timestamp: new Date()
      };
      setMensagens(prev => [...prev, respostaIA]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSugestao = (sugestao: string) => {
    setNovaMensagem(sugestao);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="w-8 h-8 text-treino-body" />
          Assistente IA
        </h1>
        <p className="text-muted-foreground">
          Seu treinador pessoal inteligente, disponível 24/7 para te ajudar
        </p>
      </div>

      {/* Recursos do Assistente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-treino-body mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Análise Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              Análise do seu progresso e sugestões personalizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-warning mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Dicas Personalizadas</h3>
            <p className="text-sm text-muted-foreground">
              Conselhos adaptados ao seu perfil e objetivos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Respostas Rápidas</h3>
            <p className="text-sm text-muted-foreground">
              Suporte instantâneo para suas dúvidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-treino-body" />
            Conversa com IA
            <Badge variant="outline" className="ml-auto">Online</Badge>
          </CardTitle>
        </CardHeader>

        {/* Mensagens */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {mensagens.map((mensagem) => (
            <div
              key={mensagem.id}
              className={cn(
                "flex gap-3",
                mensagem.remetente === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {mensagem.remetente === 'ai' && (
                <div className="w-8 h-8 bg-treino-body/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-treino-body" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3",
                  mensagem.remetente === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{mensagem.texto}</p>
                <p className={cn(
                  "text-xs mt-1",
                  mensagem.remetente === 'user' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                )}>
                  {mensagem.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {mensagem.remetente === 'user' && (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-treino-body/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-treino-body" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Sugestões Rápidas */}
        <div className="p-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Sugestões rápidas:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {sugestoesRapidas.map((sugestao, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSugestao(sugestao)}
                className="text-xs"
              >
                {sugestao}
              </Button>
            ))}
          </div>
        </div>

        {/* Input de Mensagem */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              placeholder="Digite sua pergunta..."
              onKeyDown={(e) => e.key === 'Enter' && handleEnviarMensagem()}
              className="flex-1"
            />
            <Button 
              onClick={handleEnviarMensagem}
              disabled={!novaMensagem.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssistenteTab;