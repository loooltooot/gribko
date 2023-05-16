<script>
	import api from "$lib/scripts/api";
	import loggedIn from "$lib/stores/login";
</script>

{#if !$loggedIn}
	<div>
		<a href="/login">войти</a>
		<a href="/signup">зарегистрироваться</a>
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<svg
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		on:click={() => {
			api.post("/logout")
				.then((response) => {
					if (response.status == 200) {
						sessionStorage.removeItem("authToken");
						loggedIn.set(false);
					}
				})
				.catch((error) => {
					alert(error.response.status);
				});
		}}
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M20.4486 39.75C-7.37004 39.75 -6.10864 0 19.9965 0C46.0203 0 45.8575 39.75 20.4486 39.75ZM30.8111 25.7344C33.9759 19.3777 33.8584 8.57663 21.7688 7.09369C9.67924 5.61075 6.11657 16.6514 8.24151 23.727C12.7627 25.3094 13.4454 27.0094 12.948 33.2215L15.5658 33.2667L16.0179 28.9264L17.754 29.2157L17.4828 33.2848L19.9694 33.3254L20.3944 29.5684L22.135 29.8577L21.8366 33.3571L24.3504 33.3933C24.9291 28.1623 25.6344 26.1142 30.8111 25.748V25.7344ZM24.9607 19.3686C28.1256 19.7529 27.5016 24.5499 24.4272 24.1746C21.059 23.7587 21.8005 18.9798 24.9607 19.3686ZM15.6879 23.6909C10.8728 23.1031 11.9353 16.2716 16.4519 16.8232C20.9686 17.3748 20.1005 24.247 15.6879 23.6909Z"
			fill="white"
		/>
	</svg>
{/if}

<style lang="scss">
	div {
		display: flex;
		column-gap: 0.5vw;

		a {
			padding: 0.3vw 0.7vw;
			transition: background-color 0.3s ease, color 0.1s ease;

			&:first-child:hover {
				color: var(--primary-color);
			}

			&:nth-child(2) {
				background-color: var(--primary-color);
				color: #000;
				border: 0.1vw var(--primary-color) solid;

				&:hover {
					background-color: transparent;
					color: white;
				}
			}
		}

		svg {
			path {
				transition: fill 0.3s ease;
			}

			&:hover path {
				fill: var(--primary-color);
			}
		}
	}
</style>
