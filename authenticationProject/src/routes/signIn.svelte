
<script>
import { navigate } from "svelte-routing";
import { user } from "../stores/user";
    let email, password
    
    async function login() {
      const isSuccess = await user.login(email, password);
      console.log(isSuccess)

      if(isSuccess){
            navigate("/new");
      }else{
        console.log("error")
      }
    }
</script>

<div class="form">
<form >
      <input type="email" placeholder="Email" bind:value={email} required> <br>
      <input type="password" placeholder="Password" bind:value={password} required><br>
    <input type="button" on:click="{login}" value="LOGIN"></form>
</div>
