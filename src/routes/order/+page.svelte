<script lang="ts">
	import { browser } from "$app/environment";
	import api from "$lib/scripts/api";
	import loggedIn from "$lib/stores/login";
	import cartStore from "$lib/stores/cart";

	let form: HTMLFormElement;
	let fetching = false;
	let formIsFilled = true;

	let surname: string;
	let name: string;
	let city: string;
	let street: string;
	let construction: string;
	let apartment: string;
	let details: string;
	let recepeit: string;

	$: if (!$loggedIn) {
		if (browser) {
			window.location.href = "/";
		}
	}
</script>

{#if $loggedIn}
	<section>
		<header>
			<h2>Контакты</h2>
		</header>
		<form bind:this={form}>
			<div id="name">
				<input
					bind:value={surname}
					required
					type="text"
					name="surname"
					placeholder="Фамилия"
				/>
				<input
					bind:value={name}
					required
					type="text"
					name="name"
					placeholder="Имя"
				/>
			</div>
			<div id="address">
				<h2>Адрес</h2>
				<input
					bind:value={city}
					required
					type="text"
					name="city"
					placeholder="Город"
				/>
				<input
					bind:value={street}
					required
					type="text"
					name="street"
					placeholder="Улица"
				/>
				<input
					bind:value={construction}
					required
					type="text"
					name="construction"
					placeholder="Дом"
				/>
				<input
					bind:value={apartment}
					required
					type="text"
					name="apartment"
					placeholder="Квартира"
				/>
				{#if !formIsFilled}
					<span>Заполните все поля</span>
				{/if}
			</div>
			<input type="hidden" name="recepeit" bind:value={recepeit} />
			<input type="hidden" name="details" bind:value={details} />
			<input
				type="hidden"
				name="authToken"
				value={sessionStorage.getItem("authToken")}
			/>

			<input
				on:click|preventDefault={() => {
					let recepeitMap = [];
					recepeit = "";

					$cartStore.forEach((id) => {
						let inArray = false;
						recepeitMap.forEach((product) => {
							if (product.id === id) {
								product.amount += 1;
								inArray = true;
							}
						});

						if (!inArray) {
							recepeitMap.push({ amount: 1, id: id });
						}
					});

					recepeitMap.forEach((product) => {
						recepeit += `${product.amount}|${product.id}&`;
					});

					recepeit = recepeit.substring(0, recepeit.length - 1);

					if (
						surname &&
						name &&
						city &&
						street &&
						construction &&
						apartment
					) {
						details = `Фамилия: ${surname}\n\rИмя: ${name}\n\rГород: ${city}\n\rУлица: ${street}\n\rДом: ${construction}\n\rКвартира: ${apartment}`;

						fetching = true;

						api.post("/orders", form)
							.then((response) => {
								if (response.status == 201) {
									fetching = false;
									window.location.href = "/products";
								}
							})
							.catch((error) => {
								// Handle error response
							});
					} else {
						formIsFilled = false;
					}
				}}
				type="submit"
				value={fetching ? "Оформляем заказ..." : "Оформить"}
			/>
		</form>
	</section>
{/if}

<style lang="scss">
	section {
		h2 {
			margin: 0;
		}

		form {
			display: flex;
			flex-direction: column;

			div {
				display: flex;
				flex-direction: column;
				row-gap: 0.94vw;

				&#address {
					margin-top: 2vw;
					margin-bottom: 0.94vw;
				}
			}

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
