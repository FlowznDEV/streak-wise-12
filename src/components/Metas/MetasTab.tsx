import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp, 
  Award, 
  Flame, 
  CheckCircle,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Meta {
  id: string;
  title: string;
  description: string;
  type: 'treino' | 'dieta' | 'habito' | 'personalizada';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  priority: 'baixa' | 'media' | 'alta';
  status: 'ativa' | 'concluida' | 'pausada';
  createdAt: string;
}

const MetasTab = () => {
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: '1',
      title: 'Sequência de 30 dias',
      description: 'Manter treinos por 30 dias consecutivos',
      type: 'treino',
      target: 30,
      current: 7,
      unit: 'dias',
      deadline: '2025-09-03',
      priority: 'alta',
      status: 'ativa',
      createdAt: '2025-08-04'
    },
    {
      id: '2',
      title: 'Perder 5kg',
      description: 'Atingir peso ideal através de dieta balanceada',
      type: 'dieta',
      target: 5,
      current: 1.5,
      unit: 'kg',
      deadline: '2025-11-04',
      priority: 'alta',
      status: 'ativa',
      createdAt: '2025-08-04'
    },
    {
      id: '3',
      title: 'Beber 2L de água',
      description: 'Manter hidratação adequada diariamente',
      type: 'habito',
      target: 30,
      current: 15,
      unit: 'dias',
      deadline: '2025-09-03',
      priority: 'media',
      status: 'ativa',
      createdAt: '2025-08-04'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeta, setNewMeta] = useState({
    title: '',
    description: '',
    type: 'personalizada',
    target: 0,
    unit: '',
    deadline: '',
    priority: 'media'
  });

  const handleCreateMeta = () => {
    if (!newMeta.title || !newMeta.target || !newMeta.deadline) return;

    const meta: Meta = {
      id: Date.now().toString(),
      title: newMeta.title,
      description: newMeta.description,
      type: newMeta.type as Meta['type'],
      target: newMeta.target,
      current: 0,
      unit: newMeta.unit,
      deadline: newMeta.deadline,
      priority: newMeta.priority as Meta['priority'],
      status: 'ativa',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMetas(prev => [...prev, meta]);
    setNewMeta({
      title: '',
      description: '',
      type: 'personalizada',
      target: 0,
      unit: '',
      deadline: '',
      priority: 'media'
    });
    setShowCreateForm(false);
  };

  const handleUpdateProgress = (metaId: string, newValue: number) => {
    setMetas(prev => prev.map(meta => 
      meta.id === metaId 
        ? { 
            ...meta, 
            current: Math.min(newValue, meta.target),
            status: newValue >= meta.target ? 'concluida' : 'ativa'
          }
        : meta
    ));
  };

  const handleDeleteMeta = (metaId: string) => {
    setMetas(prev => prev.filter(meta => meta.id !== metaId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'treino': return Target;
      case 'dieta': return Flame;
      case 'habito': return CheckCircle;
      default: return Award;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'treino': return 'text-treino-basic';
      case 'dieta': return 'text-diet-light';
      case 'habito': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-destructive';
      case 'media': return 'text-warning';
      case 'baixa': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-primary';
      case 'concluida': return 'bg-success';
      case 'pausada': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const activeMetas = metas.filter(meta => meta.status === 'ativa');
  const completedMetas = metas.filter(meta => meta.status === 'concluida');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-warning" />
            Metas
          </h1>
          <p className="text-muted-foreground">
            Defina e acompanhe seus objetivos
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{activeMetas.length}</div>
            <div className="text-sm text-muted-foreground">Metas Ativas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{completedMetas.length}</div>
            <div className="text-sm text-muted-foreground">Concluídas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {Math.round((completedMetas.length / metas.length) * 100) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-info mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {activeMetas.filter(meta => {
                const deadline = new Date(meta.deadline);
                const today = new Date();
                const diffTime = deadline.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}
            </div>
            <div className="text-sm text-muted-foreground">Próximas ao Prazo</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Meta Form */}
      {showCreateForm && (
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Criar Nova Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Meta *</Label>
                <Input
                  id="title"
                  value={newMeta.title}
                  onChange={(e) => setNewMeta(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Perder 3kg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Meta</Label>
                <Select 
                  value={newMeta.type} 
                  onValueChange={(value) => setNewMeta(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="treino">Treino</SelectItem>
                    <SelectItem value="dieta">Dieta</SelectItem>
                    <SelectItem value="habito">Hábito</SelectItem>
                    <SelectItem value="personalizada">Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={newMeta.description}
                onChange={(e) => setNewMeta(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva sua meta..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Meta *</Label>
                <Input
                  id="target"
                  type="number"
                  value={newMeta.target}
                  onChange={(e) => setNewMeta(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                  placeholder="Ex: 30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
                <Input
                  id="unit"
                  value={newMeta.unit}
                  onChange={(e) => setNewMeta(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="Ex: dias, kg, km"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Prazo *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newMeta.deadline}
                  onChange={(e) => setNewMeta(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={newMeta.priority} 
                onValueChange={(value) => setNewMeta(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateMeta}>Criar Meta</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Metas Ativas</h2>
        {activeMetas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma meta ativa. Crie sua primeira meta!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeMetas.map((meta) => {
              const Icon = getTypeIcon(meta.type);
              const progress = (meta.current / meta.target) * 100;
              const deadline = new Date(meta.deadline);
              const today = new Date();
              const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <Card key={meta.id} className="hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-5 h-5", getTypeColor(meta.type))} />
                          <CardTitle className="text-lg">{meta.title}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", getPriorityColor(meta.priority))}
                          >
                            {meta.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{meta.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteMeta(meta.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">
                          {meta.current} / {meta.target} {meta.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {Math.round(progress)}% concluído
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Prazo:</span>
                      </div>
                      <span className={cn(
                        "font-medium",
                        daysLeft <= 7 ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {daysLeft > 0 ? `${daysLeft} dias` : 'Vencido'}
                      </span>
                    </div>

                    {/* Update Progress */}
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Novo valor"
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              handleUpdateProgress(meta.id, value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <Button 
                        size="sm"
                        onClick={() => {
                          const input = document.querySelector(`input[placeholder="Novo valor"]`) as HTMLInputElement;
                          const value = parseFloat(input.value);
                          if (!isNaN(value)) {
                            handleUpdateProgress(meta.id, value);
                            input.value = '';
                          }
                        }}
                      >
                        Atualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Goals */}
      {completedMetas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Metas Concluídas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedMetas.map((meta) => {
              const Icon = getTypeIcon(meta.type);
              
              return (
                <Card key={meta.id} className="opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{meta.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meta.target} {meta.unit} - Concluída!
                        </p>
                      </div>
                      <Award className="w-5 h-5 text-warning" />
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

export default MetasTab;