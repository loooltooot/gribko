<footer>
	<a href="/">
		<svg
			width="461"
			height="222"
			viewBox="0 0 461 222"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M172.46 322.169V138.865H47C47 138.865 72.7955 -12 230.695 -14"
				stroke="black"
				stroke-width="78.1682"
				stroke-miterlimit="10"
			/>
			<path
				d="M288.54 322.169V138.865H414C414 138.865 388.595 -12 230.696 -14"
				stroke="black"
				stroke-width="78.1682"
				stroke-miterlimit="10"
			/>
		</svg>
	</a>
	<div id="footer-content">
		<span id="disclaimer"
			>чрезмерное употребление комбучи вредит вашему здоровью</span
		>
		<div id="contacts">
			<span>ИП Грибко В.Е.</span>
			<span>г. Тыгда, ул. Грибная, 146</span>
			<span>+7 (8412) 33-33-33</span>
			<span>grib.ko@yandex.ru</span>
		</div>
	</div>
	<nav>
		<ul>
			<li><a href="/products">товары</a></li>
			<li><a href="/stores">магазины</a></li>
			<li><a href="/shipping">доставка</a></li>
			<li><a href="/factory">производство</a></li>
			<li><a href="/franchise">франшиза</a></li>
		</ul>
	</nav>
</footer>

<style lang="scss">
	footer {
		position: relative;
		background-color: var(--primary-color);
		padding-right: 10.42vw;
		padding-top: 1.3vw;
		padding-bottom: 1.3vw;
		padding-left: 25vw;
		display: flex;
		justify-content: space-between;
		height: 11.56vw;
		box-sizing: border-box;
		z-index: 9;

		svg {
			position: absolute;
			left: 4vw;
			top: 0;
		}

		div#footer-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			& * {
				color: #000;
			}

			span#disclaimer {
				width: 16.09vw;
			}

			div#contacts {
				display: flex;
				column-gap: 1.56vw;
			}
		}

		nav ul {
			flex-direction: column;
			text-align: right;
			row-gap: 0.42vw;

			li a {
				color: #000;
				font-weight: 700;
				transition: color 0.3s ease;

				&:hover {
					color: white;
				}
			}
		}
	}
</style>
