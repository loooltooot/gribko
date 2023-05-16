<script lang="ts">
	import loggedIn from "$lib/stores/login";
	import api from "$lib/scripts/api";
	let form: HTMLFormElement;

	let email = "";
	let password = "";

	let travelButton: HTMLAnchorElement;
</script>

<section>
	<a href="/products" class="hidden" bind:this={travelButton} />
	<header>
		<h2>Войти в аккаунт</h2>
	</header>
	<form bind:this={form}>
		<input
			bind:value={email}
			required
			type="email"
			name="email"
			placeholder="Email"
		/>
		<input
			bind:value={password}
			required
			type="password"
			name="password"
			placeholder="Пароль"
		/>

		<input
			on:click|preventDefault={() => {
				if (email && password) {
					api.post("/login", form)
						.then((response) => {
							if (response.status == 200) {
								const authToken = response.data.authToken;

								sessionStorage.setItem("authToken", authToken);
								loggedIn.set(true);
								travelButton.click();
							}
						})
						.catch((error) => {
							// Handle error response
						});
				}
			}}
			type="submit"
			value="Войти"
		/>
	</form>
</section>

<style lang="scss">
	section {
		h2 {
			margin: 0;
		}

		form {
			display: flex;
			flex-direction: column;
			row-gap: 0.94vw;

			input {
				padding: 0.7vw 1vw;
				border-radius: 0;
			}

			input:not([type="submit"]) {
				border: 0.1vw var(--primary-color) solid;
				background: none;
			}

			input[type="submit"] {
				cursor: pointer;
				background-color: var(--primary-color);
				border: none;
				color: #000;
				font-weight: 700;
				transition: background-color 0.3s ease;
				font-size: 1.5em;

				&:hover {
					background-color: var(--second-color);
				}
			}
		}
	}
</style>
