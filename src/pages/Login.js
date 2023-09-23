import { useState } from "react";

function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify({email, password}));

        // const response = await axios.post("",
        //     JSON.stringify({email, password}),
        //     {
        //         headers: { 'Content-Type': 'application/json'}
        //     }
        // );
    };



    return(
        <div>
            <h1>Faça agora o seu LOGIN aqui</h1>
             <form>
                <h1>Login</h1>
                <label>Email: </label>
                <input type="email" 
                placeholder="example@example.com" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />

                <label>Senha: </label>
                <input type="password"
                placeholder="Sua senha"
                onChange={(e) => setPassword(e.target.value)} 
                required
                />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
       
    )
}

export default Login