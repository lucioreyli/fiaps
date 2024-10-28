"use client"
import { TipoLanche } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function EditarProdutos({params}:{params:{id:number}}) {

    const navigate = useRouter();

    const [produto, setProduto] = useState<TipoLanche>({
        id: 0,
        nome: "",
        preco:0.0,
        desc: "",
    });

    useEffect(() => {
      const chamadaDaApi = async () =>{
          const response = await fetch(`http://localhost:3000/api/base-route/${params.id}`);
          const dados = await response.json();
          setProduto(dados);
      };
      chamadaDaApi();
  }, []);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const{name,value} = e.target;
            setProduto({...produto,[name]:value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/base-route/${params.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            });

            if(response.ok){
                alert("Produto alterado com sucesso");
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
            console.error("Falha ao realizar a alteração: ",error);
            
        }
    }

    return (
        <div>
            <h1>Editar Produtos</h1>
            
            <div>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Nome</label>
                        <input
                            type="text"
                            id="idNome"
                            name="nome"
                            value={produto.nome}
                onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
                            placeholder="Descrição do produto"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Alterar</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
