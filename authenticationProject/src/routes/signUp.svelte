<script>
   let username, password, email
   import { users } from "../stores/users";
   async function signUp() {
      const isSuccess = await users.create(email, password);
      if(isSuccess){
            navigate("/home");
      }
    }
</script>

<form class="form"  >
      <h2>Sign Up</h2> <br>
   <input label= "username" bind:value= {username} type="text" placeholder="username" required /> <br>
   <input label="Email" bind:value={email} type="email" placeholder="Email" required /> <br>
   <input label="Password" bind:value={password} type="password" placeholder="Password" required /> 
   <button class="button">Sign up!</button> <br>
    Or.. <a href="/">log in</a>
</form>