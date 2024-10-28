"use client"
import { TipoLanche } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CadProduto() {

    const navigate = useRouter();

    const [produto, setProduto] = useState<TipoLanche>({
        id: 0,
        nome: "",
        preco:0.0,
        desc: "",
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/base-route",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            });

            if(response.ok){
                alert("Produto cadastrado com sucesso");
                // reset no state
                setProduto({
                    id: 0,
                    nome: "",
                    preco:0.0,
                    desc: "",
                    });
                //Realizar um redirect para /produtos
                navigate.push("/produtos");
            }

        } catch (error) {
            console.error("Falha ao realizar o cadastro: ",error);
            
        }
    }

    return (
        <div>
            <h1>Cadastro de Produtos</h1>
            
            <div>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Nome</label>
                        <input
                            type="text"
                            id="idNome"
                            name="nome"
                            value={produto.nome}
                            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                            placeholder="Nome do produto"
                            required
                        />
                    </div>
                    <div>
                        <label>Preço</label>
                        <input
                            type="number"
                            id="idPreco"
                            name="preco"
                            value={produto.preco}
                            onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })}
                            placeholder="Preço do produto"
                            required
                            min={0}
                        />
                    </div>
                    <div>
                        <label>Descrição</label>
                        <input
                            type="text"
                            id="idDesc"
                            name="desc"
                            value={produto.desc}
                            onChange={(e) => setProduto({ ...produto, desc: e.target.value })}
                            placeholder="Descrição do produto"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
