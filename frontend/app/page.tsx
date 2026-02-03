"use client"


import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Home() {
// Isso simula o que virá da sua API Python depois
const [listaLivros, setListaLivros] = useState([
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 },
  { id: 2, titulo: "1984", autor: "George Orwell", ano: 1949 },
  { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 },
]);

const [textoBusca, setTextoBusca] = useState("");

const [novoTitulo, setNovoTitulo] = useState("");
const [novoAutor, setNovoAutor] = useState("");
const [novoAno, setNovoAno] = useState("");
const [Open, setOpen] = useState(false);

const carregarLivros = async() => {
  try{
    const response = await fetch("http://127.0.0.1:5000/books");
    const data = await response.json();
    setListaLivros(data);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
};

useEffect(() => {
  const inicializar = async () => {
    await carregarLivros();
  };
  inicializar();
}, []);


const adicionarLivro = async () => {
  if (!novoTitulo || !novoAutor) return;
  
  const novoLivro = {
    titulo: novoTitulo,
    autor: novoAutor,
    ano: Number(novoAno), 
  };
  
  try {
    const response = await fetch("http://127.0.0.1:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoLivro),
    });

    if (response.ok) {
      await carregarLivros();

      setOpen(false);
      setNovoTitulo("");
      setNovoAutor("");
      setNovoAno("");
    } 
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    }
  }


const removerLivro = async(id: number) => {
  const novaLista = listaLivros.filter((livro) => livro.id !== id);
  setListaLivros(novaLista);
};


  // Filtra a lista de livros com base na busca
  const livrosFiltrados = listaLivros.filter((livro) =>{
    const termo = textoBusca.toLowerCase();
    return(
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)
    )
    
  });


  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Biblioteca MuraBei</h1>

      <Dialog open={Open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><Plus className="h-4 w-4 mr-2" /> Adicionar Livro</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Livro</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="autor">Autor</Label>
              <Input
                id="autor"
                value={novoAutor}
                onChange={(e) => setNovoAutor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ano">Ano</Label>
              <Input
                id="ano"
                type="number"
                value={novoAno}
                onChange={(e) => setNovoAno(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={adicionarLivro}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-6"></div>
      <Input
        type="text"
        placeholder="Buscar por título ou autor..."
        value={textoBusca}
        onChange={(e) => setTextoBusca(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead className="text-right">Ano</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {livrosFiltrados.map((livro) => (
              <TableRow key={livro.id}>
                <TableCell className="font-medium">{livro.titulo}</TableCell>
                <TableCell>{livro.autor}</TableCell>
                <TableCell className="text-right">{livro.ano}</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => removerLivro(livro.id)}>
                  <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
