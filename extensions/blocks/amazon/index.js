/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './icon';
import edit from './edit';

/**
 * Style dependencies
 */
import './editor.scss';

export const name = 'amazon';
export const title = __( 'Amazon', 'jetpack' );
export const settings = {
	title,
	description: __( 'Promote Amazon products and earn a commission from sales.', 'jetpack' ),
	icon,
	category: 'jetpack',
	keywords: [ 'amazon', 'affiliate' ],
	supports: {
		align: true,
		alignWide: false,
		html: false,
	},
	edit,
	save: () => null, // TODO - add Amazon links
	example: {
		attributes: {
			// @TODO: Add default values for block attributes, for generating the block preview.
		},
	},
};
