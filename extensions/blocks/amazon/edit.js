/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { BlockControls, BlockIcon, InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	FormTokenField,
	Notice,
	PanelBody,
	Placeholder,
	Toolbar,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import icon from './icon';
import data from './dummy-data';
import './editor.scss';

const suggestions = data.products.map( product => product.title + ' (ASIN:' + product.asin + ')' );

export default function AmazonEdit( {
	attributes: {
		backgroundColor,
		textColor,
		buttonAndLinkColor,
		style,
		product,
		showImage,
		showTitle,
		showSeller,
		showPrice,
		showDescription,
		showPurchaseButton,
	},
	className,
	setAttributes,
} ) {
	const notice = false; // TODO

	const onInputChange = value => {
		console.log( value );
	};

	const idRegex = /^(\d+)$|\(ASIN:(.+)\)$/;
	const onChange = selected => {
		const selectedIds = selected.map( restaurant => {
			const parsed = idRegex.exec( restaurant );
			const selectedId = parsed[ 1 ] || parsed[ 2 ];
			return data.products.filter( filteredProduct => filteredProduct.asin === selectedId );
		} );
		setAttributes( { product: selectedIds[ 0 ][ 0 ].asin } );
	};

	const blockPlaceholder = (
		<Placeholder
			label={ __( 'Amazon', 'jetpack' ) }
			instructions={ __( 'Search by entering an Amazon product name or ID below.', 'jetpack' ) }
			icon={ <BlockIcon icon={ icon } /> }
			notices={
				notice && (
					<Notice status="error" isDismissible={ false }>
						{ notice }
					</Notice>
				)
			}
		>
			<form>
				<FormTokenField
					value={ product }
					suggestions={ suggestions }
					onInputChange={ onInputChange }
					maxSuggestions={ 10 }
					label={ __( 'Products', 'jetpack' ) }
					onChange={ onChange }
				/>
				<Button isSecondary isLarge type="submit">
					{ __( 'Preview', 'jetpack' ) }
				</Button>
			</form>
		</Placeholder>
	);

	const styleOptions = [
		{ name: 'small', label: __( 'Small', 'jetpack' ) },
		{ name: 'large', label: __( 'Large', 'jetpack' ) },
	];

	const blockControls = (
		<BlockControls>
			{ product && (
				<Toolbar
					isCollapsed={ true }
					icon="admin-appearance"
					label={ __( 'Style', 'jetpack' ) }
					controls={ styleOptions.map( styleOption => ( {
						title: styleOption.label,
						isActive: styleOption.name === style,
						onClick: () => setAttributes( { style: styleOption.name } ),
					} ) ) }
					popoverProps={ { className: 'is-calendly' } }
				/>
			) }
		</BlockControls>
	);

	const inspectorControls = (
		<InspectorControls>
			{ product && (
				<PanelBody title={ __( 'Promotion Settings', 'jetpack' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Image', 'jetpack' ) }
						checked={ showImage }
						onChange={ () => setAttributes( { showImage: ! showImage } ) }
					/>
					<ToggleControl
						label={ __( 'Show Title', 'jetpack' ) }
						checked={ showTitle }
						onChange={ () => setAttributes( { showTitle: ! showTitle } ) }
					/>
					<ToggleControl
						label={ __( 'Show Author/Seller', 'jetpack' ) }
						checked={ showSeller }
						onChange={ () => setAttributes( { showSeller: ! showSeller } ) }
					/>
					<ToggleControl
						label={ __( 'Show Price', 'jetpack' ) }
						checked={ showPrice }
						onChange={ () => setAttributes( { showPrice: ! showPrice } ) }
					/>
					<ToggleControl
						label={ __( 'Show Description', 'jetpack' ) }
						checked={ showDescription }
						onChange={ () => setAttributes( { showDescription: ! showDescription } ) }
					/>
					<ToggleControl
						label={ __( 'Show Purchase Button', 'jetpack' ) }
						checked={ showPurchaseButton }
						onChange={ () => setAttributes( { showPurchaseButton: ! showPurchaseButton } ) }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);

	const blockPreview = () => {
		const {
			title,
			productGroup,
			authors,
			artists,
			actors,
			manufacturer,
			detailPageUrl,
			listPrice,
			imageUrlSmall,
			imageWidthSmall,
			imageHeightSmall,
			imageUrlMedium,
			imageWidthMedium,
			imageHeightMedium,
			imageUrlLarge,
			imageWidthLarge,
			imageHeightLarge,
			authorshipInfo,
		} = data.products.filter( productDataItem => productDataItem.asin === product )[ 0 ];

		const image = (
			<a href={ detailPageUrl }>
				<img alt={ title } src={ imageUrlSmall } width={ imageWidthSmall } heigth={ imageHeightSmall } />
			</a>
		);

		return (
			product && (
				<div>
					{ showImage && image }
					{ showTitle && (
						<div className={ `${ className }-title` }>
							<a href={ detailPageUrl }>{ title }</a>
						</div>
					) }
					{ showPrice && <div className={ `${ className }-list-price` }>{ listPrice }</div> }
					{ showSeller && (
						<div className={ `${ className }-seller` }>
							{ authors }
							{ artists }
							{ actors }
							{ manufacturer }
							{ authorshipInfo }
						</div>
					) }
				</div>
			)
		);
	};

	return (
		<div className={ className }>
			{ inspectorControls }
			{ blockControls }
			{ product ? blockPreview() : blockPlaceholder }
		</div>
	);
}
