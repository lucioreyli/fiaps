import Link from "next/link";

export default function Menu() {
    return (

        <nav>
            <ul>
                <li> <Link href="/">Home</Link> </li>
                <li> <Link href="/produtos">Produtos</Link> </li>
                <li> <Link href="/produtos/cad-produto">Cadastrar</Link> </li>
            </ul>
        </nav>

    )
}
