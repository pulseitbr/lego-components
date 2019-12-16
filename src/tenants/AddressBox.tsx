import { IsEmpty } from "lego";
import { transparentize } from "polished";
import React, { useEffect, useState } from "react";
import { MdHome, MdStore } from "react-icons/md";
import { Container, Left, Right, View } from "../base";
import Radiobox from "../form/Radiobox";
import FlatList from "../list/FlatList";
import Colors from "../styles";
import Constants, { SOFT_RADIUS } from "../styles/Constants";
import StyleSheet from "../styles/StyleSheet";
import { SubTitle, Text } from "../typography";

const formatCep = (str = "") => str.replace(/[^0-9]/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");

const styles = StyleSheet.create({
	view: { padding: Constants.UNIT_1, textAlign: "left", cursor: "pointer" }
});

export type AddressBoxItem = {
	nomeLoja?: string;
	nrSeqEndereco: number;
	cep: string;
	numero: string;
	complemento: string;
	logradouro: string;
	bairro: string;
	cidade: string;
	uf: string;
};

type BindProps = {
	span: string;
	medium: string;
	isHome?: boolean;
	inlineLayout?: boolean;
	idSelectAddress: number | null;
	onChange(nrSeqEndereco: number | null): any;
};

type Props = {
	listGetter: () => any;
	dataSource: AddressBoxItem[];
	emptyHomeMessage: React.ReactNode;
	emptyStoreMessage: React.ReactNode;
} & Omit<BindProps, "idSelectAddress">;

const transparentBackground = transparentize(0.4, Colors.primaryAlpha);

const getIcon = (isHome: boolean) => (isHome ? <MdHome /> : <MdStore />);

const BindCard = (props: BindProps) => (addr: AddressBoxItem) => {
	const isSelected = props.idSelectAddress === addr.nrSeqEndereco;

	const onChange = () => props.onChange(addr.nrSeqEndereco);

	if (!!props.inlineLayout) {
		return (
			<View
				key={`address-box-item-${addr.nrSeqEndereco}`}
				span={props.span}
				role="button"
				onClick={onChange}
				style={{ padding: "0.15rem", textAlign: "left", cursor: "pointer" }}
			>
				<Container
					style={{
						padding: "0.625rem",
						borderRadius: SOFT_RADIUS,
						border: `1px solid ${Colors.darkAlpha}`,
						backgroundColor: isSelected ? transparentBackground : "transparent"
					}}
				>
					<Left style={{ flex: "0 0 70%" }}>
						<SubTitle style={{ fontSize: "1.25rem" }}>
							{getIcon(!!props.isHome)} {!!addr.nomeLoja ? `${addr.nomeLoja} - ` : ""}
							{formatCep(addr.cep)}
						</SubTitle>
					</Left>
					<Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
						<Radiobox name={`check-address-${addr.nrSeqEndereco}`} value={isSelected} />
					</Right>
					<View span="100%">
						{addr.logradouro}, {addr.numero}
						{!!addr.complemento ? `, ${addr.complemento}` : ""}. {addr.bairro} - {addr.cidade} - {addr.uf}
					</View>
				</Container>
			</View>
		);
	}

	return (
		<View role="button" span={props.span} onClick={onChange} medium={props.medium} style={styles.view}>
			<Container
				style={{
					padding: "0.5rem",
					border: `1px solid ${Colors.darkAlpha}`,
					backgroundColor: isSelected ? transparentBackground : "transparent"
				}}
			>
				<Container>
					<Left style={{ flex: "0 0 70%" }}>
						<SubTitle style={{ fontSize: "1.25rem" }}>
							{getIcon(!!props.isHome)} {formatCep(addr.cep)}
						</SubTitle>
					</Left>
					<Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
						<Radiobox name={`check-address-${addr.nrSeqEndereco}`} value={isSelected} />
					</Right>
				</Container>
				<Container>
					<Text style={{ fontSize: "0.8rem" }}>Logradouro: </Text>{" "}
					<Text className="b">
						{addr.logradouro}, {addr.numero}
					</Text>
				</Container>
				<Container>
					<small>Bairro: </small> <span className="b">{addr.bairro}</span>
				</Container>
				<Container>
					<small>Cidade: </small> <span className="b">{addr.cidade}</span>
				</Container>
				<Container>
					<Text>
						<small>Estado: </small> <span className="b">{addr.uf}</span>
					</Text>
				</Container>
			</Container>
		</View>
	);
};

const AddressBox = ({
	dataSource,
	emptyHomeMessage,
	emptyStoreMessage,
	listGetter,
	onChange,
	inlineLayout = false,
	isHome = true,
	span,
	medium
}: Props) => {
	const [idSelectAddress, setIdSelectAddress] = useState(null as number | null);

	const useInlineLayout = inlineLayout || dataSource.length > 5;

	const emptyMessage = isHome ? emptyHomeMessage : emptyStoreMessage;

	useEffect(() => {
		listGetter();
	}, [listGetter]);

	useEffect(() => {
		if (!IsEmpty(dataSource)) {
			const id = dataSource[0].nrSeqEndereco!;
			setIdSelectAddress(id);
			onChange(id);
		} else {
			setIdSelectAddress(null);
			onChange(null);
		}
	}, [dataSource, dataSource.length, onChange]);

	const changeSelect = (id: number) => {
		setIdSelectAddress(id);
		onChange(id);
	};

	return (
		<Container>
			<FlatList
				data={dataSource}
				emptyComponent={emptyMessage}
				key={`${dataSource.length}-flat-list-address`}
				component={BindCard({
					idSelectAddress,
					inlineLayout: useInlineLayout,
					isHome,
					medium,
					onChange: changeSelect,
					span
				})}
			/>
		</Container>
	);
};

export default AddressBox;
