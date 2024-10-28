"use client";
import { TipoLanche } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Produtos() {

    const [lista, setLista] = useState<TipoLanche[]>([]);
    
    useEffect(() => {
        
        const chamadaDaApi = async () =>{
            const response = await fetch("http://localhost:3000/api/base-route");
            const dados = await response.json();
            setLista(dados);
        };

        chamadaDaApi();
    }, [])
    
    const handleDelete = async (id:number)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/base-route/${id}`,{
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Produto excluído com sucesso!");
                window.location.reload();
            }

        } catch (error) {
            console.error("Falha na exclusão do produto: ", error);
        }
    }

    return (
        <div className="content-wrap">
            <h2>Produtos</h2>
            <table className="tabelaProd">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>R$</th>
                        <th>DESCRIÇÃO</th>
                        <th>EDITAR | EXCLUIR</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((lanche) => (
                        <tr key={lanche.id}>
                            <td>{lanche.id}</td>
                            <td>{lanche.nome}</td>
                            <td>{lanche.preco}</td>
                            <td>{lanche.desc}</td>
                            <td> <Link href={`/produtos/${lanche.id}`}>Editar</Link> | 
                            <Link href="#" onClick={()=> handleDelete(lanche.id)}> Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de lanches : {lista.length}
                        </td>
                        
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
