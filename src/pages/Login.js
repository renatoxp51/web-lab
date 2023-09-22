

function Login(){
    return(
        <div>
             <form>
                <h1>Login</h1>
                <label>Nome: </label>
                <input type="email" placeholder="example@example.com" />

                <label>Senha: </label>
                <input type="password" placeholder="Sua senha"/>
            </form>
        </div>
       
    )
}

export default Login