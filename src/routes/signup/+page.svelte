<section>
	<header>
		<h2>Зарегистрировать аккаунт</h2>
	</header>
	<form>
		<input required type="email" name="email" placeholder="Email" />
		<input required type="password" name="password" placeholder="Пароль" />
		<input
			required
			type="password"
			name="password-confirmation"
			placeholder="Подтвердите пароль"
		/>

		<input
			on:click|preventDefault={() => {}}
			type="submit"
			value="Зарегистрироваться"
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
