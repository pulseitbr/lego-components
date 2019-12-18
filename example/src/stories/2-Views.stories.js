import { Button, Colors, Container, View } from "lego-components";
import React, { Fragment, useState } from "react";

export default {
	title: "View"
};

export const ViewReference = () => {
	const [view, setView] = useState(true);
	return (
		<Fragment>
			<Container style={{ backgroundColor: Colors.darkDarkest, color: Colors.light, fontSize: "1.5rem" }}>
				<p>Componente Container, similar ao `row` do Bootstrap</p>
				<p>Esse componente é baseado em flexbox/flexgrid</p>
			</Container>
			<Container style={{ backgroundColor: Colors.lightDark, padding: "1rem 0", fontSize: "1.5rem" }}>
				<Button onPress={() => setView((p) => !p)}>
					{(view && "Ver explicação") || "Esconder explicação"}
				</Button>
				<View span="100%" isCollapse show={view}>
					<p>Componente View, similar ao `col` do Bootstrap</p>
					<p>
						Não esqueça de definir um `span` para ele. O span indica a propriedade padrão em desktops para
						quanto o componente irá ocupar. Por padrão em dispositivos mobile, o elemento ocupará 100% da
						visualização
					</p>
					<p>
						<strong>
							Todo componente Flex e Grid da lego possui collapse por padrão. Este mesmo componente é um
							collapse
						</strong>
					</p>
					<table style={{ width: "100%", textAlign: "left" }}>
						<tr>
							<th>Propriedade</th>
							<th>Aplicação</th>
							<th>Media query</th>
						</tr>
						<tr>
							<td>span</td>
							<td>Valor padrão, sem media query</td>
							<td>-------</td>
						</tr>
						<tr>
							<td>xsmall</td>
							<td>Mobiles de telas pequenas</td>
							<td>@media only screen and (max-width: 600px)</td>
						</tr>
						<tr>
							<td>small</td>
							<td>Mobiles com tela padrão - Tables</td>
							<td>@media only screen and (min-width: 600px)</td>
						</tr>
						<tr>
							<td>large</td>
							<td>Desktops comuns</td>
							<td>@media only screen and (min-width: 992px)</td>
						</tr>
						<tr>
							<td>xlarge</td>
							<td>Televisões</td>
							<td>@media only screen and (min-width: 1200px)</td>
						</tr>
					</table>
				</View>
			</Container>
		</Fragment>
	);
};
