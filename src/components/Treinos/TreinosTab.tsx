import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Clock, 
  Zap, 
  Target, 
  Play, 
  CheckCircle,
  Timer,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Workout {
  id: string;
  name: string;
  category: 'basic' | 'medium' | 'body';
  duration: string;
  exercises: Exercise[];
  description: string;
  targetMuscles: string[];
  calories: number;
}

const TreinosTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'medium' | 'body'>('basic');
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);

  // Mock data - será substituído pelos dados do JSON
  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Treino Básico - Corpo Inteiro',
      category: 'basic',
      duration: '30 min',
      description: 'Treino completo para iniciantes focado em movimentos básicos',
      targetMuscles: ['Pernas', 'Braços', 'Core'],
      calories: 200,
      exercises: [
        {
          name: 'Agachamento',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          description: 'Mantenha a postura ereta, desça até 90 graus',
          difficulty: 'beginner'
        },
        {
          name: 'Flexão',
          sets: 3,
          reps: '8-12',
          rest: '60s',
          description: 'Pode ser feito nos joelhos se necessário',
          difficulty: 'beginner'
        },
        {
          name: 'Prancha',
          sets: 3,
          reps: '30s',
          rest: '45s',
          description: 'Mantenha o corpo alinhado',
          difficulty: 'beginner'
        }
      ]
    },
    {
      id: '2',
      name: 'Treino Intermediário - Upper Body',
      category: 'medium',
      duration: '45 min',
      description: 'Treino focado em parte superior do corpo',
      targetMuscles: ['Peito', 'Costas', 'Ombros', 'Braços'],
      calories: 300,
      exercises: [
        {
          name: 'Supino',
          sets: 4,
          reps: '8-10',
          rest: '90s',
          description: 'Movimento controlado, foco na técnica',
          difficulty: 'intermediate'
        },
        {
          name: 'Remada',
          sets: 4,
          reps: '10-12',
          rest: '90s',
          description: 'Puxe até o peito, controle a descida',
          difficulty: 'intermediate'
        },
        {
          name: 'Desenvolvimento',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Movimento vertical, core contraído',
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: '3',
      name: 'Treino Avançado - Hipertrofia',
      category: 'body',
      duration: '60 min',
      description: 'Treino intenso para ganho de massa muscular',
      targetMuscles: ['Corpo Inteiro'],
      calories: 450,
      exercises: [
        {
          name: 'Deadlift',
          sets: 5,
          reps: '5-6',
          rest: '120s',
          description: 'Movimento técnico, foque na forma',
          difficulty: 'advanced'
        },
        {
          name: 'Agachamento Búlgaro',
          sets: 4,
          reps: '8-10',
          rest: '90s',
          description: 'Cada perna, movimento unilateral',
          difficulty: 'advanced'
        },
        {
          name: 'Pull-ups',
          sets: 4,
          reps: '6-8',
          rest: '90s',
          description: 'Pegada pronada, amplitude completa',
          difficulty: 'advanced'
        }
      ]
    }
  ];

  const categories = [
    {
      id: 'basic' as const,
      name: 'Basic Builder',
      description: 'Treinos fundamentais',
      color: 'text-treino-basic',
      bgColor: 'bg-treino-basic/10',
      icon: Target
    },
    {
      id: 'medium' as const,
      name: 'Medium Builder',
      description: 'Treinos intermediários',
      color: 'text-treino-medium',
      bgColor: 'bg-treino-medium/10',
      icon: Zap
    },
    {
      id: 'body' as const,
      name: 'Body Builder',
      description: 'Treinos avançados',
      color: 'text-treino-body',
      bgColor: 'bg-treino-body/10',
      icon: Flame
    }
  ];

  const filteredWorkouts = workouts.filter(workout => workout.category === selectedCategory);

  const handleCompleteWorkout = (workoutId: string) => {
    setCompletedWorkouts(prev => 
      prev.includes(workoutId) 
        ? prev.filter(id => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-treino-basic" />
          Treinos
        </h1>
        <p className="text-muted-foreground">
          Escolha seu nível e comece a treinar
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover-lift",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                  category.bgColor
                )}>
                  <Icon className={cn("w-8 h-8", category.color)} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                {isSelected && (
                  <Badge className="mt-2">Selecionado</Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Workouts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Treinos {categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        
        {filteredWorkouts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum treino encontrado para esta categoria
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredWorkouts.map((workout) => {
              const isCompleted = completedWorkouts.includes(workout.id);
              
              return (
                <Card key={workout.id} className="hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          {workout.name}
                          {isCompleted && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {workout.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {workout.targetMuscles.map((muscle, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {workout.duration}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="w-4 h-4" />
                          {workout.calories} cal
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Exercises */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Exercícios:</h4>
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{exercise.name}</span>
                              <Badge 
                                variant="outline" 
                                className={getDifficultyColor(exercise.difficulty)}
                              >
                                {exercise.difficulty}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {exercise.description}
                            </p>
                          </div>
                          <div className="text-right text-sm">
                            <div>{exercise.sets} séries</div>
                            <div>{exercise.reps} reps</div>
                            <div className="text-muted-foreground">
                              <Timer className="w-3 h-3 inline mr-1" />
                              {exercise.rest}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleCompleteWorkout(workout.id)}
                        variant={isCompleted ? "outline" : "default"}
                        className="flex-1"
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Concluído
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar Treino
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Training Tips */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Dicas de Treino
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">• Sempre faça aquecimento antes dos exercícios</p>
          <p className="text-sm">• Mantenha a hidratação durante o treino</p>
          <p className="text-sm">• Foque na técnica antes da intensidade</p>
          <p className="text-sm">• Respeite os intervalos de descanso</p>
          <p className="text-sm">• Escute seu corpo e não force lesões</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreinosTab;