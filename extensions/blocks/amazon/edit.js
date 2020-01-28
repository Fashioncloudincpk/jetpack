/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { BlockControls, BlockIcon, InspectorControls } from '@wordpress/block-editor';
import { Button, Notice, PanelBody, Placeholder, Toolbar } from '@wordpress/components';

/**
 * Internal dependencies
 */
import icon from './icon';
import './editor.scss';

export default function AmazonEdit( { className, setAttributes } ) {
	const url = false; // TODO
	const style = 'small'; // TODO
	const notice = false; // TODO
	/**
	 * Write the block editor UI.
	 *
	 * @returns {object} The UI displayed when user edits this block.
	 */
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
				<input type="text" />
				<Button>{ __( 'Preview', 'jetpack' ) }</Button>
			</form>
		</Placeholder>
	);

	const styleOptions = [
		{ name: 'small', label: __( 'Small', 'jetpack' ) },
		{ name: 'large', label: __( 'Large', 'jetpack' ) },
	];

	const blockControls = (
		<BlockControls>
			{ url && (
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
			<PanelBody title={ __( 'Promotion Settings', 'jetpack' ) } initialOpen={ false }></PanelBody>
		</InspectorControls>
	);

	const blockPreview = <div>Coming soon</div>;

	return (
		<div className={ className }>
			{ inspectorControls }
			{ blockControls }
			{ url ? blockPreview( style ) : blockPlaceholder }
		</div>
	);
}
