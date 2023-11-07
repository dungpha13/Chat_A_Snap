<script>
    import axios from "axios";

    axios.defaults.withCredentials = true;

    let message = "";
    let formData = {
        username: "",
        password: "",
    };

    async function handleSubmit() {
        console.log("Form submitted:", formData);
        await axios
            .post("http://localhost:3000/auth/api/login", formData)
            .then(function (response) {
                if (response.data.status === 200) {
                    message = "Welcome back " + response.data.data.fullName;
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
</script>

<div>
    <form id="login-form" on:submit={handleSubmit}>
        <div id="input-username">
            <input
                type="text"
                id="username"
                placeholder="Username"
                bind:value={formData.username}
            />
            {#if formData.username === ""}
                <div>Username is require</div>
            {/if}
        </div>
        <div id="input-pass">
            <input
                type="password"
                id="password"
                placeholder="Password"
                bind:value={formData.password}
            />
            {#if formData.password === ""}
                <div>Password is require</div>
            {/if}
        </div>
        <button type="submit" value="Login">Login</button>
        {#if message !== ""}
            <div>{message}</div>
        {/if}
    </form>
</div>
