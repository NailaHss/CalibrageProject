<script>
	import {Router, Route} from 'svelte-routing'
    import SignIn from './routes/signIn.svelte';
    import SignUp from './routes/signUp.svelte';
</script>


          <!-- <Router routes= {{
	        <Route path="/" component="{signIn}" />
	        '/signUp': SignUp  }} /> -->

            <Router>
                
                  <!-- <Route path= "/*"> 
                    <Router> -->
                  <Route path="/" component="{SignIn}" />
                  <Route path="/new" component="{SignUp}" /> <!-- </Router></Route>  -->
            </Router> 

