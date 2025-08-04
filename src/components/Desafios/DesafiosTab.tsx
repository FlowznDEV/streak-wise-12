import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Target, 
  Star, 
  Clock, 
  Gift,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  progresso: number;
  meta: number;
  recompensa: string;
  categoria: 'treino' | 'dieta' | 'habito';
  dificuldade: 'facil' | 'medio' | 'dificil';
  status: 'ativo' | 'concluido' | 'bloqueado';
  prazoHoras: number;
}

const DesafiosTab = () => {
  const [desafios] = useState<Desafio[]>([
    {
      id: '1',
      titulo: 'Primeiro Treino',
      descricao: 'Complete seu primeiro treino do dia',
      progresso: 0,
      meta: 1,
      recompensa: '50 XP + Emblema',
      categoria: 'treino',
      dificuldade: 'facil',
      status: 'ativo',
      prazoHoras: 24
    },
    {
      id: '2',
      titulo: 'Hidratação Master',
      descricao: 'Beba 8 copos de água hoje',
      progresso: 0,
      meta: 8,
      recompensa: '30 XP',
      categoria: 'habito',
      dificuldade: 'medio',
      status: 'ativo',
      prazoHoras: 24
    },
    {
      id: '3',
      titulo: 'Sequência de 3 Dias',
      descricao: 'Mantenha uma sequência de 3 dias consecutivos',
      progresso: 0,
      meta: 3,
      recompensa: '100 XP + Título',
      categoria: 'habito',
      dificuldade: 'dificil',
      status: 'ativo',
      prazoHoras: 72
    }
  ]);

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'treino': return Target;
      case 'dieta': return Gift;
      case 'habito': return Star;
      default: return Trophy;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'treino': return 'text-treino-basic';
      case 'dieta': return 'text-diet-light';
      case 'habito': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'facil': return 'bg-success/20 text-success';
      case 'medio': return 'bg-warning/20 text-warning';
      case 'dificil': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const desafiosAtivos = desafios.filter(d => d.status === 'ativo');
  const desafiosConcluidos = desafios.filter(d => d.status === 'concluido');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="w-8 h-8 text-warning" />
          Desafios Diários
        </h1>
        <p className="text-muted-foreground">
          Complete desafios e ganhe recompensas para evoluir ainda mais!
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Desafios Ativos</p>
                <p className="text-2xl font-bold">{desafiosAtivos.length}</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">{desafiosConcluidos.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">XP Total</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Star className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desafios Ativos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Desafios de Hoje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {desafiosAtivos.map((desafio) => {
            const CategoriaIcon = getCategoriaIcon(desafio.categoria);
            const progressoPercentual = (desafio.progresso / desafio.meta) * 100;
            
            return (
              <Card key={desafio.id} className="hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CategoriaIcon className={cn("w-5 h-5", getCategoriaColor(desafio.categoria))} />
                      <CardTitle className="text-lg">{desafio.titulo}</CardTitle>
                    </div>
                    <Badge className={cn("text-xs", getDificuldadeColor(desafio.dificuldade))}>
                      {desafio.dificuldade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{desafio.descricao}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progresso */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{desafio.progresso} / {desafio.meta}</span>
                    </div>
                    <Progress value={progressoPercentual} className="h-2" />
                  </div>

                  {/* Recompensa */}
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <Gift className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">{desafio.recompensa}</span>
                  </div>

                  {/* Tempo restante */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{desafio.prazoHoras}h restantes</span>
                  </div>

                  {/* Ação */}
                  <Button 
                    className="w-full" 
                    disabled={desafio.progresso >= desafio.meta}
                  >
                    {desafio.progresso >= desafio.meta ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Concluído
                      </>
                    ) : (
                      'Iniciar Desafio'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Desafios Concluídos */}
      {desafiosConcluidos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Desafios Concluídos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {desafiosConcluidos.map((desafio) => {
              const CategoriaIcon = getCategoriaIcon(desafio.categoria);
              
              return (
                <Card key={desafio.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{desafio.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{desafio.recompensa}</p>
                      </div>
                      <CategoriaIcon className={cn("w-5 h-5", getCategoriaColor(desafio.categoria))} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesafiosTab;