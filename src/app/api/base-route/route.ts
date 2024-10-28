import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoLanche } from "@/types/types";

export async function GET() {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
}

export async function POST(request:Request) {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoLanche[] = JSON.parse(file);

    //Realizar o destructuring no objeto request.
    // const{id, nome} = await request.json();
    const produto:TipoLanche = await request.json();
    console.log("PRODUTO : " , produto);

    const novoId = produtos[ produtos.length -1].id + 1

    produto.id = novoId;

    produtos.push(produto);

    const fileUpdate =  JSON.stringify(produtos);

    await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);

    return NextResponse.json(produto,{status:201});
}