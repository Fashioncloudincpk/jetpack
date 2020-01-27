/**
 * External Dependencies
 */
import classnames from 'classnames';
import { memo } from 'React';
import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { getBlockType, getBlockFromExample, createBlock } from '@wordpress/blocks';
import { BlockPreview } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { ENTER, SPACE } from '@wordpress/keycodes';

const StylePreview = memo(
	props => {
		const { attributes, styleOption, viewportWidth, blockName } = props;
		const type = getBlockType( blockName );

		return (
			<div className="block-editor-block-styles__item-preview">
				<BlockPreview
					viewportWidth={ viewportWidth }
					blocks={
						type.example
							? getBlockFromExample( blockName, {
									attributes: { ...type.example.attributes, style: styleOption.value },
									innerBlocks: type.example.innerBlocks,
							  } )
							: createBlock( type, attributes )
					}
				/>
			</div>
		);
	},
	( prevProps, nextProps ) => isEqual( prevProps, nextProps )
);

export default function BlockStylesSelector( {
	attributes,
	clientId,
	styleOptions,
	onSelectStyle,
	activeStyle,
	viewportWidth,
} ) {
	let block;
	if ( useSelect ) {
		block = useSelect( select => {
			const { getBlock } = select( 'core/block-editor' );
			return getBlock( clientId );
		} );
	}

	return (
		<div className="block-editor-block-styles">
			{ styleOptions.map( styleOption => {
				const optionAttributes = {
					...attributes,
					style: styleOption.value,
				};
				return (
					<div
						key={ styleOption.value }
						className={ classnames( 'block-editor-block-styles__item', {
							'is-active': styleOption.value === activeStyle,
						} ) }
						onClick={ () => {
							onSelectStyle( { style: styleOption.value } );
						} }
						onKeyDown={ event => {
							if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
								event.preventDefault();
								onSelectStyle( { style: styleOption.value } );
							}
						} }
						role="button"
						tabIndex="0"
						aria-label={ styleOption.label }
					>
						{ useSelect && (
							<StylePreview
								blockName={ block.name }
								styleOption={ styleOption }
								attributes={ optionAttributes }
								viewportWidth={ viewportWidth }
							/>
						) }
						<div className="block-editor-block-styles__item-label">{ styleOption.label }</div>
					</div>
				);
			} ) }
		</div>
	);
}
