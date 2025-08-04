import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Play, 
  Clock, 
  User, 
  Search,
  Star,
  TrendingUp,
  Target,
  Heart,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conteudo {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'treino' | 'nutricao' | 'mindset' | 'tecnica';
  tipo: 'video' | 'artigo' | 'podcast';
  duracao: string;
  instrutor: string;
  rating: number;
  visualizacoes: number;
  thumbnail?: string;
}

const AprendaTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');

  const conteudos: Conteudo[] = [
    {
      id: '1',
      titulo: 'Fundamentos do Treino de Força',
      descricao: 'Aprenda os princípios básicos para ganhar força e massa muscular de forma eficiente.',
      categoria: 'treino',
      tipo: 'video',
      duracao: '15 min',
      instrutor: 'Prof. Carlos Silva',
      rating: 4.8,
      visualizacoes: 1250
    },
    {
      id: '2',
      titulo: 'Nutrição para Emagrecimento',
      descricao: 'Estratégias nutricionais comprovadas para perder peso de forma saudável.',
      categoria: 'nutricao',
      tipo: 'artigo',
      duracao: '8 min leitura',
      instrutor: 'Dra. Ana Costa',
      rating: 4.9,
      visualizacoes: 890
    },
    {
      id: '3',
      titulo: 'Mindset Vencedor no Fitness',
      descricao: 'Como desenvolver a mentalidade certa para alcançar seus objetivos.',
      categoria: 'mindset',
      tipo: 'podcast',
      duracao: '25 min',
      instrutor: 'Dr. Pedro Mendes',
      rating: 4.7,
      visualizacoes: 650
    },
    {
      id: '4',
      titulo: 'Técnica Perfeita no Agachamento',
      descricao: 'Guia completo para executar o agachamento com segurança e eficiência.',
      categoria: 'tecnica',
      tipo: 'video',
      duracao: '12 min',
      instrutor: 'Prof. Maria Santos',
      rating: 4.9,
      visualizacoes: 2100
    }
  ];

  const categorias = [
    { id: 'todos', label: 'Todos', icon: BookOpen, color: 'text-primary' },
    { id: 'treino', label: 'Treino', icon: Target, color: 'text-treino-basic' },
    { id: 'nutricao', label: 'Nutrição', icon: Heart, color: 'text-diet-light' },
    { id: 'mindset', label: 'Mindset', icon: Brain, color: 'text-warning' },
    { id: 'tecnica', label: 'Técnica', icon: TrendingUp, color: 'text-info' }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'video': return Play;
      case 'artigo': return BookOpen;
      case 'podcast': return Clock;
      default: return BookOpen;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'video': return 'text-destructive';
      case 'artigo': return 'text-info';
      case 'podcast': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const conteudosFiltrados = conteudos.filter(conteudo => {
    const matchesSearch = conteudo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conteudo.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filtroCategoria === 'todos' || conteudo.categoria === filtroCategoria;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-diet-moderate" />
          Central de Aprendizado
        </h1>
        <p className="text-muted-foreground">
          Expanda seus conhecimentos com conteúdo educativo de alta qualidade
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conteúdos</p>
                <p className="text-2xl font-bold">{conteudos.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vídeos</p>
                <p className="text-2xl font-bold">{conteudos.filter(c => c.tipo === 'video').length}</p>
              </div>
              <Play className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Artigos</p>
                <p className="text-2xl font-bold">{conteudos.filter(c => c.tipo === 'artigo').length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Podcasts</p>
                <p className="text-2xl font-bold">{conteudos.filter(c => c.tipo === 'podcast').length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => {
            const Icon = categoria.icon;
            const isActive = filtroCategoria === categoria.id;
            
            return (
              <Button
                key={categoria.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroCategoria(categoria.id)}
                className="gap-2"
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : categoria.color)} />
                {categoria.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Lista de Conteúdos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conteudosFiltrados.map((conteudo) => {
          const TipoIcon = getTipoIcon(conteudo.tipo);
          
          return (
            <Card key={conteudo.id} className="hover-lift cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{conteudo.titulo}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {conteudo.descricao}
                    </p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <TipoIcon className={cn("w-3 h-3", getTipoColor(conteudo.tipo))} />
                    {conteudo.tipo}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Instrutor e Duração */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{conteudo.instrutor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{conteudo.duracao}</span>
                  </div>
                </div>

                {/* Rating e Visualizações */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="font-medium">{conteudo.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {conteudo.visualizacoes.toLocaleString()} visualizações
                  </span>
                </div>

                {/* Ação */}
                <Button className="w-full gap-2">
                  <TipoIcon className="w-4 h-4" />
                  {conteudo.tipo === 'video' ? 'Assistir' : 
                   conteudo.tipo === 'artigo' ? 'Ler' : 'Ouvir'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {conteudosFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum conteúdo encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AprendaTab;