import React from 'react'

export default class Input extends React.Component {
	static propTypes = {
		/** Maximum length of the value. */
		maxLength: React.PropTypes.number
	}

	static defaultProps = {
		maxLength: 50
	}

	render() {}
}
